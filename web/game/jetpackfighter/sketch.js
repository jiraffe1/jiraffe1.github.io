var player;
var buttons;
var state;
var nameBox;
var name = "";
var id;
var debugBox;
var frameCounterBox;
//var postProcessingBox;
var showNametag = true;
var showNameTagBox;
var showCrosshair = true;
//var showCrosshairBox;
//var postProcessingEnabled = false;
var frameRaterUpdate = 15;
var showFrames = true;
var frameRater;
var debug = false;
var shoot = false;
var sf = 0;
var qualityDOM;
var quality = 3;
var qualitySpan;
var bannerIMG;
var deadFrames = 10000;
var kills = 0;
var deaths = 0;
var kdr;
var shotLines= [];

var socket;
var otherPlayers = [];

function preload() {
	bannerIMG = loadImage("BANNER.png");
}

function setup() {
    socket = io.connect("https://aboard-amphibian.glitch.me/");
  createCanvas(1000, 800);
  player = new pl(width / 2, height / 2);
	id = floor(random(100000));
	name = prompt("enter name");
  buttons = [];
  noCursor();
  initStart();
	socket.emit('newClient');
	socket.on('connect', connected)
	socket.on('clientUpdate', updateRecieved);
	socket.on('shot', recieveShot);
	socket.on('hit', recieveHit);
	socket.on('kill', recieveKill);
}

function draw() {
	kdr = kills/deaths;
	
  if (quality > 4) {
    background(220,220,220, 150);
  } else {
    background(220, 220, 220);
  }

  if (quality > 3) {
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = 'red';
  } else {
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = 'black';
  }


  if (state == "Start") {
    //push();
    //textAlign(CENTER);
    //textSize(72);
    //text("JETPACK FIGHTERS", width / 2, height / 4);
    //pop();

		push();
		imageMode(CENTER);
		image(bannerIMG, width/2, height/7);
		pop();
    if (isPressedButton("Play", buttons)) {
      initPlay();
    }
    if (isPressedButton("Options", buttons)) {
      initOptions();
    }
		if(isPressedButton("Controls", buttons)) {
			initControls();
		}
  }

  if (state == "Options") {
    push();
    textAlign(CENTER);
    textSize(48);
    text("OPTIONS", width / 2, height / 4);
    pop();

    if (isPressedButton("Back", buttons)) {
      initStart();
    }
  }

  if (state == "Play") {
    player.update();
		sendServer();
		for(var inc = 0; inc < otherPlayers.length; inc++) {
			if(otherPlayers[inc].id !== 999999) {
				otherPlayers[inc].display();
			}
		}
		
		
    //leaderboard
    if (keyIsDown(SHIFT)) {
      push();
      rectMode(CENTER);
      stroke(0, 0, 0);
      fill(100, 100, 100, 100)
      rect(width / 2, height / 2, width / 1.2, height / 1.5);
      pop();
			push();
			fill(255, 255, 255);
			stroke(0, 0, 0);
			textSize(50);
			textAlign(CENTER);
			text("Feature coming soon", width/2, height/2);
			pop();
    }
  }
	if(state == "Controls") {
    if(isPressedButton("Back", buttons)) {
      initStart();
    }
		push();
		textAlign(CENTER);
		text("Shoot - Mouse", width/2, height/4);
		text("Movement - WASD or ARROW KEYS", width/2, height/4 + 40);
		text("Show leaderboard - SHIFT [COMING SOON]", width/2, height/4 + 80);
		text("Back to main menu - P", width/2, height/4 + 120);
		//text("Open chat - SHIFT [COMING SOON]", width/2, height/4 + 160);
		pop();
  }

  for (var b in buttons) {
    buttons[b].update();
  }

  if (frameCounterBox != undefined) {
    showFrames = frameCounterBox.checked();
  }

  //if (postProcessingBox != undefined) {
  //  postProcessingEnabled = postProcessingBox.checked();
  //}

  //if(showCrosshairBox != undefined) {
  //  showCrosshair = showCrosshairBox.checked();
  //}

  if (nameBox != undefined) {
    name = nameBox.value();
  }

  if (frameCount % frameRaterUpdate == 0) {
    frameRater = frameRate();
  }

  if (showFrames) {
    text(floor(frameRater), 20, 20);
  }
	if(debug) {
		text("id: " +id, 20, 80);
	}
	
	text("kills: " + kills, 20, 110);
	text("deaths: " + deaths, 20, 130);
	text("rating: " + kdr, 20, 150);
	text("players online: " + getPlayersOnline(), 20, 50);
  if (frameRater < 30) {
    text("Bad framerate detected! You might want to turn down those graphics settings in options", 40, 20);
  }

  if (debugBox != undefined) {
    debug = debugBox.checked();
  }

  if (showNameTagBox != undefined) {
    showNametag = showNameTagBox.checked();
  }

  if (qualityDOM != undefined) {
    if (qualityDOM.value() == "Fastest") {
      quality = 1;
    } else if (qualityDOM.value() == "Simple") {
      quality = 2;
    } else if (qualityDOM.value() == "Good") {
      quality = 3;
    } else if (qualityDOM.value() == "Very Good") {
      quality = 4;
    } else if (qualityDOM.value() == "Beautiful") {
      quality = 5;
    }
  }

  if (keyIsDown(80)) {
		initStart();
  }

  //if(showCrosshair) {
  push();
  rectMode(CENTER);
  fill(0, 0, 0);
  noStroke();
  rect(mouseX, mouseY + 4, 1, 5);
  rect(mouseX, mouseY - 4, 1, 5);
  rect(mouseX + 4, mouseY, 5, 1);
  rect(mouseX - 4, mouseY, 5, 1);
  pop();
  //}		
	runAllShotlines();
	checkIfDead();
}

