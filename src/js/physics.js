const g = -6;

function calcUniformAcceleration(y0, v0, t) {
  return y0 + v0 * t - 1/2 * g * t * t;
}

function calcUniformMovement(initialPosition, v0) {
  return initialPosition + v0;
}

export default {
  calcUniformAcceleration,
  calcUniformMovement
};
