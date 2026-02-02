const board = document.getElementById("game-board");
const instructionText = document.getElementById("instruction-text");
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("high-score");

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = randomFood();
let direction = "right";
let gameInterval;
let gameStarted = false;
let highScore = 0;

// Prevent opposite-direction crashes
const oppositeDirections = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

function draw() {
  board.innerHTML = "";
  snake.forEach(part => createCell("snake", part));
  createCell("food", food);
}

function createCell(className, position) {
  const el = document.createElement("div");
  el.className = className;
  el.style.gridColumn = position.x;
  el.style.gridRow = position.y;
  board.appendChild(el);
}

function moveSnake() {
  const head = { ...snake[0] };

  if (direction === "up") head.y--;
  if (direction === "down") head.y++;
  if (direction === "left") head.x--;
  if (direction === "right") head.x++;

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = randomFood();
  } else {
    snake.pop();
  }

  checkCollision();
  updateScore();
  draw();
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * gridSize) + 1,
    y: Math.floor(Math.random() * gridSize) + 1,
  };
}

function checkCollision() {
  const head = snake[0];

  // Border collision ONLY
  if (
    head.x < 1 ||
    head.x > gridSize ||
    head.y < 1 ||
    head.y > gridSize
  ) {
    endGame();
  }

  // Self collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      endGame();
    }
  }
}

function startGame() {
  if (gameStarted) return;

  gameStarted = true;
  instructionText.style.display = "none";

  gameInterval = setInterval(moveSnake, 150);
}

function endGame() {
  clearInterval(gameInterval);
  gameStarted = false;

  const score = snake.length - 1;
  highScore = Math.max(highScore, score);
  highScoreText.textContent = highScore.toString().padStart(3, "0");
  highScoreText.style.display = "block";

  snake = [{ x: 10, y: 10 }];
  direction = "right";
  food = randomFood();

  instructionText.style.display = "block";
  draw();
}

function updateScore() {
  scoreText.textContent = (snake.length - 1).toString().padStart(3, "0");
}

// 🎮 KEYBOARD CONTROLS
  document.addEventListener("keydown", (e) => {
    const keyMap = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  };

    if (!(e.key in keyMap)) return;

  // Prevent page scrolling
     e.preventDefault();

   const newDirection = keyMap[e.key];

  // Start game on first arrow press
   if (!gameStarted) {
    startGame();
    direction = newDirection;
    return;
  }

  // Prevent reversing into itself
  if (oppositeDirections[direction] === newDirection) return;

  direction = newDirection;
  }
  );

// Initial draw
draw();
