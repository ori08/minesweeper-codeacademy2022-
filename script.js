var gBoard;
var Empty = "-";
var Mine = '*';
var Flag = "|''"
var isGame = false;
var lifeCounter = 0;
var bombCounter = 0;
var flagCounter = 0;


function init(boardSize, mines) {
    isGame = false;
    flagCounter = 0;
    bombCounter = 0;
    lifeCounter = 0;

    var elH4 = document.querySelector("h4")
    elH4.innerText = `life :2`


    var date = Date.now();
    startTime(date);
    gBoard = buildBoard(boardSize, mines);
    var x = document.querySelector("div");
    console.log(x);

}


//Create board with random mines
function buildBoard(boardSize, mines) {
    var SIZE = boardSize;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            var cell = { type: Empty, Nighboard: 0, isFlag: false };
            board[i][j] = cell;
            console.log(board[i][j]);
        }
    }
    //call the function that create mines
    placeMines(mines, board)

    findNighboard(board);

    printBoard(board, '.board-container', mines);

    renderCells(board);

    console.log(board);
    return board;

    //render the dom:

}




// function that create mines by numbers 
function placeMines(mines, board) {
    for (i = 0; i < mines; i++) {
        placeMine(board);
    }
}



// function that create random mine.
function placeMine(board) {


    var emptyCell = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].type === Empty)
                emptyCell.push({ i, j });
        }
    }
    var emptyCellIdx = getRandomIntInclusive(0, emptyCell.length - 1)
    var randomI = emptyCell[emptyCellIdx].i;
    var randomJ = emptyCell[emptyCellIdx].j;
    console.log(randomI + " " + randomJ)

    board[randomI][randomJ].type = Mine;

    return board;

}




function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Check the raw up
function CheckRawUp(board) {
    for (var i = 0; i < board.length - 1; i++) {
        for (var j = 0; j < board.length; j++) {
            if (board[i + 1][j].type === Mine) board[i][j].Nighboard++
        }
    }
}
// Check the raw Down
function CheckRawDown(board) {
    for (var i = board.length - 1; i > 0; i--) {
        for (var j = 0; j < board.length; j++) {
            if (board[i - 1][j].type === Mine) board[i][j].Nighboard++
        }
    }
}

// Check the raw Left
function CheckRawleft(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length - 1; j++) {
            if (board[i][j + 1].type === Mine) board[i][j].Nighboard++
        }
    }
}

// Check the raw Right
function CheckRawRight(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = board.length - 1; j > 0; j--) {
            if (board[i][j - 1].type === Mine) board[i][j].Nighboard++
        }
    }
}

// check hypotenuse left

function CheckHypotenuseLeft(board) {
    for (var i = 1; i < board.length; i++) {
        for (var j = 1; j < board.length; j++) {
            console.log(" helleo " + i + " " + j)
            if (board[i - 1][j - 1].type === Mine) board[i][j].Nighboard++
        }
    }


    for (var i = 0; i < board.length - 1; i++) {
        for (var j = 0; j < board.length - 1; j++) {
            console.log(" shhhselleo " + i + " " + j)
            if (board[i + 1][j + 1].type === Mine) board[i][j].Nighboard++
        }
    }
}
// check hypotenuse right

function CheckHypotenuseRight(board) {

    for (var i = 0; i < board.length - 1; i++) {
        for (var j = 1; j < board.length; j++) {
            console.log(" hel8748788leo " + i + " " + j)
            if (board[i + 1][j - 1].type === Mine) board[i][j].Nighboard++
        }
    }


    for (var i = board.length - 1; i > 0; i--) {
        for (var j = 0; j < board.length - 1; j++) {
            console.log(" shhhselleo " + i + " " + j)
            if (board[i - 1][j + 1].type === Mine) board[i][j].Nighboard++
        }
    }
}





//function that place in board all the nighbord details.

function findNighboard(board) {
    CheckHypotenuseLeft(board);
    CheckHypotenuseRight(board);
    CheckRawUp(board);
    CheckRawDown(board);
    CheckRawleft(board);
    CheckRawRight(board);

}


//function that mark the nighboard ...