function qualityChanged() {
  if (qualityDOM.value() == "Fastest") {
    quality = 1;
  } else if (qualityDOM.value() == "Simple") {
    quality = 2;
  } else if (qualityDOM.value() == "Good") {
    quality = 3;
  } else if (qualityDOM.value() == "Very Good") {
    quality = 4;
  } else if (qualityDOM.value() == "Beautiful") {
    quality = 5;
  }
}

function mousePressed() {
  shoot = true;
	
	testCollision();
}

function initStart() {
  clearButtons();
  state = "Start";

  nameBox = createInput(name);
  nameBox.position(width / 2 - 75, height / 3 - 20);
  nameBox.input(nameBoxUpdate);
  buttons.push(new btn(width / 2, height / 3 + 60, 120, 60, "Play"));
  buttons.push(new btn(width / 2, height / 3 + 140, 120, 60, "Options"));
	buttons.push(new btn(width / 2, height / 3 + 220, 120, 60, "Controls"));
}

function nameBoxUpdate() {
  //console.log("Name box says: " + nameBox.value());
}

function initOptions() {
  clearButtons();
  state = "Options";
  buttons.push(new btn(width / 2, height * 0.9, 120, 60, "Back"));
  debugBox = createCheckbox("Debug", true);
  debugBox.position(width / 2, height / 2 - 60);
  frameCounterBox = createCheckbox("Framerate Counter", true);
  frameCounterBox.position(width / 2, height / 2 - 30);
  //postProcessingBox = createCheckbox("Post Processing", false);
  //postProcessingBox.position(width / 2, height / 2);
  showNameTagBox = createCheckbox("Show Nametag", false);
  showNameTagBox.position(width / 2, height / 2);
  qualitySpan = createSpan("Quality Settings:");
  qualitySpan.position(width / 2, height / 2 + 30);
  qualityDOM = createSelect();
  qualityDOM.position(width / 2, height / 2 + 60);

  qualityDOM.option("Beautiful");

  qualityDOM.option("Very Good");
  qualityDOM.option("Good");
  qualityDOM.option("Simple");

  qualityDOM.option("Fastest");

  qualityDOM.changed(qualityChanged);
	//document.getElementById("qualityDOM").value = '3'

  //showCrosshairBox = createCheckbox("Show Crosshair", true);
  //showCrosshairBox.position(width/2, height/2+60);
}

function initControls() {
  clearButtons();
  state = "Controls";
  buttons.push(new btn(width / 2, height * 0.9, 120, 60, "Back"));
}

function initPlay() {
  clearButtons();
  state = "Play";
}

function isPressedButton(name, array) {
  for (var btn in array) {
    var c = array[btn];
    if (c.t === name) {
      if (c.hover) {
        if (mouseIsPressed) {
          return true;
        }
      }
    }
  }
}

function clearButtons() {
  buttons = [];
  removeElements();
}

var btn = function(x, y, w, h, t) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.t = t;
  this.hover = false;
}

