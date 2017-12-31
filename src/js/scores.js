let score = 0;

function reset() {
  score = 0;
}

function increment() {
  score += 1;
}

function getScore() {
  return score;
}

export default {
  getScore,
  increment,
  reset
};
