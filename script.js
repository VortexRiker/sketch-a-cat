const DEFAULT_GRID_SIZE = 100;
let isMouseDown = false;

function setColor(event)
{
    event.target.style.backgroundColor = "red";
}

function processMouseDown(event)
{
    isMouseDown = true;
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

function resetCanvas(cellsInARow)
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

function initializeButtons()
{
    const configure = document.querySelector(".configuration");
    configure.addEventListener("click", processConfiguration);
}

function processConfiguration()
{
    const cellsInARow = getUserInput();
    resetCanvas(cellsInARow);
}

initializeCanvas(DEFAULT_GRID_SIZE);
initializeButtons();