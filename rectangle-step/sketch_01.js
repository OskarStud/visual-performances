const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [1080, 1080],
  // animate: true
};

const sketch = (props) => {
  const { context, width, height } = props;
  let x, y, w, h, red, blue;
  const num = 20;
  const degress = 30;
  let rects = [];

  for (let i = 0; i < num; i++) {
    x = random.range(0, width)
    y = random.range(0, height)
    w = random.range(200, 600)
    h = random.range(40, 200)
    red = random.range(0, 100);
    blue = random.range(0, 100);

    rects.push({ x, y, w, h, red, blue })
  };

  return ({ context }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    rects.forEach(rect => {
      const { x, y, w, h, red, blue } = rect;

      context.save(); // Сохраняет позиции translate
      context.translate(x, y);

      context.strokeStyle = `rgb(${red}% 20% ${blue}%)`;
      drawSkewRect({ context, deg: degress, w, h })
      context.stroke();

      context.restore(); // Возвращает позиции translate для остального документа
    })
  };
};

function drawSkewRect({ context, w = 600, h = 100, deg = 45 }) {
  let angle, rx, ry;
  angle = math.degToRad(deg);
  rx = Math.cos(angle) * w;
  ry = Math.sin(angle) * w;

  context.save();
  context.translate(rx * -0.5, (ry + h) * -0.5);

  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(rx, ry);
  context.lineTo(rx, ry + h);
  context.lineTo(0, h);
  context.closePath();
  context.restore();

}

canvasSketch(sketch, settings);
