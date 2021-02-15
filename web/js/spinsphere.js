var rotX = 0;
var rotY = 0;
var rotZ = 0;

var font;
var img;
var message = "Roshan is a nob";

function preload() {
  //font = loadFont("spin/Ubuntu-Title.ttf")
  img = loadImage("assets/world_map.png");
}

function setup() {
  createCanvas(80, 80, WEBGL);
}

function draw() {
  background(40, 180, 200);
  
  rotX += 0.000;
  rotY += 0.01;
  rotZ += 0.000;
  
  push();
  

  
  fill(50, 130, 0);
  stroke(20, 100, 0);
  noStroke();
  
  translate(0, 0, 10);
  
  rotateX(rotX);
  rotateY(rotY);
  rotateZ(rotZ);
  texture(img);
  sphere(25, 16, 10);

  pop();
  
    fill(255, 0, 0);
  stroke(255, 0, 0);
  //textFont(font);
  text(message, -width/2, height/2-1);

}