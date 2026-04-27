const ALPHA_STEP = 0.1;

let cellsInARow = 16;

let isGridEnabled = false;
let isMouseDown = false;

let red = 0;
let green = 0;
let blue = 0;
let alpha = ALPHA_STEP;

// Return random number from 0 to max
function getRandomNumber(max)
{
    return Math.floor(Math.random() * max);
}

// Reset brush alpha value back to default value
function resetAlpha()
{
    alpha = ALPHA_STEP;
}

// Increment brush alpha by a default value
function incrementAlpha()
{
    alpha += ALPHA_STEP;
    if (alpha > 1.0)
    {
        alpha = 1.0;
    }
}

// Update global color by randomly selecting red, green and blue parts
function generateColor()
{
    red = getRandomNumber(255);
    green = getRandomNumber(255);
    blue = getRandomNumber(255);
}

// Apply current global color and alpha to the cell targetted by the brush 
function setColor(event)
{
    event.target.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

// Set brush as active, generate and apply new color to the brush
function processMouseDown(event)
{
    isMouseDown = true;
    generateColor();
    resetAlpha();
    setColor(event);
}

// Set brush as inactive
function processMouseUp(event)
{
    isMouseDown = false;
}

// Apply global color to the cell and update color's alpha value
function processMouseHover(event)
{
    if (isMouseDown)
    {
        incrementAlpha();
        setColor(event);
    }
}

// Set brush inactive
function processMouseLeaveCanvas(event)
{
    isMouseDown = false;
}

// Disable dragging, so that mouse presses does not accidentally grab canvas or cells
function preventDragging(event)
{
    event.preventDefault();
}

// Add event listeners to the cell
function addCellLogic(cell)
{
    cell.addEventListener("mousedown" ,processMouseDown);
    cell.addEventListener("mouseup", processMouseUp);
    cell.addEventListener("mouseenter", processMouseHover);
    cell.addEventListener("dragstart", preventDragging);
}

// Switch grid border for the specified cell
function toggleGrid(cell)
{
    cell.classList.toggle("grid");
}

// Create one cell of the canvas
function createCell(canvas, cellsInARow)
{
    const cell = document.createElement("div");
    cell.style.flex = `1 0 ${100 / cellsInARow}%`
    cell.classList.add("cell");
    if(isGridEnabled)
    {
        toggleGrid(cell);
    }
    addCellLogic(cell);
        
    canvas.appendChild(cell);
}

// create full cell grid, using specified canvas "resolution"
function createGrid(canvas, cellsInARow)
{
    const cells = cellsInARow ** 2;
    for (let i = 0; i < cells; ++i)
    {
        createCell(canvas, cellsInARow);
    }
}

// Add canvas logic and initialize grid cells
function initializeCanvas(cellsInARow)
{
    const canvas = document.querySelector(".canvas");
    canvas.addEventListener("mouseleave", processMouseLeaveCanvas);
    canvas.addEventListener("dragstart", preventDragging);
    canvas.addEventListener("mouseup", processMouseLeaveCanvas);
    createGrid(canvas, cellsInARow);
}

// Delete all current gird cells and reinitialize them
function resetCanvas()
{
    const canvas = document.querySelector(".canvas");
    canvas.replaceChildren();
    createGrid(canvas, cellsInARow);
} 

// Process a value entered by user, so it always resides in [MIN_CELLS, MAX_CELLS]
function processInput(cellsInARow)
{
    const MIN_CELLS = 16;
    const MAX_CELLS = 100;
    if (cellsInARow && cellsInARow > 0)
    {
        if (cellsInARow > MAX_CELLS)
        {
            cellsInARow = MAX_CELLS;
        }
    }
    else
    {
        cellsInARow = MIN_CELLS;
    }
    return cellsInARow;
}

// Get and process user input, that should represent number of cells in one row
function getUserInput()
{
    let cellsInARow = Math.floor(Number(prompt("Please enter one dimension of canvas resolution\n(number of cells in one row/column from 1 to 100)", 16)));   

    return processInput(cellsInARow);
}

// Add Reset button logic
function initializeResetButton()
{
    const reset = document.querySelector("#reset");
    reset.addEventListener("click", resetCanvas);
}

// update canvas cell grid with user-provided input
function processConfiguration()
{
    cellsInARow = getUserInput();
    resetCanvas(cellsInARow);
}

// Add Configure button logic
function initializeConfigureButton()
{
    const configure = document.querySelector("#configuration");
    configure.addEventListener("click", processConfiguration);
}

// Update grid for all cells in a canvas
function processGrid()
{
    const cells = document.querySelectorAll(".cell");
    cells.forEach(toggleGrid);
    isGridEnabled = !isGridEnabled;
}

// Add Grid button logic
function initializeGridButton()
{
    const grid = document.querySelector("#grid");
    grid.addEventListener("click", processGrid);
}

// Add logic to all canvas buttons
function initializeControls()
{
   initializeResetButton();
   initializeConfigureButton();
   initializeGridButton();
}

initializeCanvas(cellsInARow);
initializeControls();