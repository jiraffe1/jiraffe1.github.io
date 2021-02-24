var codetext;
var codename;
var run;
var stop;
var load;
var saver;

function setup() {
  noCanvas();

  codetext = createElement('textarea');
  codetext.size(450, 700);
  codetext.position(0, 50);
  load = createFileInput(loadFile);
  load.attribute("title", "Load a file from your computer");
  load.position(50, 0);
  saver = createButton("Save");
  saver.attribute("title", "Save a file to your computer");
  saver.position(225, 0);
  codename = createInput("File");
  codename.attribute("title", "file name");
  codename.position(280, 0);
  saver.mousePressed(saveFile);
    createA("https://jiraffe1.github.io/web/game.html", "back");
}

function draw() {
  background(220);
}

function loadFile(file) {
  codetext.remove();
  codetext = createElement('textarea', file.data);
  codetext.size(450, 700);
  codetext.position(0, 50);
  load.remove();
  load = createFileInput(loadFile);
  load.attribute("title", "Load a file from your computer");
  load.position(50, 0);
  saver.remove();
  saver = createButton("Save");
  saver.attribute("title", "Save a file to your computer");
  saver.position(225, 0);
  codename.remove();
  codename = createInput(file.name);
  codename.attribute("title", "file name");
  codename.position(280, 0);
  saver.mousePressed(saveFile);
  console.log(codetext.value());
}

function saveFile() {
  console.log("Saving file " + codename.value() + ".txt")
  saveStrings([codetext.value()], codename.value(), '.txt', true);
}
