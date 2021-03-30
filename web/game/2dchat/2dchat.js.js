var socket; 
var img = 0;
var px;
var py;
var name;
var room = 0;
var id;
var saystr = "null";
var sayFrames = 0;
var saybtn;
var others = [];
var debug = false;
var createRoom;
var joinRoom;
var birrd;
var axy;
var knify;
var playery;
var aplane;
var dude;
var tower;
var nextImg;
var maxImg = 7;
var showStat;

function preload() {
	birrd = loadImage("birrd.png");
	axy = loadImage("Axy1.png");
	knify = loadImage("Knify1.png");
	playery = loadImage("Player_Idle.png");
	aplane = loadImage("plane.jpg");
	dude = loadImage("dude.png");
	tower = loadImage("rowr.png");
}

function setup() {
  createA("https://jiraffe1.github.io/web/game.html", "back");
  socket = io.connect(":30000?sketch=1098544");
  name = prompt("enter name");
  createCanvas(400, 400);
  socket.on('connect', connected)
  socket.on('update', updatePlayer);
	id = floor(random(600000));
	createRoom = createButton("Create Room");
	createRoom.position(40, 130);
	createRoom.mousePressed(createNewRoom);
	joinRoom = createButton("Join Room");
	joinRoom.position(40, 150);
	joinRoom.mousePressed(joinARoom);
	saybtn = createButton("Say something!");
	saybtn.position(40, 170);
	saybtn.mousePressed(say);
	nextImg = createButton("Next image");
	nextImg.position(40, 190);
	nextImg.mousePressed(next);
	showStat = createButton("Toggle stats");
	showStat.position(40, 210);
	showStat.mousePressed(showStats);
}

function draw() {
	if(name === "null") {
		name = "dude you need to press ok not cancel, reload the page";
	}
	
  background(255);
  px = mouseX;
  py = mouseY;
  rectMode(CENTER);
  textAlign(CENTER);
	
	if(img === 0) {
  	rect(px, py, 40, 40);
	}
	else if(img === 1) {
		push();
		
		translate(px, py);
		scale(0.2);
		imageMode(CENTER);
		image(birrd, 0, 0);
		
		pop();
	}
	else if(img === 2) {
		push();
		
		translate(px, py);
		scale(0.4);
		imageMode(CENTER);
		image(axy, 0, 0);
		
		pop();
	}
	else if(img === 3) {
		push();
		
		translate(px, py);
		scale(0.4);
		imageMode(CENTER);
		image(knify, 0, 0);
		
		pop();
	}
	else if(img === 4) {
		push();
		
		translate(px, py);
		scale(0.4);
		imageMode(CENTER);
		image(playery, 0, 0);
		
		pop();
	}
	else if(img === 5) {
		push();
		
		translate(px, py);
		scale(0.3);
		imageMode(CENTER);
		image(aplane, 0, 0);
		
		pop();
	}	
	else if(img === 6) {
		push();
		
		translate(px, py);
		scale(0.12);
		imageMode(CENTER);
		image(dude, 0, 0);
		
		pop();
	}	
	else if(img === 7) {
		push();
		
		translate(px, py);
		scale(0.12);
		imageMode(CENTER);
		image(tower, 0, 0);
		
		pop();
	}	
	
	text(name, px, py - 35);
	
	if(saystr !== "null") {
		text(name + "says * " + saystr + " *", px, py - 55);
	}
	
  for (var i in others) {
    var p = others[i];
		if(int(p.room) === int(this.room)) {
			rectMode(CENTER);
			textAlign(CENTER);
			
			if(p.img == 0) {
				rect(p.px, p.py, 40, 40);
			}
			else if(p.img === 1) {
				push();
				
				translate(p.px, p.py);
				scale(0.2);
				imageMode(CENTER);
				image(birrd, 0, 0);
				
				pop();		
			}
			else if(p.img === 2) {
				push();
				
				translate(p.px, p.py);
				scale(0.4);
				imageMode(CENTER);
				image(axy, 0, 0);
				
				pop();
			}
			else if(p.img === 3) {
				push();
				
				translate(p.px, p.py);
				scale(0.4);
				imageMode(CENTER);
				image(knify, 0, 0);
				
				pop();
			}
			else if(p.img === 4) {
				push();
				
				translate(p.px, p.py);
				scale(0.4);
				imageMode(CENTER);
				image(playery, 0, 0);
				
				pop();
			}		
			else if(p.img === 5) {
				push();
				
				translate(p.px, p.py);
				scale(0.3);
				imageMode(CENTER);
				image(aplane, 0, 0);
				
				pop();
			}	
			else if(p.img === 6) {
				push();
				
				translate(p.px, p.py);
				scale(0.12);
				imageMode(CENTER);
				image(dude, 0, 0);
				
				pop();
			}	
			else if(p.img === 7) {
				push();
				
				translate(p.px, p.py);
				scale(0.12);
				imageMode(CENTER);
				image(tower, 0, 0);
				
				pop();
			}	
			text(p.name, p.px, p.py - 35);
			
			if(p.saystr !== "null") {
				text(p.name + "says * " + p.saystr + " *", p.px, p.py - 55);
			}			
			if(debug) {
				text("ping: " + floor(p.ls/frameRate()*1000) + "ms", p.px, p.py - 75);
			}
			p.ls++;
		}
  }

  send();
	text("Online Players: " + (others.length + 1), 60, 20);
	
	if(debug) {
		text("Id: " + id, 60, 40);
	
	}
	
	text("Room: " + room, 60, 60);
	
	if(sayFrames > 300) {
		saystr = "null";
	}
	
	if(saystr !== "null") {
		sayFrames++;
	}
}

function connected() {
  console.log("connected yes");  
}

var otherplayer = function(name, id) {
  this.px = 0;
  this.py = 0;
  this.name = name;
	this.id = id;
	this.ls = 0;
	this.room = 0;
	this.saystr = "";
	this.img = 0;
}

function send() {
  mybox = {
    'px': px,
    'py': py,
    'name': name,
		'id' : id,
		'room' : room,
		'saystr' : saystr,
		'img' : img,
  }

  socket.emit('update', mybox);
}

function updatePlayer(obj) {
  var found = false;
  
  for(var i in others) {
		if(others[i] !== null) {
			var p = others[i];
			
			if(p.id === obj.id) {
				p.px = obj.px;
				p.py = obj.py;
				p.img = obj.img;
				p.saystr = obj.saystr;
				
				if(p.ls > 50) {
					for(var i in others) {
						if(others[i] === this) {
							others[i] = null;
						}
					}
				}
				p.ls = 0;
				found = true;
			}
		}
  }
  
  if(!found) {
    others.push(new otherplayer(obj.name, obj.id));
  }
}

function createNewRoom() {
	var cr = floor(random(1000));
	room = cr;
}

function joinARoom() {
	var jr = parseInt(prompt("Enter Room Code"));	
	room = jr;	
}

function say() {
	var s = prompt("what to say?");
	saystr = s;
	sayFrames = 0;
}

function next() {
  img++;
	
	if(img > maxImg) {
		img = 0;
	}
}

function showStats() {
	debug = !debug;
}