const DEFAULT_GRID_SIZE = 16;
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

function getCellSize(canvas, cellsInARow)
{
    let canvasWidth = canvas.clientWidth;

    return canvasWidth / cellsInARow;
}

function createCell(canvas, cellSize)
{
    const cell = document.createElement("div");
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
    cell.classList.add("cell");
    addCellLogic(cell);
        
    canvas.appendChild(cell);
}

function createGrid(size)
{
    const cells = size ** 2;
    const canvas = document.querySelector(".canvas");
    const cellSize = getCellSize(canvas, size);
    for (let i = 0; i < cells; ++i)
    {
        createCell(canvas, cellSize);
    }
}

createGrid(DEFAULT_GRID_SIZE);