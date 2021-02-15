var rotX = 0;
var rotY = 0;
var rotZ = 0;

var font;

function preload() {
  font = loadFont("Ubuntu-Title.ttf")
}

function setup() {
  createCanvas(80, 80, WEBGL);
}

function draw() {
  background(40, 180, 200);
  
  rotX += 0.02;
  rotY += 0.01;
  rotZ += 0.002;
  
  push();
  
  
  
  fill(50, 130, 0);
  stroke(20, 100, 0);
  
  strokeWeight(1);
  
  translate(0, 0, 10);
  
  rotateX(rotX);
  rotateY(rotY);
  rotateZ(rotZ);

  sphere(25, 16, 10);

  pop();
  
    fill(255, 0, 0);
  stroke(255, 0, 0);
  textFont(font);
  textAlign(CENTER);
  text("Roshan is a nob", width/2-39, height/2-1);

}