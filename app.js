"use strict";

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const restart = document.querySelector("#restart");

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let player = "X";

game();

function game() {
    cells.forEach((cell) => cell.addEventListener("click", cellClick));
    statusText.textContent = `${player}'s turn`;
    restart.addEventListener("click", restartGame);
}

function cellClick() {
    const index = this.getAttribute("index");
    if (options[index] === "") {
        options[index] = player;
        this.textContent = player;
    } else {
        return;
    }
    checkWin();
}

function checkWin() {
    let win = false;
    for (let winningCombo of winningCombos) {
        if (
            options[winningCombo[0]] === options[winningCombo[1]] &&
            options[winningCombo[1]] === options[winningCombo[2]] &&
            options[winningCombo[0]] !== ""
        ) {
            win = true;
            break;
        }
    }
    if (win) {
        statusText.textContent = `${player} wins!`;
        cells.forEach((cell) => cell.removeEventListener("click", cellClick));
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
    } else {
        changePlayer();
    }
}

function changePlayer() {
    player = player === "X" ? "O" : "X";
    statusText.textContent = `${player}'s turn`;
}

function restartGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    player = "X";
    statusText.textContent = `${player}'s turn`;
    cells.forEach((cell) => (cell.textContent = ""));
    cells.forEach((cell) => cell.addEventListener("click", cellClick));
}