btn.prototype.update = function() {
  push();

  if (mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2 && mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2) {
    this.hover = true;
  } else {
    this.hover = false;
  }

  if (!this.hover) {
    fill(100, 100, 100);
  } else {
    fill(255, 0, 0);
  }

  stroke(0, 0, 0);
  rectMode(CENTER);
  rect(this.x, this.y, this.w, this.h);
  textAlign(CENTER);
  textSize(this.h / 2.5);
  fill(255, 255, 255);
  text(this.t, this.x, this.y);
  pop();
}

var pl = function(x, y) {
  this.x = x;
  this.y = y;
  this.xv = 0;
  this.yv = 0;
  this.mv = 12;
  this.w = 13;
  this.h = 26;
  this.isFlipped = 1;
	this.hp = 100;
  this.acc = 0.5;
}

pl.prototype.update = function() {

  if (this.xv > this.mv) {
    this.xv = this.mv;
  }
  if (this.xv < -this.mv) {
    this.xv = -this.mv;
  }
  if (this.yv > this.mv) {
    this.yv = this.mv;
  }
  if (this.yv < -this.mv) {
    this.yv = -this.mv;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    this.xv += this.acc;
    this.isFlipped = 1;
  }
  if (keyIsDown(LEFT_ARROW)) {
    this.xv -= this.acc;
    this.isFlipped = -1;
  }
  if (keyIsDown(UP_ARROW)) {
    this.yv -= this.acc;
  }
  if (keyIsDown(DOWN_ARROW)) {
    this.yv += this.acc;
  }
  if (keyIsDown(68)) {
    this.xv += this.acc;
    this.isFlipped = 1;
  }
  if (keyIsDown(65)) {
    this.xv -= this.acc;
    this.isFlipped = -1;
  }
  if (keyIsDown(87)) {
    this.yv -= this.acc;
  }
  if (keyIsDown(83)) {
    this.yv += this.acc;
  }
	if(quality !== 1) {
		if (quality > 1) {
			push();
			fill(255, 100 + random(0, 50), 0);
			noStroke();
			ellipse(this.x + random(-2, 2) - (this.w / 3 * this.isFlipped), this.y + random(-2, 2) + this.h / 3, this.w, this.w);
			pop();
		}

		push();
		rectMode(CENTER);
		textAlign(CENTER);
		fill(100, 100, 100);
		rect(this.x, this.y, this.w / 2, this.h / 2);
		rect(this.x - (this.w / 3 * this.isFlipped), this.y, this.w / 3, this.h / 2);
		rect(this.x + (this.w / 3 * this.isFlipped), this.y + this.h / 3, this.w / 3, this.h / 2);
		rect(this.x - (this.w / 8 * this.isFlipped), this.y + this.h / 2, this.w / 3, this.h / 2);
		rect(this.x + (this.w / 12 * this.isFlipped), this.y - this.h / 3, this.w / 2, this.h / 4);
		fill(0, 0, 0);
		stroke(0, 0, 0);

		point(this.x, this.y);
		strokeWeight(0.2);



		if (shoot || sf > 0) {
			fill(255, 255, 0);
			stroke(255, 255, 0);
			strokeWeight(5);
			line(this.x, this.y - this.w / 6, mouseX, mouseY);
			shoot = false;
			sf++;
		}

		if (sf > 1) {
			shoot = false;
			sf = 0;
		}
		pop();

		push();

		var posEndA = createVector(this.x - mouseX, this.y - mouseY);
		posEndA.normalize();
		posEndA.mult(-12);
		stroke(0, 0, 0);
		strokeWeight(3);
		line(this.x, this.y - this.w / 6, this.x + posEndA.x, this.y + posEndA.y);

		pop();
		push();

		var posEndB = createVector(this.x - mouseX, this.y - mouseY);
		posEndB.normalize();
		posEndB.rotate(radians(90));
		posEndB.mult(-6);

		stroke(0, 0, 0);
		strokeWeight(5);
		line(this.x, this.y - this.w / 6, this.x + posEndB.x, this.y + posEndB.y);

		pop();


		push();
		rectMode(CENTER);
		fill(0, 0, 0);
		noStroke();
		rect(mouseX, mouseY + 4, 1, 5);
		rect(mouseX, mouseY - 4, 1, 5);
		rect(mouseX + 4, mouseY, 5, 1);
		rect(mouseX - 4, mouseY, 5, 1);
		pop();
	}
	else {
		push();
		rectMode(CENTER);
		fill(100, 100, 100);
		rect(this.x, this.y, this.w, this.h);
		pop();
		push();
		if (shoot || sf > 0) {
			fill(255, 255, 0);
			stroke(255, 255, 0);
			strokeWeight(5);
			line(this.x, this.y - this.w / 6, mouseX, mouseY);
			shoot = false;
			sf++;
		}

		if (sf > 1) {
			shoot = false;
			sf = 0;
		}
		pop();
	}
	
	if (showNametag || debug) {
		push();
		textAlign(CENTER);
		text(name, this.x, this.y - this.h / 1.2);
		pop();
	}
	
	this.x += this.xv;
	this.y += this.yv;
	this.xv *= 0.95;
	this.yv *= 0.95;
	if (this.x + this.xv > width || this.x + this.xv < 0) {
		this.xv *= -1.5;
	}
	if (this.y + this.yv > height || this.y + this.yv < 0) {
		this.yv *= -1.5;
	}
}

