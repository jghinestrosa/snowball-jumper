const SPACE = 32;

function initialize(data) {
  const { onPlayerAction } = data;
  window.addEventListener('keydown', onKeyDown(onPlayerAction));
  window.addEventListener('mousedown', onMouseDown(onPlayerAction));
  window.addEventListener('touchstart', onMouseDown(onPlayerAction));
}

function onKeyDown(onPlayerAction) {
  return (event) => {
    if (event.keyCode === SPACE) {
      onPlayerAction();
    }
  };
}

function onMouseDown(onPlayerAction) {
  return (event) => {
    event.preventDefault();
    onPlayerAction();
  };
}

export default {
  initialize
};
