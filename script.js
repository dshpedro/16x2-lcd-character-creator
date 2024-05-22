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
});
