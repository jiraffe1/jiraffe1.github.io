var Engine = Matter.Engine,
  //Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;
var engine = Engine.create();
var world;
var debug = false;
var letters = [];
var cursorX = 50;
var actualX = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  world = engine.world;
  Engine.run(engine);
  
  var top = Bodies.rectangle(width/2, 0, width, 1);
  var bottom = Bodies.rectangle(width/2, height, width, 1);
  var right = Bodies.rectangle(width, height/2, 1,height);
  var left = Bodies.rectangle(0, height/2, 1, height);
  
  top.isStatic = true;
  bottom.isStatic = true;
  right.isStatic = true;
  left.isStatic = true;

  World.add(world, top);
  World.add(world, bottom);
  World.add(world, left);
  World.add(world, right);
}

function draw() {
  background(100);
  
  for(var i in letters) {
    letters[i].display();
  }
  push();
  noFill();
  stroke(0, 255, 0);
  rectMode(CENTER);
  rect(actualX, 50, 10, 50);
  actualX = lerp(actualX, cursorX, 0.4);
  pop();
}

function keyTyped() {
  letters.push(new letter(cursorX, 50, key));
  cursorX+=30;
  
  if(cursorX > width-50) {
    cursorX = 50;
  }
}

var letter = function(x, y, l) {
  this.character = l; 
  this.body = Bodies.rectangle(x, y, 30, 50);
  World.add(world, this.body);
}

letter.prototype.display = function() {
  if(debug) {
    push();
    noFill();
    stroke(0, 255, 0);
    rectMode(CENTER);
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    rect(0, 0, 30, 50);
    pop();
  }
  
  push();
  textAlign(CENTER);
  fill(0);
  stroke(255);
  translate(this.body.position.x, this.body.position.y);
  rotate(this.body.angle);
  translate(0,12.5);
  textSize(55);
  text(this.character, 0, 0);
  pop();
}