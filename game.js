const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 480;

let paddleColor = 'red';
let score = 0;
let fallingBlocks = [];
let gameInterval;

function startGame() {
  score = 0;
  paddleColor = getRandomColor();
  fallingBlocks = [];
  document.getElementById('score').innerText = "Score: 0";
  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, 50);
}

function getRandomColor() {
  const colors = ['red', 'blue', 'green', 'yellow'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  updateBlocks();
  drawBlocks();
}

function drawPaddle() {
  ctx.fillStyle = paddleColor;
  ctx.fillRect(canvas.width/2 - 30, canvas.height - 30, 60, 10);
}

function updateBlocks() {
  if (Math.random() < 0.05) {
    fallingBlocks.push({
      x: Math.random() * (canvas.width - 20),
      y: 0,
      color: getRandomColor()
    });
  }
  fallingBlocks.forEach(block => {
    block.y += 5;
    if (block.y > canvas.height - 40 && block.y < canvas.height - 30 &&
        block.x > canvas.width/2 - 30 && block.x < canvas.width/2 + 30) {
      if (block.color === paddleColor) {
        score++;
      } else {
        score--;
      }
      paddleColor = getRandomColor();
      block.y = canvas.height + 100; // Remove from screen
      document.getElementById('score').innerText = "Score: " + score;
    }
  });
  fallingBlocks = fallingBlocks.filter(b => b.y < canvas.height);
}

function drawBlocks() {
  fallingBlocks.forEach(block => {
    ctx.fillStyle = block.color;
    ctx.fillRect(block.x, block.y, 20, 20);
  });
}

function toggleInstructions() {
  const el = document.getElementById('instructions');
  el.classList.toggle('hidden');
}
