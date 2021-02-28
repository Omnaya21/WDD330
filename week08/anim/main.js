function drawPattern() {
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  context.strokeStyle = "red";
  context.fillStyle = "blue";
  context.fillRect(10,10,100,100);
  context.strokeRect(10, 10, 99, 99);

  var img = new Image();
  img.src = "../images/bg-bike.png";
  img.onload = function() {
    var pattern = context.createPattern(img, "repeat"); 
    context.fillStyle = pattern;                        
    context.fillRect(10, 10, 100, 100);                  
    context.strokeRect(10, 10, 100, 100);             
  };
}