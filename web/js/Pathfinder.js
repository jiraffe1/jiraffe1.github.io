

var Settings = {
  NavRefresh:
3, //How often the Nav grid refreshes ( higher = less lag )
  MaxParticles:
10, //max number of particles ( more = more lag )
  showDebug:
false, //if the debug is shown
	autoAllocateTarget:
	false,//ill probably add this later
  }

var Pset = {
  Speed:
0.2, //Particles speed up: 0.2
  MaxVelocity:
4, //how fast the particle can go: 4
  ReturnVelocity:
0.2, //how much velocity is returned when it bounces off wall: 0.2
  LoseVelocity:
1.035//how fast the particle slows down: 1.035
  }

var walkers=[];
var Movestor=[];
var grid = [
  "xxxxxxxxxxxxxxxxxxxx", 
  "x_x________________x", 
  "x_x_______xxxxxxx__x", 
  "x_x_xxxxxxx______x_x", 
  "x_x_x_____x__xx__x_x", 
  "x_x_x_____x___xx___x", 
  "x___x_xxx__x__xx___x", 
  "xxxx__xxxx____xxxxxx", 
  "x_____xxxxxxxx_____x", 
  "x__xxxxx___________x", 
  "x___________xxxxxx_x", 
  "xxxxxxxxxxxx_______x", 
  "x________xxx__xxxxxx", 
  "x_________xx_______x", 
  "xxxxxxxx____xxxxx__x", 
  "xxxx___xx___xx_____x", 
  "x___________xx__xxxx", 
  "x__xxxxxxxxxx______x", 
  "x__________________x", 
  "xxxxxxxxxxxxxxxxxxxx", 
  ]
  var navGrid = [
  "____________________", 
  "____________________", 
  "____________________", 
  "____________________", 
  "____________________", 
  "____________________", 
  "____________________", 
  "____________________", 
  "____________________", 
  "____________________", 
  "____________________", 
  "____________________", 
  "____________________", 
  "____________________", 
  "____________________", 
  "____________________", 
  "____________________", 
  "____________________", 
  "____________________", 
  "____________________", 
  ]

  String.prototype.replaceAt=function(index, replacement) {
  return this.substr(0, index)+replacement+this.substr(index+replacement.length);
}

var mover = function(position) {
  this.pos = position;
  this.XV = 0;
  this.YV = 0;
  this.AX = 0;
  this.AY = 0;
	this.r = random(255);
	this.g = random(255);
	this.b = random(255);
}
mover.prototype.show = function() {
  //fill(72, 184, 232, 250/(abs(this.XV)+abs(this.YV)) );
  fill(this.r, this.g, this.b, 250);

  let nV = createVector(this.XV, this.YV);
  let delta = nV.heading();
  push();
  translate(this.pos.x, this.pos.y);
  rotate(delta);
  rect(0, 0, 15, 7);
  fill(this.r, this.g, this.b, 250/(abs(this.XV)+abs(this.YV)) );
  ellipse(0, 0, 7, 7);
  pop();
}

mover.prototype.run = function() {
  fill(0, 9, 255, 250 );
  this.stunned--;
  this.stunned = max(this.stunned, 0);
  //ellipse(this.pos.x,this.pos.y,25,25);
  if (walkers.length===0) {
    if (navGrid[this.AY][this.AX]==="d") {
      this.YV+=Pset.Speed;
    } else
      if (navGrid[this.AY][this.AX]==="u") {
        this.YV-=Pset.Speed;
      } else
        if (navGrid[this.AY][this.AX]==="r") {
          this.XV+=Pset.Speed;
        } else
          if (navGrid[this.AY][this.AX]==="l") {
            this.XV-=Pset.Speed;
          }
    this.pos.x+=this.XV;
    this.AX=floor(this.pos.x/20);
    this.AY=floor(this.pos.y/20);
    if (navGrid[this.AY][this.AX]==="_") {

      if (this.XV>0) {
        this.XV*=-(Pset.ReturnVelocity+random(0.1, 0.3));
        this.pos.x=(this.AX*20)-1;
      } else
        if (this.XV<0) {
          this.XV*=-(Pset.ReturnVelocity+random(0.1, 0.3));
          this.pos.x=(this.AX*20)+21;
        }
    }
    this.pos.y+=this.YV;
    this.AX=floor(this.pos.x/20);
    this.AY=floor(this.pos.y/20);
    if (navGrid[this.AY][this.AX]==="_") {      
      if (this.YV>0) {
        this.YV*=-(Pset.ReturnVelocity+random(0.1, 0.3));
        this.pos.y=(this.AY*20)-1;
      } else
        if (this.YV<0) {
          this.YV*=-(Pset.ReturnVelocity+random(0.1, 0.3));
          this.pos.y=(this.AY*20)+21;
        }
    }
    this.XV/=Pset.LoseVelocity;
    this.YV/=Pset.LoseVelocity;
    this.XV=constrain(this.XV, -Pset.MaxVelocity, Pset.MaxVelocity);
    this.YV=constrain(this.YV, -Pset.MaxVelocity, Pset.MaxVelocity);
  }
}

