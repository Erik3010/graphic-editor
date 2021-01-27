class Rect extends Element {
  constructor(props) {
    super(props);
  }
  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    hitCtx.beginPath();
    hitCtx.rect(this.x, this.y, this.width, this.height);
    hitCtx.fillStyle = this.colorKey;
    hitCtx.fill();
    hitCtx.closePath();

    this.drawSelection();
  }
}
