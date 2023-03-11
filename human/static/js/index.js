let cells = document.querySelectorAll(".button");
let resetBtn = document.querySelector(".resetBtn");
let isGameFinish = false;

function ControlloVincitore(player) {
    if (grid[0][0] === player && grid[1][1] === player && grid[2][2] === player) {
        isGameFinish = true;
        return true;
    } else if (
        grid[0][2] === player &&
        grid[1][1] === player &&
        grid[2][0] === player
    ) {
        isGameFinish = true;
        return true;
    } else if (
        grid[0][0] === player &&
        grid[1][0] === player &&
        grid[2][0] === player
    ) {
        isGameFinish = true;
        return true;
    } else if (
        grid[0][1] === player &&
        grid[1][1] === player &&
        grid[2][1] === player
    ) {
        isGameFinish = true;
        return true;
    } else if (
        grid[0][2] === player &&
        grid[1][2] === player &&
        grid[2][2] === player
    ) {
        isGameFinish = true;
        return true;
    } else if (
        grid[0][0] === player &&
        grid[0][1] === player &&
        grid[0][2] === player
    ) {
        isGameFinish = true;
        return true;
    } else if (
        grid[1][0] === player &&
        grid[1][1] === player &&
        grid[1][2] === player
    ) {
        isGameFinish = true;
        return true;
    } else if (
        grid[2][0] === player &&
        grid[2][1] === player &&
        grid[2][2] === player
    ) {
        isGameFinish = true;
        return true;
    } else {

        return false;
    }
}

function RefreshWindow() {
    window.location.reload(true);
}

resetBtn.addEventListener("click", function(e) {
    e.preventDefault();
    RefreshWindow();
});



let currentPlayer = "X";
let grid = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

let count = 0;

cellsoccupied = true;
let v1;
let v2;

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function(e) {
        e.preventDefault();

        console.log(`valore della i --> ${i}`);
        console.log(`valore di player --> ${currentPlayer}`);

        cellsoccupied =
            e.currentTarget.classList.contains("player2") ||
            e.currentTarget.classList.contains("player1");

        console.log(cellsoccupied);
        if (!cellsoccupied && !isGameFinish) {

            count++;
            v1 = cells[i].dataset.row;
            v2 = cells[i].dataset.cell;

            if (currentPlayer === "X") {
                e.currentTarget.classList.toggle("player1");
                cells[i].innerHTML = "X"


                grid[v1][v2] = "X";
            } else {
                e.currentTarget.classList.toggle("player2");
                cells[i].innerHTML = "O"


                grid[v1][v2] = "O";
            }
        }

        let win = ControlloVincitore(currentPlayer);

        if (win) {
            document.querySelector(
                ".output"
            ).innerHTML = `hai vinto player ${currentPlayer}`;
            document.querySelector(".output").classList.add("colorOutput");

        } else if (count === 9 && !win) {
            document.querySelector(".output").innerHTML = `pareggio`;
            document.querySelector(".output").classList.add("colorOutput");

        }


        if (currentPlayer === "X") {
            currentPlayer = "O";
        } else {
            currentPlayer = "X";
        }
    });
}