var checkGrid = function(x, y) {
  if ((grid[y][x]==="x")||(navGrid[y][x]!=="_")) {
    return false;
  } else {
    return true;
  }
}

var walker = function(x, y, s, px, py) {
  this.x=x;
  this.y=y;
  this.done=false;
}

walker.prototype.run = function() {
  this.done=true;
  if (checkGrid(this.x+1, this.y)) {
    navGrid[this.y]=navGrid[this.y].replaceAt(this.x+1, "l");//r
    walkers.push(
      new walker(this.x+1, this.y));
  }
  if (checkGrid(this.x-1, this.y)) {
    navGrid[this.y]=navGrid[this.y].replaceAt(this.x-1, "r");//l
    walkers.push(
      new walker(this.x-1, this.y));
  }
  if (checkGrid(this.x, this.y+1)) {
    navGrid[this.y+1]=navGrid[this.y+1].replaceAt(this.x, "u");//d
    walkers.push(
      new walker(this.x, this.y+1));
  }
  if (checkGrid(this.x, this.y-1)) {
    navGrid[this.y-1]=navGrid[this.y-1].replaceAt(this.x, "d");//u
    walkers.push(
      new walker(this.x, this.y-1));
  }
}

draw = function() {
  background(255, 100);
  if (walkers.length!==0) {
    for (var j=0; j<100; j++) {    
      for (var i=walkers.length-1; i>=0; i--) {
        var w=walkers[i];
        if (!w.done) {
          w.run();
        } else {
          walkers.splice(i, 1);
          if (walkers.length===0) {
            frameRate(60);
          }
        }
      }
    }
  }
  //if(frameCount%2===0){

  fill(20);  
  Movestor.length=constrain(Movestor.length, 0, Settings.MaxParticles);
  for (var y=0; y<20; y++) {
    for (var x=0; x<20; x++) {
      if (grid[y][x]==="x") {
        rect(20/2+(20*x), 20/2+(20*y), 20, 20);
      }
      if (Settings.showDebug) {
        if (navGrid[y][x]==="u") {
          text("↑", 20/2+(20*x), 20/2+(20*y));
        }
        if (navGrid[y][x]==="d") {
          text("↓", 20/2+(20*x), 20/2+(20*y));
        }
        if (navGrid[y][x]==="l") {
          text("←", 20/2+(20*x), 20/2+(20*y));
        }
        if (navGrid[y][x]==="r") {
          text("→", 20/2+(20*x), 20/2+(20*y));
        }
        if (navGrid[y][x]==="X") {
          text("X", 20/2+(20*x), 20/2+(20*y));
        }
      }
    }
  }
	  for (var i=Movestor.length-1; i>=0; i-=1) {
    var p=Movestor[i];
    p.run();
  }
  //}else{
  //for (var i=Movestor.length-2;i>=0;i-=2){
  //    var p=Movestor[i];
  //    p.run();
  //}
  //}
  for (var i=Movestor.length-1; i>=0; i--) {
    var p=Movestor[i];
    p.show();
  }
	if(Settings.autoAllocateTarget) {
		
	}
}

function keyPressed() {
  for (var y=0; y<20; y++) {
    for (var x=0; x<20; x++) {
      if (grid[y][x]==="_"&&navGrid[y][x]!=="_") {
        Movestor.unshift(new mover(createVector(random((20*x), (20*x)+20), random((20*y), (20*y)+20))));
      }
    }
  }
}

function mouseMoved() { 
  if ((mouseX>20&&mouseX<379&&mouseY>20&&mouseY<379)&&
    frameCount%Settings.NavRefresh ===1&&
    grid[floor(mouseY/20)][floor(mouseX/20)]==="_")
  {  
    frameRate(max);
    walkers=[];
    navGrid = [
      "____________________", 
      "____________________", 
      "____________________", 
      "____________________", 
      "____________________", 
      "____________________", 
      "____________________", 
      "____________________", 
      "____________________", 
      "____________________", 
      "____________________", 
      "____________________", 
      "____________________", 
      "____________________", 
      "____________________", 
      "____________________", 
      "____________________", 
      "____________________", 
      "____________________", 
      "____________________", 
    ];
    navGrid[floor(mouseY/20)]=navGrid[floor(mouseY/20)].replaceAt(floor(mouseX/20), "X");
    walkers.push(new walker(floor(mouseX/20), floor(mouseY/20), 0));
  }
}

function mouseClicked() {
  if (mouseX>20&&mouseX<379&&mouseY>20&&mouseY<379) {    
    if (grid[floor(mouseY/20)][floor(mouseX/20)]==="x") {
      grid[floor(mouseY/20)]=grid[floor(mouseY/20)].replaceAt(floor(mouseX/20), "_");
    } else
      if (grid[floor(mouseY/20)][floor(mouseX/20)]==="_") {
        grid[floor(mouseY/20)]=grid[floor(mouseY/20)].replaceAt(floor(mouseX/20), "x");
      }
  }
}

function setup() {
  createCanvas(400, 400);

  createA("https://jiraffe1.github.io/web/game.html", "back");
  createP("click to place and remove blocks");
  createP("press any key to mak more cars");
  createP("they follow your mouse");
  
    noStroke();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(20);
}