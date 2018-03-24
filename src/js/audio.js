const backgroundMusic = new Audio('assets/sounds/music_level_bg.mp3');
const jumpSound = new Audio('assets/sounds/sfx_jump.mp3');
const collisionSound = new Audio('assets/sounds/sfx_snowball_hit.mp3');

function playBackgroundMusic() {
  backgroundMusic.currentTime = 0;
  backgroundMusic.loop = true;
  backgroundMusic.play();
}

function resumeBackgroundMusic() {
  backgroundMusic.play();
}

function stopBackgroundMusic() {
  backgroundMusic.pause();
}

function playJumpSound() {
  jumpSound.play();
}

function playCollisionSound() {
  collisionSound.play();
}

export default {
  playBackgroundMusic,
  resumeBackgroundMusic,
  stopBackgroundMusic,
  playJumpSound,
  playCollisionSound
};
