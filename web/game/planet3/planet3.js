var universalGravity = 0.02;
var celestialBodies;
var buildSun;
var paused;
var collisions;
var slowMo;
var timePass = 1;
var selectedID = 0;
function setup(){
    celestialBodies = new Array();
    collisions = false;
    slowMo = false;
    createCanvas(1000, 800);
    frameRate(50);
    buildSun=false;
}

function draw(){
    if(slowMo) {
        timePass=0.05;
    }
    else {
        timePass=1;
    }
    background(10);
    text("", width - 120, height - 20);
    text("click anywhere to create a planet, press any key to toggle sun creation", 150, 20);
    text("hover over a planet and press q to see its stats or press d to devare it", 150, 40);
    drawInspector();
    for (var P2JSi = 0; P2JSi < celestialBodies.length; P2JSi++){
        var cb = celestialBodies[P2JSi];
        cb.display();
    }
    if(slowMo) {
        fill(255);
        text("SlowMo enabled. Press s to exit SlowMo", width * 0.7, 20);
    }
    if(!paused) {
        for (var P2JSi = 0; P2JSi < celestialBodies.length; P2JSi++){
            var cb = celestialBodies[P2JSi];
            cb.run();
        }
        fill(255);
        text("press p to pause, s to toggle slowMo", width / 2, 20);
    }
    else {
        fill(255);
        text("paused. press p to unpause", width / 2, 20);
    }
    fill(255);
    text("create sun ? : " + buildSun, 20, 20);
}

function mousePressed(){
    celestialBodies.push(new celestialBody(new p5.Vector(mouseX, mouseY), random(5, 64), random(0.4, 2), buildSun));
}

function drawInspector(){
    text("Selected: id " + selectedID, 20, 50);
    text("name: planet " + selectedID, 20, 70);
    if(selectedID != 0) {
        var c = celestialBodies[selectedID - 1];
        text("mass: " + c.mass, 20, 90);
        text("radius: " + c.radius, 20, 110);
        text("density: " + c.density, 20, 130);
        text("position, x: " + round(c.position.x) + " y: " + round(c.position.y), 20, 150);
        text("velocity, x: " + round(c.velocity.x) + " y: " + round(c.velocity.y), 20, 170);
        text("created: year " + round(c.birth / 60), 20, 190);
        text("age: " + round(c.age / 60) + " years", 20, 210);
    }
}

function keyPressed(){
    if(key == 'p') {
        if(paused) {
            paused=false;
        }
    else {
            paused=true;
        }
    }
    else if(key == 's') {
        if(slowMo) {
            slowMo=false;
        }
    else {
            slowMo=true;
            fill(255);
        }
    }
    else if(key != 'q') {
        if(buildSun) {
            buildSun=false;
        }
    else {
            buildSun=true;
        }
    }
}

class celestialBody{
    constructor(position_, mass_, density_, theSun){
        this.thePlanet = 0;
        this.myID = 0;
        this.mass=mass_;
        this.density=density_;
        this.position=position_;
        this.radius=this.mass / this.density;
        this.birth=frameCount;
        this.age=0;
        this.velocity=new p5.Vector(0, 0);
        this.colour=new p5.Vector(random(255), random(255), random(255));
        this.amITheSun=theSun;
    }

    display(){
        this.IDset=false;
        fill(this.colour.x, this.colour.y, this.colour.z);
        ellipse(this.position.x, this.position.y, this.radius, this.radius);
        this.age=frameCount - this.birth;
        if(dist(mouseX, mouseY, this.position.x, this.position.y) <= this.radius && keyIsPressed && key == 'q') {
            selectedID=this.myID;
        }
        if(dist(mouseX, mouseY, this.position.x, this.position.y) <= this.radius && keyIsPressed && key == 'd') {
            celestialBodies.splice(celestialBodies.findIndex(p5jssi => p5jssi===this),1)[0];
        }
    }

    velEffects(){
        this.position.x+=this.velocity.x * timePass;
        this.position.y+=this.velocity.y * timePass;
    }

    otherBodyEffects(){
        this.thePlanet=0;
        for (var P2JSi = 0; P2JSi < celestialBodies.length; P2JSi++){
            var c = celestialBodies[P2JSi];
            this.thePlanet++;
            fill(255);
            if(!c.IDset) {
                text(this.thePlanet, c.position.x, c.position.y);
                c.IDset=true;
                c.myID=this.thePlanet;
            }
            var r = dist(this.position.x, this.position.y, c.position.x, c.position.y);
            var m1 = this.mass;
            var m2 = c.mass;
            var vec = new p5.Vector(this.position.x - c.position.x, this.position.y - c.position.y);
            if(r != 0) {
                this.velocity.sub((vec.x * (universalGravity * ((m1 * m2) / (r * r)))) * timePass, vec.y * (universalGravity * ((m1 * m2) / (r * r))) * timePass);
                if(r < (this.radius + c.radius) / 2 && collisions) {
                    this.velocity.mult(-1);
                }
            }
        }
    }

    run(){
        if(!this.amITheSun) {
            this.velEffects();
            this.otherBodyEffects();
        }
    }

}

