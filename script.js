// script.js
document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.getElementById("gameContainer");
  const scoreElement = document.getElementById("score");

  const gridSize = 40;
  const pixelSize = 10;
  const snake = [{ row: 20, col: 1 }];
  let direction = "right";
  let score = 0;

  function createPixel(row, col, className) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel", className);
    pixel.style.gridRow = row;
    pixel.style.gridColumn = col;
    gameContainer.appendChild(pixel);
  }

  function draw() {
    gameContainer.innerHTML = ""; // Clear the grid

    // Draw snake
    snake.forEach((segment, index) => {
      createPixel(segment.row, segment.col, "snakeBodyPixel");
    });

    // Draw food
    createPixel(food.row, food.col, "food");

    // Draw grid
    for (let row = 1; row <= gridSize; row++) {
      for (let col = 1; col <= gridSize; col++) {
        createPixel(row, col, "");
      }
    }
  }

  function move() {
    const head = Object.assign({}, snake[0]);

    // Move the head in the current direction
    switch (direction) {
      case "up":
        head.row--;
        break;
      case "down":
        head.row++;
        break;
      case "left":
        head.col--;
        break;
      case "right":
        head.col++;
        break;
    }

    // Check for collisions
    if (
      head.row < 1 ||
      head.row > gridSize ||
      head.col < 1 ||
      head.col > gridSize ||
      checkCollision(head)
    ) {
      // Game over
      alert("Game over!");
      resetGame();
      return;
    }

    // Check if the snake eats the food
    if (head.row === food.row && head.col === food.col) {
      score++;
      scoreElement.textContent = score;
      generateFood();
    } else {
      // Remove the last segment of the snake if it doesn't eat food
      snake.pop();
    }

    // Move the snake
    snake.unshift(head);

    // Draw the updated game state
    draw();
  }

  function checkCollision(head) {
    return snake.some((segment) => segment.row === head.row && segment.col === head.col);
  }

  function generateFood() {
    food = {
      row: Math.floor(Math.random() * gridSize) + 1,
      col: Math.floor(Math.random() * gridSize) + 1,
    };

    // Regenerate food if it appears on the snake
    while (checkCollision(food)) {
      food = {
        row: Math.floor(Math.random() * gridSize) + 1,
        col: Math.floor(Math.random() * gridSize) + 1,
      };
    }
  }

  function resetGame() {
    snake.length = 1; // Reset snake to one segment
    snake[0] = { row: 20, col: 1 }; // Start position
    direction = "right";
    score = 0;
    scoreElement.textContent = score;
    generateFood();
    draw();
  }

  generateFood();
  draw();
  setInterval(move, 100);

  // Handle keyboard input to change direction
  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
  });
});
