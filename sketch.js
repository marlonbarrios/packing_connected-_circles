const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5()


var circles = [];

var minRadius = 3;
var maxRadius = 50;

var showCircle = true;
var showLine = true;



const settings = {
  pixelsPerInch: 300,
  p5: true,
  duration: 3,
  animate: true,
  dimensions: [512, 512],
  bleed: 1 / 8,
};


canvasSketch(() => {
  
  noFill();
 
  ellipseMode(RADIUS);
  rectMode(RADIUS);

  return ({contex,
    width,
    height
  }) => {
clear();

  // Choose a random or the current mouse position
  var newX = random(maxRadius, width - maxRadius);
  var newY = random(maxRadius, height - maxRadius);

  var intersection = false;
  for (var newR = maxRadius; newR >= minRadius; newR--) {
    for (var i = 0; i < circles.length; i++) {
      var d = dist(newX, newY, circles[i].x, circles[i].y);
      intersection = d < circles[i].r + newR;
      if (intersection) {
        break;
      }
    }
    if (!intersection) {
      circles.push(new Circle(newX, newY, newR));
      break;
    }
  }

  for (var i = 0; i < circles.length; i++) {
    if (showLine) {
      // Try to find an adjacent circle to the current one and draw a connecting line between the two
      var closestCircle;
      for (var j = 0; j < circles.length; j++) {
        var d = dist(circles[i].x, circles[i].y, circles[j].x, circles[j].y);
        if (d <= circles[i].r + circles[j].r + 1) {
          closestCircle = circles[j];
          break;
        }
      }
      if (closestCircle) {
        stroke(0);
        strokeWeight(0.95);
        line(circles[i].x, circles[i].y, closestCircle.x, closestCircle.y);
      }
    }

    // Draw the circle itself.
    if (showCircle) circles[i].draw();
  }

}
function Circle(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;

  Circle.prototype.draw = function() {
    stroke(0);
    strokeWeight(1.5);
    ellipse(this.x, this.y, this.r);
  };
}
}, settings);