function showNighoard(elCell, i, j) {


    //if gameOver than player cant click ...
    if (isGame === true) return;


    var pressLocation = { i: i, j: j };
    console.log(gBoard[i][j].type + " " + i + " " + j);


    if (gBoard[i][j].type === Empty && gBoard[i][j].Nighboard === 0) {

        markCell(i, j);
        //mark the right bottom corner
        if (j === gBoard.length - 1 && i === gBoard.length - 1) {
            if (gBoard[i - 1][j].type === Empty) markCell(i - 1, j);
            if (gBoard[i][j - 1].type === Empty) markCell(i, j - 1);
            if (gBoard[i - 1][j - 1].type === Empty) markCell(i - 1, j - 1);
        }


        //check the left bottom corner
        else if (j === 0 && i === gBoard.length - 1) {
            if (gBoard[i - 1][j].type === Empty) markCell(i - 1, j);
            if (gBoard[i][j + 1].type === Empty) markCell(i, j + 1);
            if (gBoard[i - 1][j + 1].type === Empty) markCell(i - 1, j + 1);
        }





        //check the left up corner
        else if (j === 0 && i === 0) {
            if (gBoard[i + 1][j].type === Empty) markCell(i + 1, j);
            if (gBoard[i][j + 1].type === Empty) markCell(i, j + 1);
            if (gBoard[i + 1][j + 1].type === Empty) markCell(i + 1, j + 1);
        }


        //check the right up corner
        else if (j === gBoard[0].length - 1 && i === 0) {
            if (gBoard[i + 1][j].type === Empty) markCell(i + 1, j);
            if (gBoard[i][j - 1].type === Empty) markCell(i, j - 1);
            if (gBoard[i + 1][j - 1].type === Empty) markCell(i + 1, j - 1);
        }


        //check the up line
        else if (i === 0) {
            if (gBoard[i][j + 1].type === Empty) markCell(i, j + 1);
            if (gBoard[i][j - 1].type === Empty) markCell(i, j - 1);
            if (gBoard[i + 1][j].type === Empty) markCell(i + 1, j);
            if (gBoard[i + 1][j - 1].type === Empty) markCell(i + 1, j - 1);
            if (gBoard[i + 1][j + 1].type === Empty) markCell(i + 1, j + 1);

        }


        //check the buttom line

        else if (i === gBoard.length - 1) {
            if (gBoard[i - 1][j].type === Empty) markCell(i - 1, j);
            if (gBoard[i][j + 1].type === Empty) markCell(i, j + 1);
            if (gBoard[i][j - 1].type === Empty) markCell(i, j - 1);
            if (gBoard[i - 1][j - 1].type === Empty) markCell(i - 1, j - 1);
            if (gBoard[i - 1][j + 1].type === Empty) markCell(i - 1, j + 1);

        }


        //check the left line
        else if (j === 0) {
            if (gBoard[i][j + 1].type === Empty) markCell(i, j + 1);
            if (gBoard[i - 1][j].type === Empty) markCell(i - 1, j);
            if (gBoard[i + 1][j].type === Empty) markCell(i + 1, j);
            if (gBoard[i + 1][j + 1].type === Empty) markCell(i + 1, j + 1);
            if (gBoard[i - 1][j + 1].type === Empty) markCell(i - 1, j + 1);

        }


        //check the Right line
        else if (j === gBoard.length - 1) {
            if (gBoard[i][j - 1].type === Empty) markCell(i, j - 1);
            if (gBoard[i - 1][j].type === Empty) markCell(i - 1, j);
            if (gBoard[i + 1][j].type === Empty) markCell(i + 1, j);
            if (gBoard[i + 1][j - 1].type === Empty) markCell(i + 1, j - 1);
            if (gBoard[i - 1][j - 1].type === Empty) markCell(i - 1, j - 1);

        }








        //check the middile corner


        else {
            if (gBoard[i + 1][j].type === Empty) markCell(i + 1, j);
            if (gBoard[i - 1][j].type === Empty) markCell(i - 1, j);
            if (gBoard[i][j + 1].type === Empty) markCell(i, j + 1);
            if (gBoard[i][j - 1].type === Empty) markCell(i, j - 1);
            if (gBoard[i - 1][j + 1].type === Empty) markCell(i - 1, j + 1);
            if (gBoard[i - 1][j - 1].type === Empty) markCell(i - 1, j - 1);
            if (gBoard[i + 1][j - 1].type === Empty) markCell(i + 1, j - 1);
            if (gBoard[i + 1][j + 1].type === Empty) markCell(i + 1, j + 1);

        }

    }

    //if u hit the bomp:

    else if (gBoard[i][j].type != Mine && gBoard[i][j].Nighboard > 0) markCell(i, j);


    if (gBoard[i][j].type === Mine) {
        var elCell = document.querySelector(`.cell-${i}-${j}`);
        elCell.style.color = "blue";
        elCell.style.backgroundColor = "black";
        lifeCounter++;

        //print the user the life was reamin;

        var lifeRamian = 2 - lifeCounter;
        var elH4 = document.querySelector("h4")
        elH4.innerText = `life :${lifeRamian}`
        //


        if (lifeCounter === 2) {
            lifeCounter = 0;
            flagCounter = 0;
            isGame = true;
            alert("gameOver");
            clearInterval(gInterval);
        }

    }
}

