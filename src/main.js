const canvasEl = document.querySelector("#canvas");
const ctx = canvasEl.getContext("2d");

const btnTools = document.querySelectorAll(".tools-container > button");

const CANVAS = {
  WIDTH: canvasEl.width,
  HEIGHT: canvasEl.height,
};

const ut = new Utility();
const handler = new Handler();

// setup hitcanvas
const hitCanvas = document.createElement("canvas");
hitCanvas.width = CANVAS.WIDTH;
hitCanvas.height = CANVAS.HEIGHT;
const hitCtx = hitCanvas.getContext("2d");

const colorKeys = {};
const objects = [];

let selectedObject = [];
let mouseDown = false;

const mouse = { x: 0, y: 0 };
const last = { x: 0, y: 0 };

canvasEl.addEventListener(
  "mousedown",
  handler.handleCanvasMouseDown.bind(handler)
);

canvasEl.addEventListener("mouseup", handler.handleCanvasMouseUp.bind(handler));

canvas.addEventListener(
  "mousemove",
  handler.handleCanvasMouseMove.bind(handler)
);

canvas.addEventListener("click", handler.handleCanvasClick.bind(handler));
canvas.addEventListener("dblclick", handler.handleCanvasDblClick.bind(handler));

btnTools.forEach((button) => {
  button.addEventListener("click", () => {
    drawShape(button.dataset.shape);
  });
});

function drawShape(shape) {
  let shapeClass;

  const lastShape = objects.filter((obj) => obj.shapeType == shape).length;

  let colorKey = getColorKey();

  switch (shape) {
    case "Rect":
      shapeClass = new Rect({
        x: CANVAS.WIDTH / 2 - 50,
        y: CANVAS.HEIGHT / 2 - 50,
        width: 100,
        height: 100,
        id: lastShape + 1,
        colorKey,
      });
      break;
    case "Circle":
      shapeClass = new Circle({
        x: CANVAS.WIDTH / 2,
        y: CANVAS.HEIGHT / 2,
        width: 50,
        height: 50,
        id: lastShape + 1,
        colorKey,
      });
      break;
    case "Text":
      shapeClass = new Text({
        x: CANVAS.WIDTH / 2,
        y: CANVAS.HEIGHT / 2,
        font: "Arial",
        fontSize: 30,
        colorKey,
      });
  }
  colorKeys[colorKey] = shapeClass;
  objects.push(shapeClass);

  drawShapes();
}

function drawShapes() {
  ctx.clearRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);
  hitCtx.clearRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);

  objects.forEach((obj) => obj.draw());
}

function detectShape({ x, y }) {
  const pixel = hitCtx.getImageData(x, y, 1, 1).data;
  const [r, g, b] = pixel;
  const color = `rgb(${r}, ${g}, ${b})`;

  return colorKeys[color];
}

function getColorKey() {
  while (true) {
    let randomColor = ut.randomColor();
    if (!colorKeys[randomColor]) return randomColor;
  }
}

/**
 * ? --------------------------------------------
 * ? Will use this code in somdeday
 * ? --------------------------------------------
 */

// function checkIntersection(obj, mouse) {
//   if (
//     Math.pow(mouse.x - obj.x, 2) + Math.pow(mouse.y - obj.y, 2) <
//     Math.pow(obj.width, 2)
//   ) {
//     obj.isSelected = true;
//   } else if (
//     mouse.x >= obj.x &&
//     mouse.x <= obj.x + obj.width &&
//     mouse.y >= obj.y &&
//     mouse.y <= obj.y + obj.height
//   ) {
//     obj.isSelected = true;
//   }
// }
