function collage(cells, finalWidth, finalHeight) {
  var finalCanvasWidth = finalWidth || 810;
  var finalCanvasHeight = finalHeight || 415;
  var sectionOfWidth = finalCanvasWidth / cells;

  createCanvases(cells, sectionOfWidth, finalCanvasHeight);

  var finalCanvas = document.createElement('canvas');
  finalCanvas.setAttribute('id', 'finalCanvas');
  finalCanvas.width = finalCanvasWidth;
  finalCanvas.height = finalCanvasHeight;
  finalCanvas.style.display = 'none';
  document.body.appendChild(finalCanvas);
}

function createCanvases(cells, canvasWidth, canvasHeight) {
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

function addImage(imgID, canvasID) {
  var canvas = document.getElementById(canvasID);
  var src = `http://proxy.topixcdn.com/ipicimg/${imgID}-rszh${canvas.height}`;
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.style.display = 'none';
  var offsetX = 0.5;
  var offsetY = 0.0;
  img.onload = function() {
    // draw image onto canvas
    //ctx.drawImage(img, 0, 0);
    drawImageProp(ctx, img, 0, 0, canvas.width, canvas.height, offsetX, offsetY);
  }
  img.src = src;
}

function changeXOffset(imgID, canvasID) {
  var canvas = document.getElementById(canvasID);
  var src = `http://proxy.topixcdn.com/ipicimg/${imgID}-rszh${canvas.height}`;
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function createFinalImage() {
  // draw temp canvases onto final canvas
  // convert final canvas to data
}

// calculate correct offsets to preserve aspect ratio by cropping and draw on temp canvas
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
