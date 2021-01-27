class Circle extends Element {
  constructor(props) {
    super(props);
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();

    hitCtx.beginPath();
    hitCtx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
    hitCtx.fillStyle = this.colorKey;
    hitCtx.fill();
    hitCtx.closePath();

    this.drawSelection();
  }
}
