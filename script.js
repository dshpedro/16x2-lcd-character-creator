document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('grid-container');

    for (let outerCol = 0; outerCol < 2; outerCol++) {
        const gridRowElement = document.createElement('tr');

        for (let outerRow = 0; outerRow < 16; outerRow++) {
            const cell = document.createElement('td');
            cell.className = 'grid-cell';

            const innerTable = document.createElement('table');

            for (let innerRow = 0; innerRow < 8; innerRow++) {
                const cellRowElements = document.createElement('tr')

                for (let innerCol = 0; innerCol < 5; innerCol++){
                    const innerCell = document.createElement('td');
                    innerCell.className = 'grid-inner-cell'
                    cellRowElements.appendChild(innerCell);
                }

                innerTable.appendChild(cellRowElements);
            }

            cell.appendChild(innerTable);
            gridRowElement.appendChild(cell);
        }
        container.appendChild(gridRowElement);
    }
    
    let isPainting = false;
    let paintColor = '';

    function paintCell(event) {
        if (isPainting && event.target.classList.contains('grid-inner-cell')) {
            event.target.style.backgroundColor = paintColor;
        }
    }

    const ledOff = '#787ccc';
    const ledOn = 'rgb(' + 237 + ', ' + 237 + ', ' + 248 + ')'; // #ededf8
    container.addEventListener('mousedown', function(event) {
        // left click
        if (event.button === 0) {
            isPainting = true;
            paintColor = ledOn;
            paintCell(event);
        }
        // right click
        else if (event.button === 2) { 
            isPainting = true;
            paintColor = ledOff;
            paintCell(event);
        }
    });

    container.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });

    container.addEventListener('mousemove', paintCell);

    container.addEventListener('mouseup', function() {
        isPainting = false;
    });

    container.addEventListener('mouseleave', function() {
        isPainting = false;
    });

    function isInnerCellOn(innerCell) {
        return ledOn === getComputedStyle(innerCell).backgroundColor;
    }

    let grid = [];
    for (let i = 0; i < 32; i++) {
        grid[i] = [];
        for (let j = 0; j < 8; j++) {
            grid[i][j] = [];
            for (let k = 0; k < 5; k++) {
                grid[i][j][k] = false;
            }
        }
    }

    document.getElementById('printButton').addEventListener('click', function() {
        const cells = document.querySelectorAll('.grid-cell');
        cells.forEach((cell, cellIndex) => {
            const innerCells = cell.querySelectorAll('.grid-inner-cell');
            innerCells.forEach((innerCell, innerIndex) => {
                const row = Math.floor(innerIndex / 5);
                const col = innerIndex % 5;
                grid[cellIndex][row][col] = isInnerCellOn(innerCell);;
            });
        });
        console.log(grid);
    });

});
