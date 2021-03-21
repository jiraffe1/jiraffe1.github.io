var spline;

var clearIt;
var saveIt;
var loadIt;

function setup() {
	createCanvas(800, 600);
    removeElements();
	spline = new Spline();
    clearIt = createButton("Clear");
    saveIt = createButton("Save as JSON [WIP]");
    loadIt = createFileInput(loadit);
    clearIt.mousePressed(clearit);
    saveIt.mousePressed(saveit);
}

function draw() {
	background(255);
	spline.update();
}

function clearit() {
    setup();
}

function saveit() {
    var JSON = {};
    JSON.step = spline.step;
    JSON.tol = spline.tol;
    JSON.debug = spline.debug;
    JSON.maxSpd = spline.maxSpd;
    JSON.ctrlpoints = spline.ctrlpoints;

    saveJSON(JSON, "myTrack.json");
}

function loadit(file) {
    var loaded = loadJSON(file);
    spline = new Spline();
    spline.step = loaded.step;
    spline.tol = loaded.tol;
    spline.debug = loaded.debug;
    spline.maxSpd = loaded.maxSpd;
    spline.ctrlpoints = loaded.ctrlpoints;
    spline.recalculatePoints();
    console.log(spline);
}

var Spline = function () {
	this.ctrlpoints = new Array();
	this.track = new Array();
	this.step = 0.75;
	this.tol = 20;
	this.debug = true;
	this.maxSpd = 5;
};

Spline.prototype.recalculatePoints = function () {
	var iter = 0;
	var pts = this.ctrlpoints;
	var tgt = createVector(pts[0].x, pts[0].y);
	var pos = createVector(pts[0].x, pts[0].y);
	var vel = createVector(0, 0);
	var last = createVector(pts[pts.length - 1].x, pts[pts.length - 1].y);

	for (var k = 0; k < pts.length * 800; k++) {
		var pl = createVector(tgt.x, tgt.y);
		pl.sub(pos);
		pl.normalize();
		pl.mult(this.step);
		vel.add(pl);
		vel.setMag(min(vel.mag(), this.maxSpd));
		pos.add(vel);

		if (dist(pos.x, pos.y, tgt.x, tgt.y) < this.tol) {
			iter++;
			tgt = createVector(this.ctrlpoints[iter].x, this.ctrlpoints[iter].y);
		}

		if (dist(pos.x, pos.y, last.x, last.y) < this.tol) {
			break;
		}
		this.track.push(new LineN(pos.x, pos.y));
	}
};

Spline.prototype.display = function () {
	strokeWeight(15);
	for (var i = 1; i < this.track.length; i++) {
		stroke(0, 0, 0);
		point(this.track[i].x, this.track[i].y);
	}

	for (var j = 0; j < this.ctrlpoints.length; j++) {
		if (this.debug) {
			stroke(100, 100, 100, 100);
			strokeWeight(this.tol);
			point(this.ctrlpoints[j].x, this.ctrlpoints[j].y);
		}

		stroke(0, 0, 0);
		strokeWeight(3);
		if (i === 0) stroke(255, 0, 0);
		point(this.ctrlpoints[j].x, this.ctrlpoints[j].y);
	}
};

Spline.prototype.update = function () {
	this.display();
};

function mouseClicked() {
	if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
		spline.ctrlpoints.push(new Node(mouseX, mouseY));
		if (spline.ctrlpoints.length !== 1) spline.recalculatePoints();
	}
}

var Node = function (x, y) {
	this.x = x;
	this.y = y;
    this.id = "NODE";
};

var LineN = function (x, y) {
	this.x = x;
	this.y = y;
    this.id = "POINT";
};