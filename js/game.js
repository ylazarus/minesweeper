'use strict'
const MINE = '💣'
const FLAG = '🚩'
const NONE = ''
const SMILE = '😃'
const COOL = '😎'
const SAD = '☠'
//globals here

var gAllCellIds
var gGameTimer
var gBoard // The Model


var gLevel = {
    size: 4,
    mines: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function initGame() {
    resetGame()
    gBoard = buildBoard()
    renderBoard(gBoard)
}

//functions to make as per PDF

function buildBoard() {
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
    var currCell = gBoard[i][j]
    if (!gGame.secsPassed) onFirstClick()
    if (!gGame.isOn) return
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
    checkGameOver()
}

function onFirstClick() {
    gGame.isOn = true
    placeMines(gBoard)
    setMinesNegsCount(gBoard)
    startTimer()

}

function cellMarked(elCell, i, j) {
    if (!gGame.secsPassed) onFirstClick()
    if (!gGame.isOn) return
    var currCell = gBoard[i][j]
    if (currCell.isMarked) {
        currCell.isMarked = false
        elCell.innerText = NONE
    } else {
        currCell.isMarked = true
        elCell.innerText = FLAG
    }
    checkGameOver()
}

function gameLost() {
    clearInterval(gGameTimer)
    gGame.isOn = false
    var elSmiley = document.querySelector(".smiley")
    elSmiley.innerText = SAD
}

function checkGameOver() {
    var totalNotMines = gLevel.size ** 2 - gLevel.mines
    var shownCount = 0
    var correctlyMarkedCount = 0
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell.isShown) shownCount++
            if (currCell.isMarked && currCell.isMine) correctlyMarkedCount++
        }
    }
    if (shownCount === totalNotMines && correctlyMarkedCount === gLevel.mines) {
        clearInterval(gGameTimer)
        gGame.isOn = false
        var elSmiley = document.querySelector(".smiley")
        elSmiley.innerText = COOL
    }
}

function expandShown(board, elCell, iPos, jPos) {
    for (var i = iPos - 1; i <= iPos + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = jPos - 1; j <= jPos + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            // if (i === iPos && j === jPos) continue 
            // took out to solve a bug that the clicked cell was
            // not marking when first cell was a mine
            var currCell = board[i][j]
            if (currCell.isMarked) continue
            currCell.isShown = true
            var elCurrCell = document.querySelector(`.cell-${i}-${j}`)
            elCurrCell.classList.add('is-shown')
            if (currCell.minesAroundCount) {
                elCurrCell.innerText = currCell.minesAroundCount
            }
        }
    }
}

function chooseLevel(level) {
    clearInterval(gGameTimer)
    if (level === 'easy') {
        gLevel.size = 4
        gLevel.mines = 2
    } else if (level === 'medium') {
        gLevel.size = 8
        gLevel.mines = 12
    } else if (level === 'hard') {
        gLevel.size = 12
        gLevel.mines = 30
    }
    initGame()
}

function resetGame() {
    var elSmiley = document.querySelector(".smiley")
    elSmiley.innerText = SMILE
    clearInterval(gGameTimer)
    gGame.isOn = false
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.secsPassed = 0
    document.querySelector(".timer").innerText = '000'
}
// BONUS: if you have the time
// later, try to work more like the
// real algorithm (see description
// at the Bonuses section below)
