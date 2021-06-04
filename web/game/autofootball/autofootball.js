var frameRater = 0;
var redScore = 0;
var blueScore = 0;
var players = [];
var ball;
var teamColours;
var showTargets = false;
var behaviours = [
  "Shoot",
  "Fall Back",
  "Shoot",
  "Goalkeep",
  "Fall Back",
  "Fall Back",
  "Shoot",
  "Chase",
  "Fall Back",
  "Fall Back",
  "Shoot",
  "Fall Back",
];
var referee;
var behaviourUpdate = 500;
var camPos;
var teamSize;

function setup() {
  teamSize = floor(random(11, 22));
  //createCanvas(1000, 600);
  createCanvas(min(windowWidth - 50, 1200), min(windowHeight-50, 800));
  referee = new Player(width/2, height/2 + 90, 3);
  camPos = new p5.Vector(width / 2, height / 2);
  ball = new Ball();
  teamColours = [color(255, 0, 0), color(0, 0, 255), color(100, 100, 100)];

  for (var i = 0; i < teamSize; i++) {
    players.push(new Player(random(0, width / 2), random(height), 1));
  }
  for (var j = 0; j < teamSize; j++) {
    players.push(new Player(random(width / 2, width), random(height), 2));
  }
}

function draw() {
  background(50, 200, 10);

  if (frameCount % 15 == 0) {
    frameRater = floor(frameRate());
  }
  translate(camPos.x, camPos.y);

  //scale(1 + ball.velocity.mag(), 1 + ball.velocity.mag());
  camPos = p5.Vector.lerp(
    camPos,
    new p5.Vector(width / 2 - ball.position.x, height / 2 - ball.position.y),
    0.04
  );
  
  //camPos = p5.Vector.lerp(camPos, new p5.Vector(width/2 - players[0].position.x, height/2 - players[0].position.y), 0.2);

  pitch();
  ball.display();
  ball.update();

  for (var i in players) {
    players[i].update();
    players[i].display(i);
    // players[i].towardsBall();
  }
  referee.update();
  referee.display("Ref");

  push();
  fill(255);
  textSize(36);
  textAlign(CENTER);
  stroke(0);
  strokeWeight(2);
  text("Red: " + redScore, width / 6, 50);
  text("FPS:" + frameRater, width / 2, -10);
  text("Time: " + floor(millis() / 1000), width / 2, 50);
  text("Blue: " + blueScore, width - width / 6, 50);
  textSize(14);
  pop();
}


var Player = function (x, y, t) {
  this.position = new p5.Vector(x, y);
  this.velocity = new p5.Vector(0, 0);
  this.team = t;
  this.behaviour = "";
  this.target = new p5.Vector(0, 0);
  this.shotCool = 50;
};

Player.prototype.display = function (number) {
  this.shotCool--;
  push();

  strokeWeight(3);
  translate(this.position.x, this.position.y);
  if (this.team == 1) {
    fill(teamColours[this.team - 1]);
  } else if (this.team == 2) {
    fill(teamColours[this.team - 1]);
  } else if(this.team == 3) {
    fill(teamColours[this.team - 1]);
  } 
  //fill(100);
  stroke(20);
  rectMode(CENTER);
  rect(0, 15, 12, 24);

  rotate(this.velocity.heading());
  stroke(20);
  strokeWeight(3);
  //fill(100);
  ellipse(0, 0, 16, 16);
  fill(0, 255, 0);
  ellipse(5, 0, 5, 5);

  pop();
  push();
  textSize(13);
  textAlign(CENTER);
  stroke(255);
  fill(240);
  strokeWeight(0.6);
  text(number, this.position.x, this.position.y + 20);
  pop();
};

Player.prototype.attemptShoot = function () {
  if (p5.Vector.dist(this.position, ball.position) < 70 && this.shotCool < 0) {
    var nv = new p5.Vector(this.position.x, this.position.y);
    if (this.team == 1) {
      var bv = new p5.Vector(width - width / 8, height / 2);
    } else if (this.team == 2) {
      var bv = new p5.Vector(width / 8, height / 2);
    }
    var acc = bv.sub(nv).setMag(random(5, 30));
    ball.velocity.add(acc);
    this.shotCool = 30;

    push();
    fill(255, 0, 255);
    stroke(255, 0, 255);
    strokeWeight(8);
    line(this.position.x, this.position.y, ball.position.x, ball.position.y);
    pop();
  }
};

Player.prototype.resolveCollisions = function () {
  for (var i of players) {
    if (i != this) {
      if (p5.Vector.dist(this.position, i.position) < 20) {
        this.velocity.mult(-1);
        this.position.add(this.velocity);
        var tadd = this.velocity;
        tadd.mult(-0.7);
        i.velocity.add(tadd);
      }
      continue;
    }
    continue;
  }
};

