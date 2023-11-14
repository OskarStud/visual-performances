const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1000, 1000]
};

const sketch = () => {
  return (props) => {
    const { context, width, height } = props;
    context.fillStyle = 'darkblue';
    context.fillRect(0, 0, width, height);

    function drawRect(i) {
      context.strokeStyle = 'cyan';
      context.lineWidth = 8;
      context.strokeRect(400, 200, 50 * i, 50 * i)
      context.rotate(5 * i / 180)
    }

    for (let i = 2; i < 10; i += 2) {
      drawRect(i)
    }

  };
};

canvasSketch(sketch, settings);
