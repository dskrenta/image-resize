function tripic(images, finalWidth, finalHeight) {
  var finalCanvasWidth = finalWidth || 810; // default 810 px width
  var finalCanvasHeight = finalHeight || 415; // default 415 px height
  var cells = images.length;
  var sectionOfWidth = (finalCanvasWidth / cells);

  // create final canvas
  var finalCanvas = document.createElement("canvas");
  //finalCanvas.setAttribute("type", "hidden");
  finalCanvas.setAttribute("id", "finalCanvas");
  finalCanvas.setAttribute("width", finalCanvasWidth);
  finalCanvas.setAttribute("height", finalCanvasWidth);
  var finalCtx = finalCanvas.getContext('2d');

  // create image and sub canvas for each image
  for (var i = 0; i < images.length; i++) {
    var canvas = document.createElement("canvas"); // create sub canvas
    //canvas.setAttribute("type", "hidden"); // hide subcanvas element
    canvas.setAttribute("width", sectionOfWidth); // set subcanvas width to section of final canvas
    canvas.setAttribute("height", finalCanvasHeight); // set subcanvas height to final canvas height
    var canvasID = "canvas" + i;
    canvas.setAttribute("id", canvasID);
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d'); // get sub canvas context
    var img = new Image(); // create new image
    var imageID = "image" + i;
    img.style.display = "none";
    img.id = imageID;
    document.body.appendChild(img);
    generateOnload(imageID, canvasID);
    /*
    img.onload = function() {
      drawImageProp(ctx, img, 0, 0, canvas.width, canvas.height, 0.5, 0.0);
      //drawFinal(0);
      var xPos = 0;
      if (i != 0) xPos = (sectionOfWidth * i);
      finalCtx.drawImage(canvas, xPos, 0, canvas.width, canvas.height);
    }
    */
    img.src = images[i];
  }
}

function generateOnload(targetImageID, targetCanvasID) {
  var img = document.getElementById(targetImageID);
  var canvas = document.getElementById(targetCanvasID);
  var ctx = canvas.getContext('2d');
  img.onload = function() {
    drawImageProp(ctx, img, 0, 0, canvas.width, canvas.height, 0.5, 0.0);
    console.log(targetImageID + " Loaded");
  }
}

function createPic(imgs) {
  /*
  var finalCanvas = document.createElement('canvas');
  finalCanvas.setAttribute('height', 810);
  finalCanvas.setAttribute('width', 415);
  var finalCtx = finalCanvas.getContext('2d');
  */

  var finalCanvasWidth = 810; // default 810 px width
  var finalCanvasHeight = 415; // default 415 px height
  var cells = imgs.length;
  var sectionOfWidth = (finalCanvasWidth / cells);

  for (var i = 0; i < imgs.length; i++) {
    var canvas = document.createElement("canvas"); // create sub canvas
    canvas.setAttribute("width", sectionOfWidth); // set subcanvas width to section of final canvas
    canvas.setAttribute("height", finalCanvasHeight); // set subcanvas height to final canvas height
    var canvasID = "canvas" + i;
    canvas.setAttribute("id", canvasID);
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d'); // get sub canvas context

    var img = new Image();
    img.onload = function() {
      console.log(img.src);
      console.log(ctx);
      drawImageProp(ctx, img, 0, 0, sectionOfWidth, finalCanvasHeight, 0.5, 0.0);
    }
    img.src =  imgs[i];
  }
}

function draw(ctx, img, canvas) {
  drawImageProp(ctx, img, 0, 0, canvas.width, canvas.height, 0.5, 0.0);
}

function drawFinal(position) {
  if(position == 0) {
    finalCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
  }
  else if (position == 1) {
    finalCtx.drawImage(canvas1, thirdOfWidth, 0, canvas1.width, canvas1.height);
  }
  else if (position == 2) {
    finalCtx.drawImage(canvas2, (thirdOfWidth * 2), 0, canvas2.width, canvas2.height);
  }
}

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
