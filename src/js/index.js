import game from './game';

const canvasContainer = document.querySelector('.canvas-container');
const canvas = document.querySelector('canvas');
const scoreContainer = document.querySelector('.score');
const gameOverContainer = document.querySelector('.gameover');
const titleContainer = document.querySelector('.title-container');
const options = {
  canvasContainer,
  canvas,
  titleContainer,
  gameOverContainer,
  scoreContainer

};
game.initialize(options);
