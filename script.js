let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let gameMode = '';
let winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6]             // diagonal
];

// Start a new game in selected mode (Player vs Player or Player vs Computer)
function startGame(mode) {
    gameMode = mode;
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('game-board').style.display = 'flex';
    document.getElementById('mode-select').style.display = 'none';
    document.getElementById('game-status').style.display = 'none';
    updateBoard();
}

// Make a move in a cell
function makeMove(index) {
    if (board[index] !== '' || !gameActive) return;

    // Update the board and cell
    board[index] = currentPlayer;
    updateBoard();

    // Check for a winner
    if (checkWinner()) {
        setTimeout(() => {
            displayResult(`${currentPlayer} Wins!`);
        }, 100);
    } else if (board.every(cell => cell !== '')) {
        setTimeout(() => {
            displayResult('It\'s a Draw!');
        }, 100);
    } else {
        // Switch players
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        if (gameMode === 'computer' && currentPlayer === 'O') {
            computerMove();
        }
    }
}

// Update the board on UI
function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

// Check for a winner
function checkWinner() {
    return winConditions.some(([a, b, c]) => {
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Display game result
function displayResult(message) {
    gameActive = false;
    document.getElementById('game-status').style.display = 'block';
    document.getElementById('status-text').textContent = message;
}

// Reset the game
function resetGame() {
    startGame(gameMode);
}

// AI Move (Computer Player - O)
function computerMove() {
    if (!gameActive) return;

    let emptyCells = board.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    
    setTimeout(() => {
        makeMove(randomCell);
    }, 500);
}
