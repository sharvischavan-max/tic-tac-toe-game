const board = document.getElementById("board");
const statusText = document.getElementById("status");
const scoreText = document.getElementById("score");
const resetBtn = document.getElementById("resetBtn");
const modeBtn = document.getElementById("modeBtn");

let cells = [];
let currentPlayer = "X";
let gameActive = true;
let vsComputer = false;
let scores = { X: 0, O: 0 };

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

// Create board
function createBoard() {
    board.innerHTML = "";
    cells = [];

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => handleMove(i));
        board.appendChild(cell);
        cells.push(cell);
    }
}

// Handle player move
function handleMove(index) {
    if (!gameActive || cells[index].textContent !== "") return;

    makeMove(index, currentPlayer);

    if (checkWinner()) return;

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (vsComputer && currentPlayer === "O") {
        setTimeout(computerMove, 500);
    }
}

// Make move
function makeMove(index, player) {
    cells[index].textContent = player;
}

// Computer move (random for now)
function computerMove() {
    let empty = cells
        .map((c, i) => c.textContent === "" ? i : null)
        .filter(v => v !== null);

    let move = empty[Math.floor(Math.random() * empty.length)];
    makeMove(move, "O");

    if (checkWinner()) return;

    currentPlayer = "X";
}

// Check winner
function checkWinner() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;

        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            gameActive = false;

            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            let winner = cells[a].textContent;
            statusText.textContent = winner + " Wins 🎉";

            scores[winner]++;
            updateScore();

            return true;
        }
    }

    // Draw condition
    if (cells.every(c => c.textContent !== "")) {
        statusText.textContent = "Draw 🤝";
        gameActive = false;
        return true;
    }

    return false;
}

// Update score
function updateScore() {
    scoreText.textContent = `X: ${scores.X} | O: ${scores.O}`;
}

// Reset game
resetBtn.addEventListener("click", () => {
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Tic Tac Toe";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });
});

// Toggle mode
modeBtn.addEventListener("click", () => {
    vsComputer = !vsComputer;
    modeBtn.textContent = vsComputer ? "Playing vs Computer" : "Play vs Computer";
});

// Initialize
createBoard();