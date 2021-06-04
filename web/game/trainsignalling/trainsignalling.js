var blocks = new Array(30);
var trains = [];

function setup() {
  testTrain = new train();
  createCanvas(windowWidth, 100);
  for (var i = 0; i < blocks.length; i++) {
    blocks[i] = 5;
  }
}

function draw() {
  background(100);

  for (var i = 0; i < blocks.length; i++) {
    var x = (width / blocks.length) * i;
    var w = width / blocks.length;
    push();
    noFill();
    strokeWeight(5);
    stroke(0);
    rect(x, 0, w, height);
    pop();
    push();
    noStroke();

    switch (blocks[i]) {
      case 0:
        fill(255, 0, 0);
        ellipse(x, height * 0.35, 10, 10);

        break;
      case 1:
        fill(255, 0, 0);
        ellipse(x, height * 0.35, 10, 10);
        fill(255, 255, 0);
        ellipse(x, height * 0.15, 10, 10);
        break;
      case 2:
        fill(255, 255, 0);
        ellipse(x, height * 0.15, 10, 10);
        break;
      case 3:
        fill(255, 255, 0);
        ellipse(x, height * 0.15, 10, 10);
        fill(0, 255, 0);
        ellipse(x, height * 0.25, 10, 10);
        break;
      case 4:
        fill(0, 255, 0);
        ellipse(x, height * 0.25, 10, 10);
        break;
      case 5:
        fill(0, 255, 0);
        ellipse(x, height * 0.25, 10, 10);
        ellipse(x, height * 0.05, 10, 10);
        break;
    }
    pop();
  }

  for(var t in trains) {
    trains[t].display(t);
    trains[t].update();
  }
  
  if(blocks[0] > 0) {
     trains.push(new train());
  }
}

function mousePressed() {
  trains.push(new train());
}

var train = function () {
  this.block = 0;
  this.changeU = 0.01;
  this.changeD = 0.01;
  this.speed = 0.5;
  this.targetSpeed = 0;
  this.maxSpeed = 1.2;
  this.x = 0;
};

train.prototype.display = function (value) {
  push();
  fill(200);
  stroke(0);
  rectMode(CENTER);
  rect(this.x, height * 0.7, 18, 8);
  //rect(this.x - 18, height * 0.7, 18, 8);
  //rect(this.x - 36, height * 0.7, 18, 8);
  pop();
  push();
  fill(255, 255, 0);
  noStroke();
  ellipse(this.x+8, height*0.7-2, 3, 3);
  ellipse(this.x+8, height*0.7+2, 3, 3);
  //ellipse(this.x-44, height*0.7-2, 3, 3);
  //ellipse(this.x-44, height*0.7+2, 3, 3);  
  pop();
  push();
  fill(255);
  stroke(0);
  textAlign(CENTER);
  text("id " +value+" - "+round(this.speed*30), this.x, height*0.6);
  pop();
};

train.prototype.update = function () {
  if(this.x < width-(width / blocks.length)) {
    this.x += this.speed;

    if (this.speed > this.targetSpeed) {
      this.speed -= this.changeD;
    } else {
      this.speed += this.changeU;
    }

    var cBlock = floor(this.x / (width / blocks.length));
    var nextBlock = blocks[cBlock + 1];

    switch (nextBlock) {
      case 0:
        this.targetSpeed = 0;
        break;
      case 1:
        this.targetSpeed = this.maxSpeed*0.2;
        break;
      case 2:
        this.targetSpeed = this.maxSpeed*0.5;
        break;
      case 3:
        this.targetSpeed = this.maxSpeed;
        break;
      case 4:
        this.targetSpeed = this.maxSpeed;
        break;
      case 5:
        this.targetSpeed = this.maxSpeed*1.2;
        break;
    }

    blocks[cBlock] = 0;
    blocks[cBlock-1] = 1;
    blocks[cBlock-2] = 2;
    blocks[cBlock-3] = 3;
    blocks[cBlock-4] = 4;
    blocks[cBlock-5] = 5;
  }
  else {
    this.speed = 0;
  }
};
