const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1000, 1000]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'darkred';
    context.fillRect(0, 0, width, height);
  };
};

canvasSketch(sketch, settings);
