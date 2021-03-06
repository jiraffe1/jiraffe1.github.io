var world;
var drag;
var settings;
function setup(){
    drag = null;
    settings=new set();
    world=new Array();
    createCanvas(800, 600);
    addEdges();
    createP("Q - Create ball");
    createP("W - Create static ball");
    createP("O - Create creature");
    createP("P - Create static square");
    createP("Left Mouse - Drag nodes");
    createP("R - Reset")
    createA("https://jiraffe1.github.io/web/game.html", "back");
}

function draw(){
    background(255);
    for(var i = world.length - 1;i >= 0;i--) {
        var n = world[i];
        n.display();
    }
    stroke(0);
    fill(0);
  push();
  strokeWeight(0.5);
  textSize(16);
    text(floor(frameRate()), 30, 30);
  pop();
}

function keyPressed(){
    switch(key){
        case 'q':var mx = mouseX;
        var my = mouseY;
        var newNode = new node(new p5.Vector(mx, my), false);
        world.push(newNode);
        break;
        case 'w':var nx = mouseX;
        var ny = mouseY;
        var newNodeA = new node(new p5.Vector(nx, ny), true);
        world.push(newNodeA);
        break;
        case 'o':newAddSquare(mouseX, mouseY, false, max(settings.creatureSize + int(random(-settings.creatureMutability, settings.creatureMutability)), 1), max(settings.creatureSize + int(random(-settings.creatureMutability, settings.creatureMutability)), 1), 30);
        break;
        case 'p':addSquare(mouseX, mouseY, true);
        break;
        case 'r':setup();
        break;
    }
}

function addEdges(){
    for(var i = 0;i < width / 12;i++) {
        var x = i * 14;
        var y = height;
        var n = new node(new p5.Vector(x, y), true);
        world.push(n);
    }
}

function addSquare(x, y, isKinematic){
    var topR = new node(new p5.Vector(x + 50, y), isKinematic);
    var topL = new node(new p5.Vector(x, y), isKinematic);
    var bottomR = new node(new p5.Vector(x + 50, y + 50), isKinematic);
    var bottomL = new node(new p5.Vector(x, y + 50), isKinematic);
    topR.addLink(topL);
    topR.addLink(bottomL);
    topR.addLink(bottomR);
    topL.addLink(topR);
    topL.addLink(bottomL);
    topL.addLink(bottomR);
    bottomR.addLink(topR);
    bottomR.addLink(topL);
    bottomR.addLink(bottomL);
    bottomL.addLink(bottomR);
    bottomL.addLink(topR);
    bottomL.addLink(topL);
    world.push(topR);
    world.push(topL);
    world.push(bottomR);
    world.push(bottomL);
}

function newAddSquare(x, y, isKinematic, w, h, scale){
    var newSquare = processing2jsNewNDimArray([w, h]);
    for(var i = 0;i < w;i++) {
        for(var j = 0;j < h;j++) {
            var nx = x + (i * scale);
            var ny = y + (j * scale);
            if(i == 0 || i == w - 1 || j == 0 || j == h - 1) {
                var n = new node(new p5.Vector(nx, ny), isKinematic);
                newSquare[i][j]=n;
                world.push(n);
            }
        }
    }
    for(var i1 = 0;i1 < w;i1++) {
        for(var j1 = 0;j1 < h;j1++) {
            var n = newSquare[i1][j1];
            for(var i2 = 0;i2 < w;i2++) {
                for(var j2 = 0;j2 < h;j2++) {
                    if(newSquare[i2][j2] != null && n != null) {
                        n.addLink(newSquare[i2][j2]);
                    }
                }
            }
        }
    }
}

class node{
    constructor(pos_, isKinematic_){
        this.size = 0;
        this.bounciness = 0;
        this.linkDists=new Array();
        this.pos=pos_;
        this.vel=new p5.Vector(0, 0);
        this.links=new Array();
        this.isKinematic=isKinematic_;
        this.size=settings.defaultSize + random(-5, 5);
        this.bounciness=settings.defaultBounciness;
    }

    display(){
        if(!this.isKinematic) {
            stroke(255, 0, 0);
        }
    else {
            stroke(100, 100, 100);
        }
        fill(255, 0, 0);
        strokeWeight(this.size);
        point(this.pos.x, this.pos.y);
        stroke(0);
        strokeWeight(3);
        if(mouseIsPressed && dist(mouseX, mouseY, this.pos.x, this.pos.y) < 9 && this.isKinematic == false && drag == null) drag=this;
    else if(!mouseIsPressed) drag=null;
        if(drag == this) {
            this.pos.set(mouseX, mouseY);
            this.vel.set(0, 0);
        }
        this.physics();
    }

    physics(){
        this.vel.limit(settings.defaultMaxVel);
        if(!this.isKinematic) {
            for(var i = world.length - 1;i >= 0;i--) {
                var n = world[i];
                if(n != this) {
                    if(p5.Vector.dist(this.pos, n.pos) < this.size / 2 + n.size / 2) {
                        this.repelNode(n);
                    }
                }
            }
            this.vel.y+=settings.gravity;
            this.pos.add(this.vel);
            for(var i = this.links.length - 1;i >= 0;i--) {
                var n = this.links[i];
                var p = n.pos;
                if(!this.isKinematic) this.effectLink(n);
                line(this.pos.x, this.pos.y, p.x, p.y);
            }
        }
    }

    repelNode(n){
        var a = new p5.Vector(this.pos.x, this.pos.y);
        var b = new p5.Vector(n.pos.x, n.pos.y);
        var c = a.sub(b);
        c.setMag(this.bounciness * 3);
        c.mult(-1);
        this.vel.sub(c);
        this.vel.mult(this.bounciness);
    }

    addLink(node){
        this.links.push(node);
        this.linkDists.push(p5.Vector.dist(this.pos, node.pos));
    }

    effectLink(node){
        var dst = 0;
        for(var i = this.links.length - 1;i >= 0;i--) {
            if(this.links[i] == node) {
                dst=this.linkDists[i];
                break;
            }
        }
        var actualDist = p5.Vector.dist(this.pos, node.pos);
        var a = new p5.Vector(this.pos.x, this.pos.y);
        var b = new p5.Vector(node.pos.x, node.pos.y);
        var c = b.sub(a);
        if(actualDist > dst) {
            c.setMag(settings.defaultSpringiness);
            this.vel.add(c);
        }
    else {
            c.setMag(-settings.defaultSpringiness);
            this.vel.add(c);
        }
    }

}

class set{
    constructor(){
        this.gravity = 0.2;
        this.defaultSize = 15;
        this.defaultMaxVel = 10;
        this.defaultSpringiness = 0.4;
        this.defaultBounciness = 0.4;
        this.creatureMutability = 2;
        this.creatureSize = 3;
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
