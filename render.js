function printBoard(mat, selector, mines) {

    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var className = 'cell cell-' + i + '-' + j;
            // strHTML +='<td onclick="cellClicked(this,${i} ,${j})" class="' + className + cell + ' </td>'
            strHTML += `<td onclick="showNighoard(this,${i} ,${j})" oncontextmenu="flag(this,${i} ,${j},${mines});" class="${className}" >${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);

    elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(i, j, value) {

    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell-${i}-${j}`);
    elCell.innerHTML = value;
    console.log(elCell);

}

function renderCells(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].type != Mine)
                renderCell(i, j, board[i][j].Nighboard);
            else renderCell(i, j, board[i][j].type);

        }
    }
}
