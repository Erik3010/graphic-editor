class Handler {
  handleCanvasClick(e) {
    const shape = detectShape({ x: e.offsetX, y: e.offsetY });

    if (shape) {
      if (e.shiftKey) selectedObject.push(shape);
      else {
        objects
          .filter((obj) => obj != shape)
          .forEach((obj) => (obj.isSelected = false));

        selectedObject = [shape];
      }
      shape.isSelected = true;
    } else {
      objects.forEach((obj) => (obj.isSelected = false));
      selectedObject = [];
    }

    drawShapes();
  }
  handleCanvasDblClick(e) {
    const shape = detectShape({ x: e.offsetX, y: e.offsetY });

    const shapeType = shape.constructor.name;

    const textAreaPosition = {
      x: canvasEl.offsetLeft + (shape.x - shape.width / 2),
      y: canvasEl.offsetTop + (shape.y - shape.height),
    };

    if (shapeType === "Text") {
      shape.isHidden = true;

      const textarea = document.createElement("textarea");
      textarea.setAttribute("class", "textarea-helper");
      textarea.style.fontSize = `${shape.fontSize}px`;
      textarea.style.fontFamily = shape.font;
      textarea.style.top = `${textAreaPosition.y}px`;
      textarea.style.left = `${textAreaPosition.x}px`;
      textarea.value = shape.text;
      textarea.focus();
      document.body.appendChild(textarea);

      textarea.addEventListener("keydown", (e) => {
        if (e.keyCode === 13) {
          shape.isHidden = false;
          shape.text = textarea.value;
          document.body.removeChild(textarea);
          drawShapes();
        }
      });
    }

    drawShapes();
  }
  handleCanvasMouseMove(e) {
    ut.handleCursor(e);

    if (!mouseDown) return;

    mouse.x = e.offsetX;
    mouse.y = e.offsetY;

    const shape = detectShape({ x: e.offsetX, y: e.offsetY });
    if (shape) {
      selectedObject.forEach((obj) => {
        obj.x += mouse.x - last.x;
        obj.y += mouse.y - last.y;
      });
    }

    last.x = mouse.x;
    last.y = mouse.y;

    drawShapes();
  }
  handleCanvasMouseDown(e) {
    mouse.x = last.x = e.offsetX;
    mouse.y = last.y = e.offsetY;

    mouseDown = true;
  }
  handleCanvasMouseUp(e) {
    mouseDown = false;
  }
}
