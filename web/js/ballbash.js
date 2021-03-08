let player_pos;
let player_vel;
let ballsx;
let ballsy;
let balltypes;
let score = 0;
function setup(){
    createCanvas(500, 500);
    player_pos=new p5.Vector(0, 0);
    player_vel=new p5.Vector(10, -10);
    ballsx=new Array(1000);
    ballsy=new Array(1000);
    balltypes=new Array(1000);
    score=0;
    generate_balls();
	createP("Swipe to move");
	createP("Green ball - 1 point");
	createP("Red ball - die");
	createP("Yellow ball - 10 points");
	createP("Purple ball - 5 points");
	createA("https://jiraffe1.github.io/web/game.html", "back");
}

function draw_player(){
    stroke(255);
    strokeWeight(2);
    fill(0, 0, 255);
    ellipse(width / 2, height / 2, 32, 32);
}

function generate_balls(){
    for(let i = 0;i <= 999;i++) {
        ballsx[i]=random(-8000, 8000);
        ballsy[i]=random(-1600, 2400);
        let rand = round(random(14));
        if(rand == 4) {
            balltypes[i]=2;
        }
    else if(rand == 5) {
            balltypes[i]=3;
        }
    else if(rand == 6) {
            balltypes[i]=4;
        }
    else {
            balltypes[i]=1;
        }
    }
}

function draw_all_balls(){
    strokeWeight(2);
    stroke(255);
    for(let i = 0;i <= 999;i++) {
        if(balltypes[i] == 1) {
            fill(0, 255, 0);
        }
    else if(balltypes[i] == 2) {
            fill(255, 0, 0);
        }
    else if(balltypes[i] == 3) {
            fill(255, 255, 0);
        }
    else if(balltypes[i] == 4) {
            fill(255, 0, 255);
        }
        ellipse((ballsx[i] - player_pos.x) + width / 2, (ballsy[i] - player_pos.y) + height / 2, 32, 32);
    }
}

function vel_effect(){
    player_pos.x+=player_vel.x;
    player_pos.y+=player_vel.y;
}

function collisions(){
    for(let i = 0;i <= 999;i++) {
        let px = player_pos.x;
        let py = player_pos.y;
        let ex = ballsx[i];
        let ey = ballsy[i];
        if(dist(px, py, ex, ey) < 32) {
            player_vel.mult(-0.4);
            if(balltypes[i] == 1) {
                ballsx[i]=-3000;
                ballsy[i]=-3000;
                score++;
            }
    else if(balltypes[i] == 2) {
                reset();
            }
    else if(balltypes[i] == 3) {
                ballsx[i]=-3000;
                ballsy[i]=-3000;
                score+=10;
            }
    else if(balltypes[i] == 4) {
                ballsx[i]=-3000;
                ballsy[i]=-3000;
                score+=3;
                player_vel.x=random(-25, 25);
                player_vel.y=random(-25, 25);
            }
        }
        if(py > 2000 || py < -3000 || px < -8000 || px > 8000) {
            player_pos.y=0;
            player_vel.x=10;
            player_vel.y=-10;
        }
    }
}

function reset(){
    player_pos.x=0;
    player_pos.y=0;
    player_vel.x=10;
    player_vel.y=-10;
    score=0;
}

function gravity(){
    player_vel.y+=0.1;
    player_vel.x*=0.999;
}

function test_text(){
    fill(255);
    textSize(25);
    text("score: " + score, 25, 25);
}

function mousePressed(){
    if(mouseIsPressed) {
        player_vel.x+=(mouseX - pmouseX) / 16;
        player_vel.y+=(mouseY - pmouseY) / 16;
        strokeWeight(25);
        stroke(player_vel.x * 15, player_vel.y * 15, 255);
        fill(0, 255, 0);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}

function draw(){
    background(0);
    test_text();
    draw_player();
    gravity();
    vel_effect();
    draw_all_balls();
    mousePressed();
    collisions();
}