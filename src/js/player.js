import audio from './audio';
import physics from './physics';

const frames = {
  GROUND: 0,
  JUMP: 1
};
const JUMP_LIMIT = 60; // px from 0,0 top left
// const jumpVelocity = -2.5;
const JUMP_VELOCITY = -1.0;

const position = {
  x: 0,
  y: 0
};
const startPosition = {
  x: 0,
  y: 0
};
const width = 10;
const height = 14;
const spritesheetDataURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAAmElEQVQ4ja3SvQ2AIBAF4LeAA9hTmdjQuII9pS0bOI9jOAFL0Z2FRkHvPPy55CUm9/mgALgfUva3joS8desiBp/lg8uRs5BwqbueKt2wyA0AzUyeuL1YQudC1U0m8ZMhNtvE4Pk9Y4/CrlLQNkXu78IYPKHtCf2YhxvOsVYpbGrkh57/EwsF5Cz420iFTQ1ydn0C6bc2qV0AybAeSpPnOhgAAAAASUVORK5CYII=';

let currentFrame = frames.GROUND;
let spritesheet = null;
let jumping = false;
let currentVelocity = 0;
let startJumpTime = 0;

function initialize(data) {
  const { x, y } = data;
  return new Promise(loadSpriteSheet)
    .then(() => initializePosition(x, y));
}

function loadSpriteSheet(resolve) {
  const img = new Image();
  img.onload = () => {
    spritesheet = img;
    resolve();
  };
  img.src = spritesheetDataURI;
}

function initializePosition(x, y) {
  startPosition.x = x;
  startPosition.y = y;
  setX(x);
  setY(y);
}

function update() {
  const currentTime = Date.now();
  const dt = (currentTime - startJumpTime)/1000;
  setY(calcPosition(dt));
}

function paint(ctx) {
  ctx.drawImage(spritesheet, currentFrame * width, 0, width, height, position.x, position.y, width, height);
}

function jump() {
  if (jumping) {
    return;
  }

  startJumpTime = Date.now();
  jumping = true;
  currentFrame = frames.JUMP;
  currentVelocity = JUMP_VELOCITY;
  audio.playJumpSound();
}

function calcPositionWithGravity(t) {
  return physics.calcUniformAcceleration(position.y, currentVelocity, t);
}

function calcPosition() {
  const y = physics.calcUniformMovement(position.y, currentVelocity);
  if (y <= JUMP_LIMIT) {
    invertCurrentVelocity();
  }
  return y;
}

function invertCurrentVelocity() {
  currentVelocity = -currentVelocity;
}

function onJumpEnd() {
  startJumpTime = 0;
  jumping = false;
  currentFrame = frames.GROUND;
  currentVelocity = 0;
}

function getX() {
  return position.x;
}

function getY() {
  return position.y;
}

function setX(x) {
  position.x = x;
}

function setY(y) {
  position.y = y;
  // TODO: Store ground position in a variable
  if (y === 86) {
    onJumpEnd();
  }
}

function getWidth() {
  return width;
}

function getHeight() {
  return height;
}

function goBackToStartPosition() {
  setX(startPosition.x);
  setY(startPosition.y);
}

export default {
  initialize,
  update,
  paint,
  jump,
  getX,
  getY,
  setX,
  setY,
  getWidth,
  getHeight,
  goBackToStartPosition
};
