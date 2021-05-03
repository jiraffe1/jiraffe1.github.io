var font;
var one;
var two;
var level;
var w = 50;
var light = 2;
var h = 50;
var blockSize = 60; //60
var lev;
var navGrid;
var cam;
var player;
var playerTeam = 0;
var up;
var down;
var left;
var right;
var click;
var movement = 5;
var isRun;
var mainMenu;
var dedMillis = 0;
var stamina = 0;
var m;
var playerDir = 1;
var r = 0;
var g = 0;
var b = 0;
var playerIdle;
var playerRun1;

var three;
var four;
var Knifies;
var knifyCount = 2;
var Axies;
var axyCount = 2;
var ded;
var startMillis = 0;
var dedCounter = 0;
var highScore = 694201337;
var dedMillisHasBeenSet;

function preload() {
  m = false;
  dedMillisHasBeenSet = false;
  //font=loadFont("data/Monospaced.bold-48.vlw");
  three = loadImage("data/Axy1-removebg-preview.png");
  four = loadImage("data/Axy2-removebg-preview.png");
  one = loadImage("data/Knify1-removebg-preview.png");
  two = loadImage("data/Knify2-removebg-preview.png");
  playerIdle = loadImage("data/Player_Idle-removebg-preview.png");
  playerRun1 = loadImage("data/Player_Run1-removebg-preview.png");
  lev = loadStrings("data/new level.txt");
}

function setup() {
 // try {
 //   highScore = getCookie("highscore");
 // }
  //catch {
  //  console.log("cookie could not be loaded");
  //}
  dedMillis = 0;
  dedMillisHasBeenSet = false;
  //textFont(font);
  dedCounter = 0;
  mainMenu = true;
  stamina = 100;
  Knifies = new Array();
  Axies = new Array();
  navGrid = processing2jsNewNDimArray([w, h]);
  r = 255;
  g = 0;
  b = 0;
  for (var i = 0; i < knifyCount; i++) {
    var k = new Knify();
    k.position.x = random(w * blockSize);
    k.position.y = random(h * blockSize);
    Knifies.push(k);
  }
  for (var i = 0; i < axyCount; i++) {
    var k = new Axy();
    k.position.x = random(w * blockSize);
    k.position.y = random(h * blockSize);
    Axies.push(k);
  }
  createCanvas(800, 600);
  level = processing2jsNewNDimArray([w, h]);
  player = new p5.Vector();
  cam = new p5.Vector(0, 0);

  getLevelReady();
  playerTeam = 1;
  setPlayerPos();

  ded = false;
}

function draw() {
  if (!mainMenu) {
    if (m) {
      if (frameCount % 10 == 0) {
        isRun = !isRun;
      }
      if(millis() - startMillis > 10 && (millis() - startMillis) % 100 == 0) {
        var k = new Knify();
        k.position.x = random(w * blockSize);
        k.position.y = random(h * blockSize);
        Knifies.push(k);      
        console.log("new knify");
      }
    } else {
      m = false;
      isRun = false;
    }
    background(10);
    translate(-cam.x, -cam.y);
    display();
    drawPlayer();
    playerMovement();
    for (var P2JSi = 0; P2JSi < Knifies.length; P2JSi++) {
      var k = Knifies[P2JSi];
      k.update();
    }
    for (var P2JSi = 0; P2JSi < Axies.length; P2JSi++) {
      var k = Axies[P2JSi];
      k.update();
    }
    translate(cam.x, cam.y);
    fill(0, 0, 255);
    if (stamina < 10) fill(255, 0, 0);
    rect(0, 0, stamina * 6, 20);
    updateCam();
  }
  if (mainMenu) {
    background(0);
    textSize(60);
    text("Shape Escape", width / 2 - 200, height / 2 - 200);
    textSize(20);
    text("Click to Play", width / 2 - 65, height / 3);
    if (highScore != 694201337) text("High score: " + round(highScore / 1000), width / 2 - 65, height / 1.2);
    if (mouseIsPressed) {
      setup();
      mainMenu = false;
    }
  }
  if (ded) {
    background(255 - dedCounter, 0, 0);
    dedCounter += 2;
    fill(255);
    textSize(25);
    text("a terrible atrocity was committed", 200, height / 2);
    textSize(20);
    text("you survived " + round(dedMillis / 1000) + " seconds", 250, height - 200);
    if (dedMillis / 1000 > highScore / 1000 || highScore == 694201337) {
      highScore = dedMillis;
      document.cookie= ("highscore"+highScore);
    }
    if (dedCounter > 500) {
      setup();
      mainMenu = true;
    }
  }
}

function updateCam() {
  cam = p5.Vector.lerp(cam, new p5.Vector(player.x - width / 2, player.y - height / 2), 0.05);
}

function updateNavGrid() {}