function sendServer() {
	var updateOBJ = {
		'px' : player.x,
		'py' : player.y,
		'mx' : mouseX,
		'my' : mouseY,
		'iF' : player.isFlipped,
		'id' : id,
		'name' : name,
		'shoot' : shoot,
		'hp' : player.hp,
	}
	socket.emit('clientUpdate', updateOBJ);
}

function updateRecieved(obj) {
	var isFound = false;
	
	for(var c in otherPlayers) {
		var p = otherPlayers[c];
		
		if(p.id === obj.id) {
			p.px = obj.px;
			p.py = obj.py;
			p.mx = obj.mx;
			p.my = obj.my;
			p.isFlipped = obj.iF;
			p.shoot = obj.shoot;
			p.ls = 0;
			isFound = true;
			p.hp = obj.hp;
		}
	}
	
	if(!isFound) {
		otherPlayers.push(new netClient(obj.px, obj.py, obj.mx, obj.my, obj.iF, obj.id, obj.name));
	}
}

function connected() {
	console.log("connected to the server");
}

var netClient = function(px, py, mx, my, iF, id, name) {
	this.px = px;
	this.py = py;
	this.mx = mx;
	this.my = my;
	this.isFlipped = iF;
	this.id = id;
	this.name = name;
	this.w = player.w;
	this.h = player.h;
	this.shoot = false;
	this.ls = 0;
	this.hp = 100;
}

netClient.prototype.display = function() {
	this.ls++;
	
	if(this.ls > 30) {
		this.id = 999999;
	}
	
	if(quality !== 1) {
		if (quality > 1) {
			push();
			fill(255, 100 + random(0, 50), 0);
			noStroke();
			ellipse(this.px + random(-2, 2) - (this.w / 3 * this.isFlipped), this.py + random(-2, 2) + this.h / 3, this.w, this.w);
			pop();
		}

		push();
		rectMode(CENTER);
		textAlign(CENTER);
		fill(100, 100, 100);
		rect(this.px, this.py, this.w / 2, this.h / 2);
		rect(this.px - (this.w / 3 * this.isFlipped), this.py, this.w / 3, this.h / 2);
		rect(this.px + (this.w / 3 * this.isFlipped), this.py + this.h / 3, this.w / 3, this.h / 2);
		rect(this.px - (this.w / 8 * this.isFlipped), this.py + this.h / 2, this.w / 3, this.h / 2);
		rect(this.px + (this.w / 12 * this.isFlipped), this.py - this.h / 3, this.w / 2, this.h / 4);
		fill(0, 0, 0);
		stroke(0, 0, 0);

		point(this.px, this.py);
		strokeWeight(0.2);

		if (this.shoot) {
			fill(255, 255, 0);
			stroke(255, 255, 0);
			strokeWeight(5);
			line(this.px, this.py - this.w / 6, this.mx, this.my);
		}
		pop();

		push();

		var posEndA = createVector(this.px - this.mx, this.py - this.my);
		posEndA.normalize();
		posEndA.mult(-12);
		stroke(0, 0, 0);
		strokeWeight(3);
		line(this.px, this.py - this.w / 6, this.px + posEndA.x, this.py + posEndA.y);

		pop();
		push();

		var posEndB = createVector(this.px - this.my, this.py - this.my);
		posEndB.normalize();
		posEndB.rotate(radians(90));
		posEndB.mult(-6);

		stroke(0, 0, 0);
		strokeWeight(5);
		line(this.px, this.py - this.w / 6, this.px + posEndB.x, this.py + posEndB.y);

		pop();
	}
	else {
		push();
		rectMode(CENTER);
		fill(100, 100, 100);
		rect(this.px, this.py, this.w, this.h);
		pop();
		push();
		if (this.shoot) {
			fill(255, 255, 0);
			stroke(255, 255, 0);
			strokeWeight(5);
			line(this.px, this.py - this.w / 6, this.mx, this.my);
		}
		pop();
	}	
	if(debug) {
		push();
		textAlign(CENTER);
		text("id: " + this.id, this.px, this.py - this.h/1.2 - 40);
		text("last recieved ping: " + this.ls, this.px, this.py - this.h/1.2 -60);

		pop();
	}
	if (showNametag || debug) {
		push();
		textAlign(CENTER);
		text(this.name, this.px, this.py - this.h / 1.2);

		pop();
	}
	
	push();
	noStroke();
	rectMode(CENTER);
	fill(255, 255, 255);
	rect(this.px, this.py - this.h/1.2 - 20, 100, 10);
	fill(255, 0, 0);
	rect(this.px, this.py - this.h/1.2 - 20, this.hp, 10);
	textAlign(CENTER);
	fill(255, 255, 255);
	strokeWeight(1);
	text(this.hp, this.px, this.py - this.h/1.2 - 15);
	pop();
}

