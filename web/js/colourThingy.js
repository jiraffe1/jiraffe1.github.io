function setup() {
  createCanvas(windowWidth, windowHeight);
  createA("https://jiraffe1.github.io/game.html", "back")
}

function draw() {
  background(mouseX/width*255, mouseY/width*255, mouseX*width/255);
}