function getLevelReady() {
  var i = lev;
  for (var a = 0; a < 50; a++) {
    var v = i[a];
    //console.log(v);
    for (var b = 0; b < v.length; b++) {
      var val = v.charAt(b);
      var intv;
      intv = 0;
      switch (val) {
        case '0':
          intv = 0;
          break;
        case '1':
          intv = 1;
          break;
        case '2':
          intv = 2;
          break;
        case '3':
          intv = 3;
          break;
        case '4':
          intv = 4;
          break;
        case '5':
          intv = 5;
          break;
        case '6':
          intv = 6;
          break;
        case '7':
          intv = 7;
          break;
        case '8':
          intv = 8;
          break;
        case '9':
          intv = 9;
          break;
      }
      level[a][b] = intv;
    }
  }
}

function display() {
  for (var i = 0; i < w; i++) {
    for (var j = 0; j < h; j++) {
      var val = level[i][j];
      var pos = new p5.Vector(i * blockSize, j * blockSize);
      switch (val) {
        case 0:
          break;
        case 1:
          var d = dist(pos.x, pos.y, player.x, player.y);
          fill(255 - (d / light), 255 - (d / light), 255 - (d / light), 255 - (d / light));
          stroke(0);
          strokeWeight(2);
          rect(pos.x, pos.y, blockSize, blockSize);
          break;
      }
    }
  }
}

function setPlayerPos() {
  switch (playerTeam) {
    case 1:
      player.set(2 * blockSize, 2 * blockSize);
      break;
    case 2:
      player.set((w - 3) * blockSize, (h - 3) * blockSize);
      break;
  }
}
function drawPlayer() {
  imageMode(CENTER);
  if (!isRun) {
    if (playerDir > 0) {
      push();
      image(playerIdle, player.x, player.y + blockSize);
      pop();
    } else {
      push();
      translate(player.x, player.y + blockSize);
      scale(-1.0, 1.0);
      image(playerIdle, 0, 0);
      pop();
    }
  } else {
    if (playerDir > 0) {
      push();
      image(playerRun1, player.x, player.y + blockSize);
      pop();
    } else {
      push();
      translate(player.x, player.y + blockSize);
      scale(-1.0, 1.0);
      image(playerRun1, 0, 0);
      pop();
    }
  }
}

function glevel(x, y) {
  if (x > 0 && x < w && y > 0 && y < h) {
    return level[x][y];
  }
  return 69;
}

function keyPressed() {
  if (true) {
    if (keyCode == UP_ARROW || keyCode == 87) {
      up = true;
    }
    if (keyCode == RIGHT_ARROW || keyCode == 68) {
      right = true;
      playerDir = 1;
    }
    if (keyCode == LEFT_ARROW || keyCode == 65) {
      left = true;
      playerDir = -1;
    }
    if (keyCode == DOWN_ARROW || keyCode == 83) {
      down = true;
    }
  }
}

function keyReleased() {
  if (true) {
    if (keyCode == UP_ARROW || keyCode == 87) {
      up = false;
    }
    if (keyCode == RIGHT_ARROW || keyCode == 68) {
      right = false;
    }
    if (keyCode == LEFT_ARROW || keyCode == 65) {
      left = false;
    }
    if (keyCode == DOWN_ARROW || keyCode == 83) {
      down = false;
    }
  }
}

function getValue(x, y) {
  var gx = floor(x / blockSize);
  var gy = floor(y / blockSize);
  if (abs(gx * blockSize - x) < 15) {
    gx = round(x / blockSize);
  }
  if (abs(gy * blockSize - y) < 15) {
    gy = round(y / blockSize);
  }
  if (gx > -1 && gx < w && gy > -1 && gy < h) {
    return level[gx][gy];
  }
  return 0;
}

function getGridX(x) {
  return floor(x / blockSize);
}

function getGridY(y) {
  return floor(y / blockSize);
}

function playerMovement() {
  var newx;
  var newy;
  if (up) {
    newx = player.x;
    newy = player.y - movement;
    if (playerCanMoveTo(newx, newy) && stamina > 3) {
      player.set(newx, newy);
    }
    m = true;
  }
  if (down) {
    newx = player.x;
    newy = player.y + movement;
    if (playerCanMoveTo(newx, newy) && stamina > 3) {
      player.set(newx, newy);
    }
    m = true;
  }
  if (right) {
    newx = player.x + movement;
    newy = player.y;
    if (playerCanMoveTo(newx, newy) && stamina > 3) {
      player.set(newx, newy);
    }
    m = true;
  }
  if (left) {
    newx = player.x - movement;
    newy = player.y;
    if (playerCanMoveTo(newx, newy) && stamina > 3) {
      player.set(newx, newy);
    }
    m = true;
  }
  if (!left && !right && !up && !down) {
    m = false;
    stamina += 0.5;
    stamina = min(stamina, 100);
  } else {
    stamina -= 0.2;
  }
}