function getPlayersOnline() {
	var ret = 0;
	
	for(var i in otherPlayers) {
		if(otherPlayers[i].id != 999999) {
			ret++;
		}
	}
	
	return ret;
}

function testCollision() {
	var shot = {
		'px' : player.x,
		'py' : player.y,
		'mx' : mouseX,
		'my' : mouseY,
		'id' : id,
	}
	
	socket.emit('shot', shot);
	
	for(var tgt in otherPlayers) {
		if(otherPlayers[tgt].id !== 999999) {
			if(dist(otherPlayers[tgt].px, otherPlayers[tgt].py, mouseX, mouseY) < otherPlayers[tgt].h) {
				registerHit(floor(random(20)), otherPlayers[tgt].id, id);
			}
		}
	}
}

function registerHit(dmg, ida, idb) {
	var hit = {
		'dmg' : dmg,
		'id' : ida,
		'myid' : idb,
//		'myid' : id,
	}
	
	socket.emit('hit', hit);
}

function recieveShot(obj) {

	shotLines.push(new shotLine(obj.px, obj.py, obj.mx, obj.my));
}

function recieveHit(obj) {
	if(id === obj.id) {
		player.hp -= obj.dmg;
	}
	if(player.hp <= 0) {
		broadcastKill(obj.id, obj.myid);
	}
}

var shotLine = function(x1, y1, x2, y2) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.id = 2;
}

shotLine.prototype.display = function() {
	push();
	fill(255, 255, 0);
	stroke(255, 255, 0);
	strokeWeight(5);
	line(this.x1, this.y1 - player.w / 6, this.x2, this.y2);
	pop();
	this.id = 999999;
}

function runAllShotlines() {
	for(var l in shotLines) {
		if(shotLines[l].id !== 999999 && state == "Play") {
			shotLines[l].display();
		}
	}
}

function checkIfDead() {
	if(player.hp <= 0) {
		initStart();
		deadFrames = 0;
		this.deaths++;
		player.hp = 100;
	}
	
	if(deadFrames < 150) {
		push();
		textAlign(CENTER);
		rectMode(CENTER);
		fill(0);
		stroke(0);
		rect(width/2, height/2, width, height/2);
		textSize(150);
		fill(255, 0, 0);
		stroke(255, 0, 0);
		text("You dead", width/2, height/2);
		pop();
		player.hp = 100;
	}
	
	deadFrames++;
	
	if(state == "Play") {
		var tx = width*(player.hp/100);
		push();
		fill(255, 0, 0);
		rect(0, height-20, tx, 20);
		pop();
		push();
		fill(255, 255, 255);
		stroke(0, 0, 0);
		textAlign(CENTER);
		text(player.hp, tx/2, height-5);
		pop();
	}
}

function broadcastKill(killed, killer) {
	var bOBJ = {
		'killed' : killed,
		'killer' : killer,
	}
	
	socket.emit('kill', bOBJ);
}

function recieveKill(OBJ) {
//	console.log("ooh, somebody just got PWND");
//	console.log("wait did i do that?");
//	console.log("my id: " + id);
//	console.log("the killer's id: " + OBJ.killer);

	if(id == OBJ.killer) {
		//console.log("oh no it was me");
		kills++;
	}
}