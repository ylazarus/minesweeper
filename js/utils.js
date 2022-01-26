'use strict'

// move render board here

function renderBoard(board) {
    //Render the board as a <table> to the page
    var cellNum = 1
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j].minesAroundCount;
            if (!board[i][j].minesAroundCount) cell = NONE
            if (board[i][j].isMine) cell = MINE
            var className = 'cell cell-' + i + '-' + j;
            strHTML += `<td id="${cellNum}" class="' + ${className} + '" onclick="cellClicked(this, ${i}, ${j})">  </td>`
            cellNum++
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(".board-container");
    elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function startTimer() {
    gGameTimer = setInterval(countTimer, 1000);
}
function countTimer() {
    var totalSeconds = gGame.secsPassed;
    ++totalSeconds;
    // var totalSeconds = Math.floor(totalSeconds / 3600);
    // var totalSeconds = Math.floor((totalSeconds - totalSeconds * 3600) / 60);
    // var totalSeconds = totalSeconds - (totalSeconds * 3600 + totalSeconds * 60);
    if (totalSeconds < 10)
        totalSeconds = "0" + totalSeconds;
    if (totalSeconds < 100)
        totalSeconds = "0" + totalSeconds;
    // if (totalSeconds < 1000)
    //     totalSeconds = "0" + totalSeconds;
    gGame.secsPassed = totalSeconds
    document.querySelector(".timer").innerText = gGame.secsPassed;
}


function getNums(amount) {
    var numsArr = []
    for (var i = 1; i <= amount; i++) {
        var currNum = i
        numsArr.push(currNum)
    }
    return numsArr
}

function drawNum(array) {
    var idx = getRandomInt(0, array.length - 1)
    var num = array[idx]
    array.splice(idx, 1)
    return num
}