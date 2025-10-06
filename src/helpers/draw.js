// Instance-based drawing helper: create multiple independent canvases
(function (window) {
  function KanaDrawInstance(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.ctx.lineWidth = 18;
    this.ctx.strokeStyle = "#000";
    this.isDrawing = false;
    this.strokes = [];
    this.currentStroke = [];
    this._bind();
  }

  KanaDrawInstance.prototype._bind = function () {
    this._onDown = this._onDown.bind(this);
    this._onMove = this._onMove.bind(this);
    this._onUp = this._onUp.bind(this);
    this.canvas.addEventListener("pointerdown", this._onDown);
    this.canvas.addEventListener("pointermove", this._onMove);
    window.addEventListener("pointerup", this._onUp);
    this.clear();
  };

  KanaDrawInstance.prototype._onDown = function (e) {
    this.isDrawing = true;
    this.currentStroke = [];
    const p = this._getPoint(e);
    this.currentStroke.push(p);
  };

  KanaDrawInstance.prototype._onMove = function (e) {
    if (!this.isDrawing) return;
    const p = this._getPoint(e);
    this.currentStroke.push(p);
    this._redraw();
  };

  KanaDrawInstance.prototype._onUp = function (e) {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    this.strokes.push(this.currentStroke);
    this.currentStroke = [];
  };

  KanaDrawInstance.prototype._getPoint = function (e) {
    const r = this.canvas.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (this.canvas.width / r.width),
      y: (e.clientY - r.top) * (this.canvas.height / r.height),
    };
  };

  KanaDrawInstance.prototype._redraw = function () {
    this._clearCanvasOnly();
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 18;
    for (const s of this.strokes) this._drawStroke(s);
    this._drawStroke(this.currentStroke);
  };

  KanaDrawInstance.prototype._drawStroke = function (s) {
    if (!s || s.length === 0) return;
    this.ctx.beginPath();
    this.ctx.moveTo(s[0].x, s[0].y);
    for (let i = 1; i < s.length; i++) this.ctx.lineTo(s[i].x, s[i].y);
    this.ctx.stroke();
  };

  KanaDrawInstance.prototype._clearCanvasOnly = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  KanaDrawInstance.prototype.clear = function () {
    this.strokes = [];
    this.currentStroke = [];
    this._clearCanvasOnly();
  };

  KanaDrawInstance.prototype.exportImageData = function (size = 128) {
    const tmp = document.createElement("canvas");
    tmp.width = size;
    tmp.height = size;
    const tctx = tmp.getContext("2d");
    tctx.fillStyle = "#fff";
    tctx.fillRect(0, 0, size, size);
    tctx.drawImage(this.canvas, 0, 0, size, size);
    return tctx.getImageData(0, 0, size, size);
  };

  KanaDrawInstance.prototype.getCanvas = function () {
    return this.canvas;
  };

  // Factory
  const API = {
    create: function (idOrElem, opts) {
      const canvas =
        typeof idOrElem === "string"
          ? document.getElementById(idOrElem)
          : idOrElem;
      if (!canvas) return null;
      return new KanaDrawInstance(canvas);
    },
  };

  window.KanaDraw = API;
})(window);
