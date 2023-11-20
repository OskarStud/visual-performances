const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const Color = require('canvas-sketch-util/color');
const risoColors = require('riso-colors');

const settings = {
  dimensions: [1080, 1080],
  // animate: true
};

const sketch = (props) => {
  const { width, height } = props;
  let x, y, w, h, fill, stroke, blend;
  const num = 100;
  const degress = 15;
  let rects = [];
  let rectColors = [
    random.pick(risoColors).hex,
    random.pick(risoColors).hex,
  ];
  let bgColor = random.pick(risoColors).hex;

  for (let i = 0; i < num; i++) {
    x = random.range(0, width)
    y = random.range(0, height)
    w = random.range(600, width)
    h = random.range(40, 200)
    fill = random.pick(rectColors)
    stroke = random.pick(rectColors)
    blend = (random.value() > .5) ? 'overlay' : 'source-over';
    rects.push({ x, y, w, h, fill, stroke, blend })
  };

  return ({ context }) => {
    context.fillStyle = bgColor;
    context.fillRect(0, 0, width, height);

    context.save();
    context.translate(width * .5, height * .5);

    drawPolygon({ context, radius: 400, sides: 5 })
    context.lineWidth = 10;
    context.strokeStyle = 'black';
    context.stroke();
    context.clip();

    rects.forEach(rect => {
      const { x, y, w, h, fill, stroke, blend } = rect;
      let shadowColor;

      context.save(); // Сохраняет позиции(стейта) translate
      context.translate(width * -.5, height * -.5);
      context.translate(x, y);

      context.strokeStyle = stroke;
      context.lineWidth = 10;
      context.fillStyle = fill;
      context.globalCompositeOperation = blend;
      drawSkewRect({ context, deg: degress, w, h });
      shadowColor = Color.offsetHSL(fill, 0, 0, -20);
      shadowColor.rgba[3] = .5;
      context.shadowColor = Color.style(shadowColor.rgba);
      context.shadowOffsetX = -10;
      context.shadowOffsetY = 20;
      context.fill();
      context.shadowColor = null;
      context.stroke();

      context.lineWidth = 2;
      context.strokeStyle = 'black';
      context.stroke();

      context.restore(); // Возвращает позиции(стейта) translate для остального документа
    })
    context.restore();
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

function drawPolygon({ context, radius = 100, sides = 3 }) {
  const section = Math.PI * 2 / sides;

  context.beginPath();
  context.moveTo(0, -radius);

  for (let i = 0; i < sides; i++) {
    const theta = i * section - Math.PI * 0.5;
    context.lineTo(Math.cos(theta) * radius, Math.sin(theta) * radius);
  }

  context.closePath();
}

canvasSketch(sketch, settings);
