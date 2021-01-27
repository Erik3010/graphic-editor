class Element {
  constructor({ x, y, width, height, id, colorKey }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.isSelected = false;

    this.shapeType = this.constructor.name;

    this.id = `${this.shapeType}-${id}`;

    this.colorKey = colorKey;

    this.boxWidth = 8;
    this.margin = this.boxWidth / 2;
  }
  drawSelection() {
    if (!this.isSelected) return;

    let x = this.x;
    let y = this.y;
    let width = this.width;
    let height = this.height;

    if (this.shapeType === "Circle") {
      x = this.x - this.width;
      y = this.y - this.width;
      width = this.width + this.width;
      height = this.height + this.height;
    } else if (this.shapeType === "Text") {
      x = this.x - this.width / 2;
      y = this.y - this.height;
    }

    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.strokeStyle = "#55BDFA";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    this.drawBox({ x, y });
    this.drawBox({ x: x + width, y });
    this.drawBox({ x, y: y + height });
    this.drawBox({ x: x + width, y: y + height });
  }
  drawBox({ x, y }) {
    ctx.beginPath();
    ctx.rect(x - this.margin, y - this.margin, this.boxWidth, this.boxWidth);
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#55BDFA";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}
