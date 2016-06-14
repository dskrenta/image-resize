/*
  Creates tripic, quadpic, and dualpic
  @param {array} images - array of image urls
  @param {number} finalWidth - final image width, defaults to 810 px
  @param {number} finalHeight - final image height, defaults to 415 px
 */
function tripic(images, finalWidth, finalHeight) {
  var canvasTest = document.createElement('canvas');
  if (!canvasTest.getContext) {
    alert('HTML5 canvas is not supported by your browser, please switch to another browser or a newer version');
    return;
  }
  else {
    var finalCanvasWidth = finalWidth || 810; // default 810 px width (FB)
    var finalCanvasHeight = finalHeight || 415; // default 415 px height (FB)
    var cells = images.length;
    var sectionOfWidth = (finalCanvasWidth / cells);

    // switch for default x and y offsets
    var offsetX, offsetY;
    switch (images.length) {
      case 2: // 2 images
        offsetX = 0.5;
        offsetY = 0.5;
        break;
      case 3: // 3 images (recommended for correct size)
        offsetX = 0.5;
        offsetY = 0.0;
        break;
      case 4: // 4 images
        offsetX = 0.5;
        offsetY = 0.0;
        break;
    }

    // create final canvas
    var finalCanvas = document.createElement('canvas');
    finalCanvas.setAttribute('id', 'finalCanvas');
    finalCanvas.setAttribute('width', finalCanvasWidth);
    finalCanvas.setAttribute('height', finalCanvasHeight);
    document.body.appendChild(finalCanvas);

    // create image and sub canvas for each image
    for (var i = 0; i < images.length; i++) {
      var canvas = document.createElement('canvas'); // create sub canvas
      canvas.setAttribute('width', sectionOfWidth);
      canvas.setAttribute('height', finalCanvasHeight);
      var canvasID = 'canvas' + i;
      canvas.setAttribute('id', canvasID);
      canvas.style.display = 'none';
      document.body.appendChild(canvas);
      var img = new Image(); // create new image
      var imageID = 'image' + i;
      img.style.display = 'none';
      img.id = imageID;
      document.body.appendChild(img);
      generateOnload(imageID, canvasID, 'finalCanvas', sectionOfWidth, i, offsetX, offsetY, cells);
      img.src = images[i];
    }
  }
}

// generate onload events for images to be redrawn onto canvas with custom offsets
function generateOnload(targetImageID, targetCanvasID, finalCanvasID, sectionOfWidth, index, offsetX, offsetY, cells) {
  var img = document.getElementById(targetImageID);
  var canvas = document.getElementById(targetCanvasID);
  var ctx = canvas.getContext('2d');
  var finalCanvas = document.getElementById(finalCanvasID);
  var finalCtx = finalCanvas.getContext('2d');
  img.onload = function() {
    drawImageProp(ctx, img, 0, 0, canvas.width, canvas.height, offsetX, offsetY);
    var xPos = 0;
    if (index != 0) xPos = (sectionOfWidth * index);
    finalCtx.drawImage(canvas, xPos, 0, canvas.width, canvas.height);
    if (index === (cells - 1)) {
      try {
        var finalImageURL = canvas.toDataURL('image/png');
        var finalImage = document.createElement('img');
        //finalImage.style.display = 'none';
        finalImage.src = finalImageURL;
        document.body.appendChild(finalImage);
      }
      catch (e) {
        console.log(e);
      }
    }
  }
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
