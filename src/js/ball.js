import physics from './physics';

const currentVelocity = -1.8;
const width = 10;
const height = 10;
const spriteDataURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAPUlEQVQYlWNggIK+uv//0bHduv//GZBBX91/nACuGJ+i/////59xBap4qCuEKcLp8xlXsCiCAZggOobJAwAbLTukKFj3YwAAAABJRU5ErkJggg==';
const sprite = new Image();
sprite.src = spriteDataURI;

function create() {
  let x = 200;
  const y = getInitialY();

  return {
    update: function() {
      x = physics.calcUniformMovement(x, currentVelocity);
    },

    paint: function(ctx) {
      ctx.drawImage(sprite, x, y);
    },

    isOut: function() {
      return x <= -width;
    },

    getX: function() {
      return x;
    },

    getY: function() {
      return y;
    },

    getWidth,

    getHeight
  };
}

function getInitialY() {
  return 100 - (Math.random() * 30) - 10;
}

function getWidth() {
  return width;
}

function getHeight() {
  return height;
}

export default {
  create
};
