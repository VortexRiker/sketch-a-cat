let cellsInARow = 16;

let isGridEnabled = false;
let isMouseDown = false;

let red = 0;
let green = 0;
let blue = 0;

function getRandomNumber(max)
{
    return Math.floor(Math.random() * max);
}

function generateColor()
{
    red = getRandomNumber(255);
    green = getRandomNumber(255);
    blue = getRandomNumber(255);
}

function setColor(event)
{
    event.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

function processMouseDown(event)
{
    isMouseDown = true;
    generateColor();
    setColor(event);
}

function processMouseUp(event)
{
    isMouseDown = false;
}

function processMouseHover(event)
{
    if (isMouseDown)
    {
        setColor(event);
    }
}

function processMouseLeaveCanvas(event)
{
    isMouseDown = false;
}

function preventDragging(event)
{
    event.preventDefault();
}

function addCellLogic(cell)
{
    cell.addEventListener("mousedown" ,processMouseDown);
    cell.addEventListener("mouseup", processMouseUp);
    cell.addEventListener("mouseenter", processMouseHover);
    cell.addEventListener("dragstart", preventDragging);
}

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

function createGrid(canvas, cellsInARow)
{
    const cells = cellsInARow ** 2;
    for (let i = 0; i < cells; ++i)
    {
        createCell(canvas, cellsInARow);
    }
}

function initializeCanvas(cellsInARow)
{
    const canvas = document.querySelector(".canvas");
    canvas.addEventListener("mouseleave", processMouseLeaveCanvas);
    canvas.addEventListener("dragstart", preventDragging);
    canvas.addEventListener("mouseup", processMouseLeaveCanvas);
    createGrid(canvas, cellsInARow);
}

function resetCanvas()
{
    const canvas = document.querySelector(".canvas");
    canvas.replaceChildren();
    createGrid(canvas, cellsInARow);
} 

function getUserInput()
{
    let cellsInARow = Math.floor(Number(prompt("Please enter one dimension of canvas resolution\n(number of cells in one row/column from 1 to 100)", 16)));   

    return processInput(cellsInARow);
}

function processInput(cellsInARow)
{
    if (cellsInARow && cellsInARow > 0)
    {
        if (cellsInARow > 100)
        {
            cellsInARow = 100;
        }
    }
    else
    {
        cellsInARow = 16;
    }
    return cellsInARow;
}

function initializeResetButton()
{
    const reset = document.querySelector("#reset");
    reset.addEventListener("click", resetCanvas);
}

function initializeConfigureButton()
{
    const configure = document.querySelector("#configuration");
    configure.addEventListener("click", processConfiguration);
}

function initializeGridButton()
{
    const grid = document.querySelector("#grid");
    grid.addEventListener("click", processGrid);
}

function initializeControls()
{
   initializeResetButton();
   initializeConfigureButton();
   initializeGridButton();
}

function processConfiguration()
{
    cellsInARow = getUserInput();
    resetCanvas(cellsInARow);
}

function toggleGrid(cell)
{
    cell.classList.toggle("grid");
}

function processGrid()
{
    const cells = document.querySelectorAll(".cell");
    cells.forEach(toggleGrid);
    isGridEnabled = !isGridEnabled;
}

initializeCanvas(cellsInARow);
initializeControls();