import audio from './audio';
import player from './player';
import input from './input';
import ball from './ball';
import collisions from './collisions';
import scores from './scores';
import background from './background';

const BALL_INTERVAL = 1; // seconds

const resolution = {
  width: 0,
  height: 0
};
let canvas = null;
let ctx = null;
let lastBallCreatedTimestamp = 0;
let gameOver = false;
let started = false;
let canvasContainer = null;
let scoreContainer = null;
let gameOverContainer = null;
let titleContainer = null;
let restartButton = null;
let balls = [];

function initialize(data) {
  setMainComponents(data);
  initializeSize(canvas);
  initializeVisibilityHandler();
  initializeContext(canvas);
  initializeInput();
  updateScore();
  Promise.all([
    initializeBackground(),
    initializePlayer(canvas),
  ]).then(startLoop);
}

function setMainComponents(data) {
  canvas = data.canvas;
  scoreContainer = data.scoreContainer;
  canvasContainer = data.canvasContainer;
  gameOverContainer = data.gameOverContainer;
  titleContainer = data.titleContainer;
}

function initializeSize(canvas) {
  resolution.width = canvas.width;
  resolution.height = canvas.height;
  onWindowResize();
  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  const ratio = resolution.height / resolution.width;
  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;
  const updatedHeight = innerWidth * ratio;
  canvasContainer.style.width = `${innerWidth}px`;
  canvasContainer.style.height = `${updatedHeight}px`;
  const center = innerHeight / 2 - updatedHeight / 2;
  canvasContainer.style.top = `${center}px`;
}

function initializeVisibilityHandler() {
  document.addEventListener('visibilitychange', onVisibilityChange);
}

function onVisibilityChange(event) {
  if (!document.hidden && started && !gameOver) {
    audio.resumeBackgroundMusic();
    return;
    }
  audio.stopBackgroundMusic();
}

function initializeContext(canvas) {
  ctx = canvas.getContext('2d');
  ctx.mozImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;
}

function initializeInput() {
  const data = { onPlayerAction };
  input.initialize(data);
}

function initializeBackground() {
  background.initialize();
}

function initializePlayer() {
  return player.initialize({
    x: 10,
    y: resolution.height - player.getHeight()
  });
}

function setPlayerInitialPosition(player) {
  return () => {
    player.setX(10);
    player.setY(resolution.height - player.getHeight());
  };
}

function startLoop() {
  window.requestAnimationFrame(loop);
}

function loop(timestamp) {
  clear(ctx);

  if (started && !gameOver) {
    handleBallCreation(timestamp);
    update();
    checkCollisions();
  }

  paint(ctx);
  window.requestAnimationFrame(loop);
}

function clear(ctx) {
  ctx.clearRect(0, 0, resolution.width, resolution.height);
}

function handleBallCreation(timestamp) {
  const dt = timestamp - lastBallCreatedTimestamp;
  if (pushBall(dt / 1000)) {
    lastBallCreatedTimestamp = timestamp;
  }
}

function update() {
  if (gameOver) {
    return;
  }
  player.update();
  balls.forEach((ball) => ball.update());
}

function checkCollisions() {
  checkPlayerGroundCollision();
  checkBallOutOfScreen();
  checkBallsCollideWithPlayer();
}

function checkPlayerGroundCollision() {
  if (player.getY() + player.getHeight() >= resolution.height) {
    player.setY(resolution.height - player.getHeight());
  }
}

function checkBallOutOfScreen() {
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].isOut()) {
      balls.splice(i--, 1);
      scores.increment();
      updateScore();
    }
  }
}

function checkBallsCollideWithPlayer() {
  for (let i = 0; i < balls.length; i++) {
    if (collisions.checkCollision(balls[i], player)) {
      finish();
    }
  }
}

function paint(ctx) {
  background.paint(ctx);
  player.paint(ctx);
  balls.forEach((ball) => ball.paint(ctx));
}

function onPlayerAction() {
  if (gameOver) {
    restart();
    return;
  }

  if (!started) {
    start();
    return;
  }

  player.jump();
}

function updateScore() {
  scoreContainer.textContent = scores.getScore();
}

function pushBall(dt) {
  if (dt >= BALL_INTERVAL) {
    balls.push(ball.create());
    return true;
  }
  return false;
}

function removeAllBalls() {
  balls = [];
}

function start() {
  started = true;
  titleContainer.classList.add('hidden');
  scoreContainer.classList.remove('hidden');
  audio.playBackgroundMusic();
}

function finish() {
  audio.playCollisionSound();
  audio.stopBackgroundMusic();
  gameOver = true;
  gameOverContainer.classList.remove('hidden');
}

function restart() {
  scores.reset();
  updateScore();
  removeAllBalls();
  player.goBackToStartPosition();
  gameOverContainer.classList.add('hidden');
  gameOver = false;
  audio.playBackgroundMusic();
}

export default {
  initialize
};
