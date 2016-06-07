var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var imageObj1 = new Image();
var imageObj2 = new Image();
imageObj1.setAttribute('crossOrigin', 'anonymous');
imageObj2.setAttribute('crossOrigin', 'anonymous');
imageObj1.src = "http://www2.shutterstock.com/webstack/img/lohp/carousel/Vectors/LOHP_VectorCarousel_247045993.jpg";
imageObj2.src =  "http://www2.shutterstock.com/webstack/img/lohp/carousel/Vectors/LOHP_VectorCarousel_268839575.jpg";

imageObj1.onload = function() {
   ctx.drawImage(imageObj1, 0, 0, 328, 526);
   imageObj2.onload = function() {
      ctx.drawImage(imageObj2, 100, 100, 200, 200);
      var img = c.toDataURL("image/png");
      console.log(img);
   }
};
