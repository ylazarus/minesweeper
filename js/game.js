'use strict'
const MINE = '💣'
const FLAG = '🚩'
const NONE = ''
//globals here

var gAllCellIds
var gGameTimer
var gBoard // The Model

//This is an object by which the
// board size is set (in this case:
// 4x4 board and how many mines
// to put)
var gLevel = {
    size: 4,
    mines: 2
}

//This is an object in which you can keep and update the
// current game state:
// isOn: Boolean, when true we let the user play
// shownCount: How many cells are shown
// markedCount: How many cells are marked (with a flag)
// secsPassed: How many seconds passed 
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}



// game starts here


function initGame() {
    gBoard = buildBoard()
    renderBoard(gBoard)

}

//functions to make as per PDF

function buildBoard() {
    // Builds the board
    // Set mines at random locations
    // Call setMinesNegsCount()
    // Return the created board
    var size = gLevel.size;
    var board = [];
    var cellNum = 1
    for (var i = 0; i < size; i++) {
        board.push([]);
        for (var j = 0; j < size; j++) {
            board[i][j] = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: false, cellNum: cellNum }
            cellNum++
        }
    }
    placeMines(board)
    setMinesNegsCount(board)
    console.log(board)
    // once i have the board, set the board.minesAroundCount with the function
    return board;
}

function placeMines(board) {
    gAllCellIds = getNums(gLevel.size ** 2)
    for (var i = 0; i < gLevel.mines; i++) {
        var randomCellId = drawNum(gAllCellIds)
        placeMine(board, randomCellId)
    }

}

function placeMine(board, id) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].cellNum === id) board[i][j].isMine = true
        }
    }
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j].minesAroundCount = mineCounter(board, i, j)

        }
    }
}

function mineCounter(board, iPos, jPos) {
    var count = 0
    for (var i = iPos - 1; i <= iPos + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = jPos - 1; j <= jPos + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (i === iPos && j === jPos) continue
            if (board[i][j].isMine) count++
        }
    }
    return count
}



function cellClicked(elCell, i, j) {
    console.log(elCell);
    var currCell = gBoard[i][j]
    console.log(currCell);
    if (!gGame.isOn) onFirstClick()
    if (currCell.isMarked) return
    if (!currCell.isMine) {
        currCell.isShown = true
        elCell.classList.add('is-shown')
        if (currCell.minesAroundCount) {
            elCell.innerText = currCell.minesAroundCount
        } else {
            expandShown(gBoard, elCell, i, j)
        }
    } else if (gBoard[i][j].isMine) {
        currCell.isShown = true
        elCell.innerText = MINE
        elCell.classList.add('is-mine')
        gameLost()
    }
}

function onFirstClick() {
    gGame.isOn = true
    startTimer()
    //make sure clicked is not a mine
}

function cellMarked(elCell) {
    //     Called on right click to mark a
    // cell (suspected to be a mine)
    // Search the web (and
    // implement) how to hide the
    // context menu on right click

}

function gameLost() {

}

function checkGameOver() {
    //     Game ends when all mines are
    // marked, and all the other cells
    // are shown
}

function expandShown(board, elCell, iPos, jPos) {
    for (var i = iPos - 1; i <= iPos + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = jPos - 1; j <= jPos + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (i === iPos && j === jPos) continue
            var currCell = board[i][j]
            console.log(currCell)
            currCell.isShown = true
            //add to the currcell classlist!!!!
            var elCurrCell = document.querySelector(`.cell-${i}-${j}`)
                elCurrCell.classList.add('is-shown')
            if (currCell.minesAroundCount) {
                elCurrCell.innerText = currCell.minesAroundCount
            }
        }
    }
}



// BONUS: if you have the time
// later, try to work more like the
// real algorithm (see description
// at the Bonuses section below)

function reveal(currCell, elCell) {

}