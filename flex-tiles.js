var css =
    '.photo-tile-text h3 {' +
        'letter-spacing: 0.07em;' +
        'box-shadow: 1.53px 1.68px 2.5px rgba(0, 125, 153, 0.51);' +
        'text-shadow: 1.53px 1.53px 2.5px hsl(50, 17%, 17%);' +
        'background-color: rgba(0, 125, 153, 0.34) !important;' +
        'line-height:1.5em !important;font-size: 1.17em !important;' +
        'display:inline-block !important;' +
        'padding: 15px !important;' +
        'border-radius: 30px;' +
        'border-top-left-radius: 0;' +
        'max-width: 80%;' +
    '}' +
    '.tile-link {' +
        'background-image: url(\'https://moodle.deakincollege.edu.au/draftfile.php/285861/user/draft/209535591/bg-image.png?time=1757984265084\') !important;' +
        'background-origin: content-box !important;' +
        'background-clip: content-box !important;' +
        'background-size: cover;' +
        'background-repeat: no-repeat;' +
        'background-size: calc(var(--cols) * 100%) calc(var(--rows) * 100%);' +
        'background-position: calc(var(--col) * 100% / (var(--cols) - 1)) calc(var(--row) * 100% / (var(--rows) - 1));' +
    '}' +
    '.badge-info {' +
        'background-color: rgba(235, 235, 235, 0.34) !important;' +
        'line-height: 1.25em;' +
        'font-size: 0.68em;' +
        'display:inline-block;' +
        'letter-spacing: .85px;' +
        'border-radius: 30px;' +
        'border-top-left-radius: 0;' +
    '}';

var styleElement = document.createElement('style');
styleElement.appendChild(document.createTextNode(css));
document.getElementsByTagName('head')[0].appendChild(styleElement);

// Function to count number of columns in a flex grid
function get_column_count(flexContainer) {
    if (flexContainer.children.length === 0) return false;
    // get first child in the flex container
    const firstItem = flexContainer.children[0];
    let columns = -1;

    // Iterate through items to see if any are on a different "line"
    for (let i = 1; i < flexContainer.children.length; i++) {
        // console.log('tile # ' + (i + 1) + ' OffsetTop: ' + flexContainer.children[i].offsetTop);
        if (flexContainer.children[i].offsetTop > firstItem.offsetTop) {
            columns = i; // store column breakpoint
            break;
        }
    }
    // console.log('Columns: ' + columns);

    return columns; // number of columns in a grid
}

// Function to set grid dimensions and CSS variables for flex-items
function set_grid_dimensions(container) {
    const flexItems = Array.from(container.children);
    const totalItems = container.childElementCount; //flexItems.length;
    // console.log("Total items: " + totalItems)

    if (totalItems === 0) {
        return; // nothing to process
    }

    // Calculate number of columns and rows in the grid
    const numColumns = get_column_count(container);
    const numRows = Math.ceil(totalItems / numColumns);

    console.log(`Grid: ${numColumns} columns x ${numRows} rows`);

    // Assign CSS variables to each item
    flexItems.forEach((item, index) => {
        const row = Math.floor(index / numColumns);
        const col = index % numColumns;
        console.log('(' + row + ' , ' + col + ')' + item)
        item.style.setProperty('--row', row);
        item.style.setProperty('--col', col);
        item.style.setProperty('--rows', numRows);
        item.style.setProperty('--cols', numColumns);
    });
}
// Function to update grid dimensions on load and resize
function updateGrid() {
    const container = document.querySelector('.tiles');

    if (container) {
        set_grid_dimensions(container);
    }
}

// Run once on load
window.addEventListener('load', updateGrid);

// Run every time the window is resized
window.addEventListener('resize', () => {
    // Debounce to avoid excessive calls
    clearTimeout(window._resizeTimeout);
    window._resizeTimeout = setTimeout(updateGrid, 100);
});
window.addEventListener('DOMContentLoaded', () => {
    const element = document.querySelector('.tiles');
    if (element instanceof Element) {
        const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            // console.log('Element resized!', entry.contentRect);
            updateGrid();
        }
        });
        resizeObserver.observe(element);
    } else {
        console.warn("Element not found or not of type Element");
    }
});

// Fallback: Polling for screen size or position changes
let lastScreenWidth = screen.width;
let lastScreenX = window.screenX;

setInterval(() => {
    if (screen.width !== lastScreenWidth || window.screenX !== lastScreenX) {
        // console.log("Possible screen change or monitor switch detected");
        lastScreenWidth = screen.width;
        lastScreenX = window.screenX;
        window.location.replace(window.location.href);
    }
}, 850);