Player.prototype.update = function () {
  if (p5.Vector.dist(this.position, ball.position) < 35 / 2) {
    this.velocity.mult(-1.1);
    this.position.add(this.velocity);
    var tadd = this.velocity;
    tadd.mult(-1.1);
    ball.velocity.add(tadd);
  }

  if (frameCount % behaviourUpdate == 0 || frameCount == 3 && this.team != 3) {
    this.behaviour = behaviours[floor(random(behaviours.length))];

    if (this.behaviour == "Wait") {
      this.target = this.position;
    }
    if (this.behaviour == "Fall Back") {
      if (this.team == 1) {
        this.target = new p5.Vector(random(width / 2), random(height));
      } else if (this.team == 2) {
        this.target = new p5.Vector(random(width / 2, width), random(height));
      }
    }

    if (this.behaviour == "Goalkeep") {
      if (this.team == 1) {
        this.target = new p5.Vector(
          width / 8 + random(-10, 10),
          height / 2 + random(-20, 50)
        );
      } else if (this.team == 2) {
        this.target = new p5.Vector(
          width - width / 8 + random(-10, 10),
          height / 2 + random(-20, 20)
        );
      }
    }
  }
  
  if(this.team == 3) {
    this.behaviour = "Referee";
  }

  if (this.behaviour == "Chase") {
    this.towardsBall();
  } else if (this.behaviour == "Shoot") {
    this.towardsBall();
    this.attemptShoot();
  } else if (this.behaviour == "Fall Back" || this.behaviour == "Goalkeep") {
    this.towardsTarget();
    this.attemptShoot();
    push();
    if(showTargets) {
      noFill();
      stroke(255, 0, 0);
      strokeWeight(4);
      ellipse(this.target.x, this.target.y, 35, 35);
    }
    pop();
    if (
      this.behaviour == "Fall Back" &&
      p5.Vector.dist(this.position, this.target) < 5
    ) {
      if (this.team == 1) {
        this.target = new p5.Vector(random(width / 2), random(height));
      } else if (this.team == 2) {
        this.target = new p5.Vector(random(width / 2, width), random(height));
      }
    }
  }
  else if(this.behaviour == "Referee") {
    this.target = new p5.Vector(ball.position.x, ball.position.y + 140);
    this.towardsTarget();
  }

  this.position.add(this.velocity);
  this.velocity.mult(0.9);

  if (this.position.x < 0) {
    this.position.x = 1;
    this.velocity.x *= -0.9;
  } else if (this.position.y < 0) {
    this.position.y = 1;
    this.velocity.y *= -0.9;
  } else if (this.position.x > width) {
    this.position.x = width - 1;
    this.velocity.x *= -0.9;
  } else if (this.position.y > height) {
    this.position.y = height - 1;
    this.velocity.y *= -0.9;
  }

  this.resolveCollisions();
};

Player.prototype.towardsBall = function () {
  var nv = new p5.Vector(this.position.x, this.position.y);
  var bv = new p5.Vector(ball.position.x, ball.position.y);
  var acc = bv.sub(nv).setMag(0.4);
  this.velocity.add(acc);
};

Player.prototype.towardsTarget = function () {
  var nv = new p5.Vector(this.position.x, this.position.y);
  var bv = new p5.Vector(this.target.x, this.target.y);
  if(this.team != 3) {
    var acc = bv.sub(nv).setMag(0.4);
  }
  else {
    var acc = bv.sub(nv).setMag(1);
  }
  this.velocity.add(acc);
};

var Ball = function () {
  this.position = new p5.Vector(width / 2, height / 2);
  this.velocity = new p5.Vector(0, 0);
};

Ball.prototype.display = function () {
  push();
  strokeWeight(2);
  translate(this.position.x, this.position.y);
  rotate(this.velocity.heading());
  stroke(255);
  fill(255, 255, 0);
  ellipse(0, 0, 25, 25);
  fill(255, 255, 0);
  ellipse(8, 0, 8, 8);
  pop();
};

Ball.prototype.update = function () {
  this.position.add(this.velocity);
  this.velocity.mult(0.9);

  if (
    this.position.x < 30 &&
    this.position.y < height / 2 + height / 6 &&
    this.position.y > height / 2 - height / 6
  ) {
    reset("Blue");
  } else if (
    this.position.x > width - 30 &&
    this.position.y < height / 2 + height / 6 &&
    this.position.y > height / 2 - height / 6
  ) {
    reset("Red");
  }

  if (this.position.x < 0) {
    this.position.x = 1;
    this.velocity.x *= -0.9;
  } else if (this.position.y < 0) {
    this.position.y = 1;
    this.velocity.y *= -0.9;
  } else if (this.position.x > width) {
    this.position.x = width - 1;
    this.velocity.x *= -0.9;
  } else if (this.position.y > height) {
    this.position.y = height - 1;
    this.velocity.y *= -0.9;
  }
};

function reset(team) {
  ball = new Ball();
  console.log("team " + team + " scored a goal!");

  if (team == "Red") {
    redScore++;
  } else if (team == "Blue") {
    blueScore++;
  }
}

function pitch() {
  noFill();
  stroke(255);
  strokeWeight(5);
  line(width / 2, 0, width / 2, height);
  line(width * 0.25, 0, width * 0.25, height);
  line(width * 0.75, 0, width * 0.75, height);
  ellipse(width / 2, height / 2, width / 4, width / 4);
  rect(0, height / 4, width / 8, height / 2);
  rect(0, 0, width, height);
  ellipse(0, height / 2, width / 6, width / 6);
  ellipse(width, height / 2, width / 6, width / 6);
  rect(width - width / 8, height / 4, width / 8, height / 2);

  fill(100);
  rect(-width / 4, -height / 4, width * 1.5, height / 6);
  rect(-width / 4, height + height / 4 - height / 6, width * 1.5, height / 6);
  rect(-width / 4 - width / 6, -height / 4, width / 6, height * 1.5);
  rect(width + width / 4, -height / 4, width / 6, height * 1.5);
}
