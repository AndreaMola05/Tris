let cells = document.querySelectorAll(".button");
let resetBtn = document.querySelector(".resetBtn");
let isGameFinish = false;

let output = document.querySelector(".output");



function ControlloVincitore(grid, contatore) {
    let winner;
    for (let i = 0; i < 3; i++) {
        if (
            grid[i][0] != null &&
            grid[i][0] === grid[i][1] &&
            grid[i][1] === grid[i][2]
        ) {
            isGameFinish = true;
            winner = grid[i][0];
            return winner;
        }
    }

    for (let j = 0; j < 3; j++) {
        if (
            grid[0][j] != null &&
            grid[0][j] === grid[1][j] &&
            grid[1][j] === grid[2][j]
        ) {
            isGameFinish = true;
            winner = grid[0][j];
            return winner;
        }
    }

    if (
        grid[0][0] != null &&
        grid[0][0] === grid[1][1] &&
        grid[1][1] === grid[2][2]
    ) {
        isGameFinish = true;
        winner = grid[0][0];
        return winner;
    }

    if (
        grid[0][2] != null &&
        grid[0][2] === grid[1][1] &&
        grid[1][1] === grid[2][0]
    ) {
        isGameFinish = true;
        winner = grid[0][2];
        return winner;
    }



    if (contatore >= 9 && !isGameFinish) {
        isGameFinish = true;
        return "pareggio";
    }
}

resetBtn.addEventListener("click", (event) => {
    event.preventDefault();
    location.reload();
});

let currentPlayer = "X";
let grid = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function getEmptyCells(grid) {
   
    let emptyCells = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (grid[i][j] === null) {
                emptyCells.push(i + " - " + j);
            }
        }
    }
    return emptyCells;
}

function findCell(v1, v2) {
    let cellPosition;
    if (v1 == 0 && v2 == 0) {
        cellPosition = 0;
    } else if (v1 == 0 && v2 == 1) {
        cellPosition = 1;
    } else if (v1 == 0 && v2 == 2) {
        cellPosition = 2;
    } else if (v1 == 1 && v2 == 0) {
        cellPosition = 3;
    } else if (v1 == 1 && v2 == 1) {
        cellPosition = 4;
    } else if (v1 == 1 && v2 == 2) {
        cellPosition = 5;
    } else if (v1 == 2 && v2 == 0) {
        cellPosition = 6;
    } else if (v1 == 2 && v2 == 1) {
        cellPosition = 7;
    } else {
        cellPosition = 8;
    }

    return cellPosition;
}

function getRandomMove(grid) {
    let myTimer = setTimeout(function(getRandomMove) {console.log("test")}, 5000);
    let celleLibere = getEmptyCells(grid);

    let cellaCasuale = Math.floor(Math.random() * (celleLibere.length - 1 - 0 + 1)) + 0;

    let valoreMossa1 = parseInt(celleLibere[cellaCasuale].substring(0, 1));
    let valoreMossa2 = parseInt(celleLibere[cellaCasuale].substring(4));
    grid[valoreMossa1][valoreMossa2] = "O";
    return findCell(valoreMossa1, valoreMossa2);
}

let count = 0;

cellsoccupied= true;
let v1, v2;

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function(e) {

        e.preventDefault();


        cellsoccupied= e.currentTarget.classList.contains("player2") || e.currentTarget.classList.contains("player1");

        if (!cellsoccupied&& !isGameFinish) {
            v1 = cells[i].dataset.row;
            v2 = cells[i].dataset.cell;

            e.currentTarget.classList.toggle("player1");
            cells[i].innerHTML = "X"
            grid[v1][v2] = "X";

            count = count + 2;
            winner = ControlloVincitore(grid, count);

            if (winner === "X") {
                output.innerHTML = `hai vinto player X`;
                output.classList.add("colorOutput");
            } else if (count >= 9 && winner === "pareggio") {
                output.innerHTML = `pareggio`;
                output.classList.add("colorOutput");
            } else {
                let cellRandom = getRandomMove(grid);
                console.log(cellRandom);

                cells[cellRandom].classList.toggle("player2");
                cells[cellRandom].innerHTML = "O"
                winner = ControlloVincitore(grid, count);

                if (winner === "O") {
                    output.innerHTML = `hai vinto player O`;
                    output.classList.add("colorOutput");
                }
            }
        }
    });
}