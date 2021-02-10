var press = false;
var words = ["el norte: the north", "el sur: the south", "el oeste: the west", "el este: the east", "el noreste: the northeast", "el noroeste: the northwest", "el sureste: the southeast", "el suroeste: the southwest"];
var wordIndex;

function setup() {
  createCanvas(600, 600);
}


function draw() {
  background(180, 180, 180);
  fill(100, 100, 100);
  stroke(0);
  
  rectMode(CENTER);
  
  if(!press) {
    rect(width/2, height/2, width/3, height/3);
    fill(255);
    stroke(255);
    textAlign(CENTER);
    textSize(width/45);
    text("press to learn spanish", width/2, height/2);
  }
  else {
    rect(width/2, height/2, width/2, height/2);  
    fill(255, 255, 255);
    stroke(255, 255, 255);
    textSize(24);
    fill(255);
    stroke(255);
    text(words[wordIndex],width/2, height-50);
    textAlign(CENTER);
    textSize(width/30);
    text("press to learn spanish", width/2, height/2);
  }
}

function mousePressed() {
  if(mouseX > width/2-width/6 && mouseX < width/2+width/6 && mouseY > height/2-height/6 && mouseY < height/2+height/6) {
    press = true;
    wordIndex = round(random(words.length));
  }
}

function mouseReleased() {
  press = false;
}