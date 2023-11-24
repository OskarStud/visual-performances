const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'darkred';
    context.fillRect(0, 0, width, height);

    context.save();
    context.matrix(2, 2, 3, 3, 3, 3);
    context.fillStyle = 'yellow';
    context.fillRect(100, 100, 200, 200);
    context.restore();
  };
};

canvasSketch(sketch, settings);
 