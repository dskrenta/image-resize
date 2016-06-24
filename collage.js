class Collage {
  constructor(cells, finalWidth, finalHeight) {
    this.cells = cells;
    this.finalCanvasWidth = finalWidth || 810;
    this.finalCanvasHeight = finalHeight || 415;
    this.sectionOfWidth = this.finalCanvasWidth / this.cells;
    this.offsetY = 0.0;
    this.imgRef = [];

    var count = 1;
    while(count <= this.cells) {
      var canvas = document.createElement('canvas');
      canvas.setAttribute('id', `canvas${count}`);
      canvas.width = this.sectionOfWidth;
      canvas.height = this.finalCanvasHeight;
      document.body.appendChild(canvas);
      count++;
    }

    var finalCanvas = document.createElement('canvas');
    finalCanvas.setAttribute('id', 'finalCanvas');
    finalCanvas.width = this.finalCanvasWidth;
    finalCanvas.height = this.finalCanvasHeight;
    finalCanvas.style.display = 'none';
    document.body.appendChild(finalCanvas);
  }

  createCanvases(cells, canvasWidth, canvasHeight) {
    var count = 1;
    while(count <= cells) {
      var canvas = document.createElement('canvas');
      canvas.setAttribute('id', `canvas${count}`);
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      document.body.appendChild(canvas);
      count++;
    }
  }

  addImage(imgID, canvasID) {
    var imgObject = {
      imgID: imgID,
      canvasID: canvasID,
      offsetX: 0.5
    };
    this.imgRef.push(imgObject);
    var canvas = document.getElementById(canvasID);
    var src = `http://proxy.topixcdn.com/ipicimg/${imgID}-rszh${canvas.height}`;
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.style.display = 'none';
    img.onload = function() {
      drawImageProp(ctx, img, 0, 0, canvas.width, canvas.height, this.offsetX, this.offsetY);
    }
    img.src = src;
  }

  /*
  changeXOffset(cell, moveDirection) {
    var canvas = document.getElementById(this.imgRef[cell].canvasID);
    var src = `http://proxy.topixcdn.com/ipicimg/${this.imgRef[cell].imgID}-rszh${canvas.height}`;
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var offsetX = parseFloat(this.imgRef[cell].offsetX);
    if(moveDirection === 'left') {
      this.imgRef[cell].offsetX = (offsetX - 0.1).toFixed(1);
    }
    else if(moveDirection === 'right') {
      this.imgRef[cell].offsetX = (offsetX + 0.1).toFixed(1);
    }
    var img = new Image();
    img.offsetX = this.imgRef[cell].offsetX;
    img.offsetY = this.offsetY;
    img.style.display = 'none';
    img.onload = function() {
      drawImageProp(ctx, img, 0, 0, canvas.width, canvas.height, this.offsetX, this.offsetY);
      console.log(this.offsetX)
    }
    img.src = src;
  }
  */
  createFinalImage() {

  }
};

function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
  if (arguments.length === 2) {
    x = y = 0;
    w = ctx.canvas.width;
    h = ctx.canvas.height;
  }

  /// default offset is center
  offsetX = typeof offsetX === 'number' ? offsetX : 0.5;
  offsetY = typeof offsetY === 'number' ? offsetY : 0.5;

  /// keep bounds [0.0, 1.0]
  if (offsetX < 0) offsetX = 0;
  if (offsetY < 0) offsetY = 0;
  if (offsetX > 1) offsetX = 1;
  if (offsetY > 1) offsetY = 1;

  var iw = img.width,
  ih = img.height,
  r = Math.min(w / iw, h / ih),
  nw = iw * r,   /// new prop. width
  nh = ih * r,   /// new prop. height
  cx, cy, cw, ch, ar = 1;

  /// decide which gap to fill
  if (nw < w) ar = w / nw;
  if (nh < h) ar = h / nh;
  nw *= ar;
  nh *= ar;

  /// calc source rectangle
  cw = iw / (nw / w);
  ch = ih / (nh / h);

  cx = (iw - cw) * offsetX;
  cy = (ih - ch) * offsetY;

  /// make sure source rectangle is valid
  if (cx < 0) cx = 0;
  if (cy < 0) cy = 0;
  if (cw > iw) cw = iw;
  if (ch > ih) ch = ih;

  /// fill image in dest. rectangle
  ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
}
