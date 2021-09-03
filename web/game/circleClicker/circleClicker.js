var balls = [];
var clouds = [];
var BallWait = 200;
var score = 0;
var lives = 3;
var highScore = 0;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(30, 150, 255);

  for (var b in balls) {
    if (balls[b].y > height - 70) {
      balls[b].deleteMe(b);
      lives--;
    } else {
      balls[b].display();
      balls[b].y += 3;
    }
  }

  for (var c in clouds) {
    if (clouds[c].x > width + 100) {
      clouds[c].deleteMe(c);
    } else {
      clouds[c].x += clouds[c].speed;
      clouds[c].display();
    }
  }

  if (frameCount % BallWait == 0) {
    BallWait -= 2;
    balls.push(new ball(random(60, width - 60)));
  }

  if (frameCount % 50 == 0) {
    clouds.push(new cloud(random(60, height - 60)));
  }

  push();
  stroke(255, 0, 0);
  strokeWeight(6);
  line(0, height - 70, width, height - 70);
  pop();

  push();
  stroke(0);
  fill(255);
  strokeWeight(2);
  textSize(36);
  text("Score: " + score + "\nLives: " + lives + "\nHigh Score: " + highScore, 20, 30);
  pop();

  if (lives <= 0) {
    push();
    fill(255, 0, 0);
    strokeWeight(2);
    stroke(0);
    ellipse(width / 2, height / 2, width/4, width/4);
    pop();
    push();
    stroke(0);
    fill(255);
    strokeWeight(2);
    textSize(36);
    textAlign(CENTER);
    text("Start again", width/2, height/2);
    pop();
    
    if(score > highScore) {
      highScore = score;
    }
  }
}

function mouseClicked() {
  for (var b in balls) {
    if (dist(mouseX, mouseY, balls[b].x, balls[b].y) < 32) {
      balls[b].deleteMe(b);
      score++;
    }
  }
  
  if(lives <= 0) {
    if(dist(mouseX, mouseY, width/2, height/2) < width / 4 + 40) {
      score = 0;
      lives = 3;
      BallWait = 200;
      balls = [];
      
    }
  }
}

class ball {
  constructor(x) {
    this.x = x;
    this.y = 0;
  }

  display() {
    push();
    fill(10, 200, 20);
    stroke(0);
    strokeWeight(3);
    ellipse(this.x, this.y, 50, 50);
    pop();
  }

  deleteMe(i) {
    balls.splice(i, 1);
  }
}

class cloud {
  constructor(y) {
    this.x = -60;
    this.y = y;
    this.w = random(100, 190);
    this.h = random(40, 60);
    this.speed = random(0.5, 3);
  }

  display() {
    push();
    noStroke();
    fill(255, 255, 255, 100);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }

  deleteMe(i) {
    clouds.splice(i, 1);
  }
}
