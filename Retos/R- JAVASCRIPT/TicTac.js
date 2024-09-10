// Selección de elementos
const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restartButton');
const playerVsComputerButton = document.getElementById('playerVsComputer');
const playerVsPlayerButton = document.getElementById('playerVsPlayer');

let currentPlayer = 'X';
let board = Array(9).fill(null); // Representa el tablero de 3x3
let gameActive = true;
let againstComputer = false; // Modo IA

// Combinaciones ganadoras
const winningCombinations = [
  [0, 1, 2], // filas
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // columnas
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonales
  [2, 4, 6]
];

// Modo Jugador vs Computadora
playerVsComputerButton.addEventListener('click', () => {
  restartGame();
  againstComputer = true;
  gameStatus.textContent = `Modo: Jugador vs Computadora - Turno: Jugador X`;
});

// Modo Jugador vs Jugador
playerVsPlayerButton.addEventListener('click', () => {
  restartGame();
  againstComputer = false;
  gameStatus.textContent = `Modo: Jugador vs Jugador - Turno: Jugador X`;
});

// Función para manejar el clic en una celda
function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (board[cellIndex] || !gameActive) return; // Evita sobrescribir

  placeMark(cell, cellIndex);
  checkForWinner();

  if (againstComputer && gameActive && currentPlayer === 'O') {
    setTimeout(computerMove, 500); // Retraso para ver la jugada de la IA
  }
}

// Función para colocar la marca del jugador en la celda
function placeMark(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(`player-${currentPlayer}`);
}

// Función para verificar el ganador
function checkForWinner() {
  let roundWon = false;
  let winner = null;

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      winner = board[a];
      break;
    }
  }

  if (roundWon) {
    gameStatus.textContent = `¡Jugador ${winner} gana!`;
    if (winner === 'X') {
      playerXWins++;
      document.getElementById('playerXWins').textContent = `Jugador X Ganados: ${playerXWins}`;
    } else {
      playerOWins++;
      document.getElementById('playerOWins').textContent = `Jugador O Ganados: ${playerOWins}`;
    }
    gameActive = false;
    return;
  }

  if (!board.includes(null)) {
    gameStatus.textContent = `¡Es un empate!`;
    gameActive = false;
    return;
  }

  switchPlayer();
}

// Función para cambiar el turno del jugador
function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (!againstComputer || currentPlayer === 'X') {
    gameStatus.textContent = `Turno: Jugador ${currentPlayer}`;
  }
}

// Función para reiniciar el juego
function restartGame() {
  currentPlayer = 'X';
  board = Array(9).fill(null);
  gameActive = true;
  gameStatus.textContent = `Turno: Jugador X`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('player-X', 'player-O');
  });
}

// Añadir eventos a las celdas y al botón de reinicio
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

// Inicializar contadores de victorias
let playerXWins = 0;
let playerOWins = 0;
document.getElementById('playerXWins').textContent = `Jugador X Ganados: ${playerXWins}`;
document.getElementById('playerOWins').textContent = `Jugador O Ganados: ${playerOWins}`;

// IA

// Algoritmo Minimax para IA
function minimax(board, depth, isMaximizing) {
  const scores = { 'X': 1, 'O': -1, 'draw': 0 };
  const winner = checkWinner();

  if (winner !== null) {
    return scores[winner];
  }

  if (!board.includes(null)) {
    return scores['draw'];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'X';
        const score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

// Encuentra el mejor movimiento usando Minimax
function computerMove() {
  let bestScore = -Infinity;
  let bestMove;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = 'O';
      const score = minimax(board, 0, false);
      board[i] = null;

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  const cell = cells[bestMove];
  placeMark(cell, bestMove);
  checkForWinner();
}

// Función para verificar el ganador de la IA
function checkWinner() {
  let winner = null;

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
      break;
    }
  }

  return winner;
}
