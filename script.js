const DEFAULT_GRID_SIZE = 16;

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