function playerCanMoveTo(x, y) {
  var topl = getValue(x, y);
  var topr = getValue(x + (blockSize * 0.4), y);
  var bottoml = getValue(x, y + (blockSize * 0.75));
  var bottomr = getValue(x + (blockSize * 0.4), y + (0.75 * blockSize));
  var a = topl == 1;
  var b = topr == 1;
  var c = bottoml == 1;
  var d = bottomr == 1;
  var diffX = player.x - x;
  var diffY = player.y - y;
  if (diffX == 5) {
    if (a || c) {
      return false;
    }
  }
  if (diffX == -5) {
    if (b || d) {
      return false;
    }
  }
  if (diffY == 5) {
    if (a || b) {
      return false;
    }
  }
  if (diffY == -5) {
    if (c || d) {
      return false;
    }
  }
  return true;
}

class Axy {
  constructor() {
    this.targetSquareX = 0;
    this.targetSquareY = 0;
    this.currentTSquareX = 0;
    this.currentTSquareY = 0;
    this.currentSquareX = 0;
    this.currentSquareY = 0;
    this.PSquareX = 0;
    this.PSquareY = 0;
    this.PSquareX1 = 0;
    this.PSquareY1 = 0;
    this.vel = 3;
    this.dir = 0;
    this.searchDepth = 180;
    this.len = 0;
    this.lastPosX = new Array();
    this.lastPosY = new Array();
    this.position = new p5.Vector(blockSize * (w - 1), blockSize * (h - 1));
    this.run = false;
  }

  update() {
    var vx = 0;
    var vy = 0;
    if (right) vx = 5000;
    if (left) vx = -5000;
    if (up) vy = -5000;
    if (down) vy = 5000;
    this.targetSquareX = floor(player.x / blockSize) + vx;
    this.targetSquareY = floor(player.y / blockSize) + vy;
    //console.log("vx: " + this.targetSquareX);
    //console.log("vy: " + this.targetSquareY);
    this.PSquareX1 = this.PSquareX;
    this.PSquareY1 = this.PSquareY;
    this.PSquareX = this.currentSquareX;
    this.PSquareY = this.currentSquareY;
    this.currentSquareX = floor(this.position.x / blockSize);
    this.currentSquareY = floor(this.position.y / blockSize);
    this.lastPosX.push(this.currentSquareX);
    this.lastPosY.push(this.currentSquareY);
    this.display();
    this.findTarget();
    this.move();
    if (frameCount % 10 == 0) {
      this.run = !this.run;
    }
  }

  findTarget() {
    var bestPosX = 0;
    var bestPosY = 0;
    var bestDist = 694201337;
    if (this.compareIntVec(floor(player.x / blockSize), floor(player.y / blockSize), this.currentSquareX, this.currentSquareY) && !dedMillisHasBeenSet) {
      //console.log("atrocities were commited");
      ded = true;
      dedMillis = millis() - startMillis;
      dedMillisHasBeenSet = true;
    }
    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        if (i + j != 0) {
          var nx = this.currentSquareX + i;
          var ny = this.currentSquareY + j;
          var ndist = dist(player.x, player.y, this.toSquare(nx), this.toSquare(ny));
          if (glevel(nx, ny) == 0 && !this.isInLast(nx, ny, this.searchDepth)) {
            if (ndist < bestDist) {
              bestPosX = nx;
              bestPosY = ny;
              bestDist = ndist;
            }
          } else {
            continue;
          }
        }
      }
    }
    this.currentTSquareX = bestPosX;
    this.currentTSquareY = bestPosY;
  }

  compareIntVec(x1, y1, x2, y2) {
    return (x1 == x2 && y1 == y2);
  }

  isInLast(x, y, search) {
    this.len = this.lastPosX.length - 1;
    for (var i = 0; i < search; i++) {
      var index = this.len - i;
      if (index > 0) {
        var x1 = this.lastPosX[index];
        var y1 = this.lastPosY[index];
        if (this.compareIntVec(x, y, x1, y1)) {
          return true;
        }
      }
    }
    return false;
  }

  toSquare(grid) {
    return (grid * blockSize) + blockSize / 2;
  }

  move() {
    var newPos = new p5.Vector((this.currentTSquareX * blockSize) + blockSize / 2, (this.currentTSquareY * blockSize) + blockSize / 2);
    this.position = p5.Vector.lerp(this.position, newPos, 0.05);
    if (p5.Vector.dist(this.position, newPos) < 1) {
      this.position = newPos;
    }
  }

  display() {
    imageMode(CENTER);
    if (!this.run) {
      if (this.dir > 0) {
        push();
        image(three, this.position.x, this.position.y);
        pop();
      } else {
        push();
        translate(this.position.x, this.position.y);
        scale(-1.0, 1.0);
        image(three, 0, 0);
        pop();
      }
    } else {
      if (this.dir > 0) {
        push();
        image(four, this.position.x, this.position.y);
        pop();
      } else {
        push();
        translate(this.position.x, this.position.y);
        scale(-1.0, 1.0);
        image(four, 0, 0);
        pop();
      }
    }
  }

}

