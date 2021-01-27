class Utility {
  randomColor() {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);

    return `rgb(${r}, ${g}, ${b})`;
  }
  changeCursor(mode) {
    document.body.style.cursor = mode;
  }
  handleCursor(e) {
    const shape = detectShape({ x: e.offsetX, y: e.offsetY });

    if (!shape) this.changeCursor("default");
    else {
      if (shape.isSelected) this.changeCursor("move");
      else this.changeCursor("pointer");
    }
  }
}