///show the hidden cells that are not mines
function markCell(i, j) {
    var elCell = document.querySelector(`.cell-${i}-${j}`);

    var num = gBoard[i][j].Nighboard
    var typeOfNighboard = gBoard[i][j].type
    switch (typeOfNighboard) {
        case Flag:
            elCell.style.color = 'black'
            break;
        case Mine:
            elCell.style.color = 'orange'
            break;

    }

    switch (num) {
        case 1:
            elCell.style.color = 'black'
            break;
        case 2:
            elCell.style.color = 'green'
            break;
        case 3:
            elCell.style.color = 'red'
            break;
        case 4:
            elCell.style.color = 'gray'
            break;
        case 5:
            elCell.style.color = 'orange'
            break;
        case 6:
            elCell.style.color = 'darkblue'
            break;
        case 7:
            elCell.style.color = 'yellowgreen'
            break;
    }

    elCell.style.backgroundColor = "red";
}



function startTime(startTime) {
    var h3 = document.querySelector('h3');
    gInterval = setInterval(updateTime, 1);
    function updateTime() {
        gTime = (Date.now() - startTime) / 1000 + 's'
        h3.innerText = 'Time: ' + gTime
    }
}

lifeRender();
function lifeRender() {

}



function beginner() {
    var boardSize = 4;
    var mines = 2;
    init(boardSize, mines);
}


function medium() {
    var boardSize = 8;
    var mines = 12;
    init(boardSize, mines);
}

function hard() {
    var boardSize = 12;
    var mines = 30;
    init(boardSize, mines);
}



//function that got right click and check if the player cover the flag on the bomb.

function flag(elCell, i, j, mines) {
    if (isGame === true) return;
    if (flagCounter < mines) {
        if (gBoard[i][j].type === Mine) bombCounter++;
        gBoard[i][j].type = Flag;
        renderCell(i, j, gBoard[i][j].type);
        markCell(i, j);
        flagCounter++

        //if the bomb are cover twice:

        if (bombCounter === mines) {
            //reset the bombcounter
            bombCounter = 0;

            alert("u win");

            isGame = true;
        }
    }
    else {
        isGame = true;
        init(4, 2);
        flagCounter = 0;

    }
}



function numberColor(i, j) {
    var num = gBoard[i][j].Nighboard
    // cell.innerText = num
    var elCell = document.querySelector(`.cell-${i}-${j}`);

    switch (num) {
        case 1:
            cell.style.color = 'blue'
            break;
        case 2:
            cell.style.color = 'green'
            break;
        case 3:
            cell.style.color = 'black'
            break;
        case 4:
            cell.style.color = 'purple'
            break;
        case 5:
            cell.style.color = 'orange'
            break;
        case 6:
            cell.style.color = 'darkblue'
            break;
        case 7:
            cell.style.color = 'yellowgreen'
            break;
    }
}