class Knify {
  constructor() {
    this.targetSquareX = 0;
    this.targetSquareY = 0;
    this.currentTSquareX = 0;
    this.currentTSquareY = 0;
    this.currentSquareX = 0;
    this.currentSquareY = 0;
    this.PSquareX = 0;
    this.PSquareY = 0;
    this.PSquareX1 = 0;
    this.PSquareY1 = 0;
    this.vel = 3;
    this.dir = 0;
    this.searchDepth = 180;
    this.len = 0;
    this.lastPosX = new Array();
    this.lastPosY = new Array();
    this.position = new p5.Vector(blockSize * (w - 1), blockSize * (h - 1));
    this.run = false;
    startMillis = millis();
  }

  update() {
    this.PSquareX1 = this.PSquareX;
    this.PSquareY1 = this.PSquareY;
    this.PSquareX = this.currentSquareX;
    this.PSquareY = this.currentSquareY;
    this.currentSquareX = floor(this.position.x / blockSize);
    this.currentSquareY = floor(this.position.y / blockSize);
    this.lastPosX.push(this.currentSquareX);
    this.lastPosY.push(this.currentSquareY);
    this.display();
    this.targetSquareX = floor(player.x / blockSize);
    this.targetSquareY = floor(player.y / blockSize);
    this.findTarget();
    this.move();
    if (frameCount % 10 == 0) {
      this.run = !this.run;
    }
  }

  findTarget() {
    var bestPosX = 0;
    var bestPosY = 0;
    var bestDist = 694201337;
    if (this.compareIntVec(floor(player.x / blockSize), floor(player.y / blockSize), this.currentSquareX, this.currentSquareY) && !dedMillisHasBeenSet) {
      //console.log("atrocities were commited");
      background(255, 0, 0);
      ded = true;
      dedMillis = millis() - startMillis;
      dedMillisHasBeenSet = true;
    }
    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        if (i + j != 0) {
          var nx = this.currentSquareX + i;
          var ny = this.currentSquareY + j;
          var ndist = dist(player.x, player.y, this.toSquare(nx), this.toSquare(ny));
          if (glevel(nx, ny) == 0 && !this.isInLast(nx, ny, this.searchDepth)) {
            if (ndist < bestDist) {
              bestPosX = nx;
              bestPosY = ny;
              bestDist = ndist;
            }
          } else {
            continue;
          }
        }
      }
    }
    this.currentTSquareX = bestPosX;
    this.currentTSquareY = bestPosY;
  }

  compareIntVec(x1, y1, x2, y2) {
    return (x1 == x2 && y1 == y2);
  }

  isInLast(x, y, search) {
    this.len = this.lastPosX.length - 1;
    for (var i = 0; i < search; i++) {
      var index = this.len - i;
      if (index > 0) {
        var x1 = this.lastPosX[index];
        var y1 = this.lastPosY[index];
        if (this.compareIntVec(x, y, x1, y1)) {
          return true;
        }
      }
    }
    return false;
  }

  toSquare(grid) {
    return (grid * blockSize) + blockSize / 2;
  }

  move() {
    var newPos = new p5.Vector((this.currentTSquareX * blockSize) + blockSize / 2, (this.currentTSquareY * blockSize) + blockSize / 2);
    this.position = p5.Vector.lerp(this.position, newPos, 0.05);
    if (p5.Vector.dist(this.position, newPos) < 2) {
      this.position = newPos;
    }
  }

  display() {
    imageMode(CENTER);
    if (!this.run) {
      if (this.dir > 0) {
        push();
        image(one, this.position.x, this.position.y);
        pop();
      } else {
        push();
        translate(this.position.x, this.position.y);
        scale(-1.0, 1.0);
        image(one, 0, 0);
        pop();
      }
    } else {
      if (this.dir > 0) {
        push();
        image(two, this.position.x, this.position.y);
        pop();
      } else {
        push();
        translate(this.position.x, this.position.y);
        scale(-1.0, 1.0);
        image(two, 0, 0);
        pop();
      }
    }
  }

}


function processing2jsNewNDimArray(dimensions) {
  if (dimensions.length > 0) {
    var dim = dimensions[0];
    var rest = dimensions.slice(1);
    var newArray = new Array();
    for (var i = 0; i < dim; i++) {
      newArray[i] = processing2jsNewNDimArray(rest);
    }
    return newArray;
  } else {
    return undefined;
  }
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}