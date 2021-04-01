const vanishingPoint =new p5.Vector(800/2, 600/2);

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(10, 80, 205);
  ground();

  box3D(mouseX, mouseY, 1, 100, 100, 100);
}

function ground() {
  push();
  fill(70, 120, 0);
  noStroke();
  rect(0, height / 2, width, height / 2);
  pop();
  
  push();
  stroke(255);
  strokeWeight(3);
  point(vanishingPoint.x, vanishingPoint.y);
}

function project3D(x, y, z) {
  var orig = new p5.Vector(x, y);
  var centre = new p5.Vector(vanishingPoint.x, vanishingPoint.y);
  var pull = new p5.Vector(centre.x- orig.x, centre.y - orig.y);
  pull.setMag(z);
  return orig.sub(pull);
}


function vecLine(a, b) {
  line(a.x, a.y, b.x, b.y);
}

function box3D(x, y, z, w, h, d) {
  var zz = z;
  push();
  fill(255, 255, 255);
  stroke(255, 255, 255);
  noFill();
  strokeWeight(2);
  //rect(x, y, w / zz, h / zz);
  var rearZ = zz;
  
  var topR = project3D(x + w, y, rearZ);
  var topL = project3D(x, y, rearZ);
  var bottomR = project3D(x + w, y + h, rearZ);
  var bottomL = project3D(x, y + h, rearZ);

  vecLine(topR, project3D(topR.x, topR.y, rearZ));
  vecLine(topL, project3D(topL.x, topL.y, rearZ));
  vecLine(bottomR, project3D(bottomR.x, bottomR.y, rearZ));
  vecLine(bottomL, project3D(bottomL.x, bottomL.y, rearZ));
  
  vecLine(topR, topL);
  vecLine(topL, bottomL);
  vecLine(bottomL, bottomR);
  vecLine(bottomR, topR);

  var oldZ = zz;
  rearZ = zz + d;
  var oldtopR = project3D(x + w, y, oldZ);
  var oldtopL = project3D(x, y, oldZ);
  var oldbottomR = project3D(x + w, y + h, oldZ);
  var oldbottomL = project3D(x, y + h, oldZ);
  
  topR = project3D(topR.x, topR.y, rearZ);
  topL = project3D(topL.x, topL.y, rearZ);
  bottomR = project3D(bottomR.x, bottomR.y, rearZ);
  bottomL = project3D(bottomL.x, bottomL.y, rearZ);
  
  vecLine(topR, oldtopR);
  vecLine(topL, oldtopL);
  vecLine(bottomR, oldbottomR);
  vecLine(bottomL, oldbottomL);

  vecLine(topR, topL);
  vecLine(topL, bottomL);
  vecLine(bottomL, bottomR);
  vecLine(bottomR, topR);
  pop();
}