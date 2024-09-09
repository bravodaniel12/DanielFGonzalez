const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const gridSize = 20;
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let snakeColor = "#3498db"; // Color por defecto
let playerName = "Culebrita"; // Nombre por defecto

// Función para iniciar el juego cuando el usuario presiona "Iniciar Juego"
document.getElementById("startGameBtn").addEventListener("click", function() {
  // Obtener el nombre del jugador
  playerName = document.getElementById("name").value || "Culebrita";

  // Obtener el color de la culebrita
  snakeColor = document.getElementById("snake-color").value;

  // Esconder el menú
  document.getElementById("menu").style.display = "none";

  // Mostrar el contenedor del juego
  document.getElementById("game").style.display = "block";

  // Iniciar el juego
  startGame();
});

// Iniciar el juego
function startGame() {
  document.addEventListener("keydown", changeDirection);
  placeFood();
  setInterval(updateGame, 100);
}

function updateGame() {
  moveSnake();
  if (checkCollision()) return restartGame();
  if (eatFood()) {
    score += 10;
    document.getElementById("score").textContent = `Puntuación: ${score} - ${playerName}`;
    placeFood();
  }
  clearCanvas();
  drawFood();
  drawSnake();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  snake.forEach(segment => {
    ctx.fillStyle = snakeColor; // Usar el color seleccionado por el usuario
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize };
  snake.unshift(head);
  snake.pop(); // Quita la cola a menos que coma comida
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

  switch (keyPressed) {
    case LEFT:
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case UP:
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case RIGHT:
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
    case DOWN:
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
  }
}

function placeFood() {
  food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
  food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function eatFood() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    snake.push({}); // Agranda la serpiente
    return true;
  }
  return false;
}

function checkCollision() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x >= canvas.width;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y >= canvas.height;

  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function restartGame() {
  alert(`Juego terminado. Puntuación: ${score} - ${playerName}`);
  snake = [{ x: 200, y: 200 }];
  direction = { x: 0, y: 0 };
  score = 0;
  document.getElementById("score").textContent = `Puntuación: ${score} - ${playerName}`;
  placeFood();
}
