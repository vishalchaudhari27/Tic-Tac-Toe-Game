let boxes = document.querySelectorAll(".box"); // Select all boxes
let resetBtn = document.querySelector("#reset"); // Select the reset button
let turnO = true; // Track whose turn it is, `true` for O, `false` for X

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Keep track of the current state of the game (9 boxes)
let gameState = ["", "", "", "", "", "", "", "", ""];

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        // Check if the box is already filled, prevent further clicks
        if (gameState[index] !== "") return;

        // Place "X" or "O" based on the current turn
        if (turnO) {
            box.textContent = "O";
            gameState[index] = "O";
        } else {
            box.textContent = "X";
            gameState[index] = "X";
        }

        // Check for a win
        if (checkWinner()) {
            setTimeout(() => {
                alert(turnO ? "O wins!" : "X wins!");
                resetGame();
            }, 100);
        } else {
            // Switch turns
            turnO = !turnO;
        }
    });
});

// Function to check for a winner
function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true; // We found a winner!
        }
    }
    return false;
}

// Function to reset the game
resetBtn.addEventListener("click", resetGame);

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box) => {
        box.textContent = "";
    });
    turnO = true; // Reset to O's turn
}