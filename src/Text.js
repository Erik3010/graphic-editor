class Text extends Element {
  constructor(props) {
    super(props);

    this.font = props.font;
    this.fontSize = props.fontSize;

    this.text = "Add Text Here";

    this.textAttr;

    this.isHidden = false;
  }
  draw() {
    if (this.isHidden) return;

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.font = `${this.fontSize}px ${this.font}`;
    this.textAttr = ctx.measureText(this.text);
    ctx.fillText(this.text, this.x - this.textAttr.width / 2, this.y);
    ctx.closePath();

    this.height =
      this.textAttr.actualBoundingBoxAscent +
      this.textAttr.actualBoundingBoxDescent;

    this.width = this.textAttr.width;

    hitCtx.beginPath();
    hitCtx.rect(
      this.x - this.textAttr.width / 2,
      this.y - this.height,
      this.textAttr.width,
      this.height
    );
    hitCtx.fillStyle = this.colorKey;
    hitCtx.fill();
    hitCtx.closePath();

    this.drawSelection();
  }
}
