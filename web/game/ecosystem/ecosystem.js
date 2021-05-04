var grid;
var xo = 0;
var yo = 0;

function setup() {
  createCanvas(800, 800);
  grid = createGrid(20, 20);
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      grid[i][j] = round(map(noise(xo, yo), 0, 1, 0, 4));
      xo += 0.1;
    }
    yo += 0.1;
  }

  frameRate(1);
}

function draw() {
  background(100);
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      switch (grid[i][j]) {
        case 0:
          push();
          fill(0, 200, 0);
          stroke(0);
          rect(i * 40, j * 40, 40, 40);
          pop();
          break;
        case 1:
          push();
          fill(150, 100, 0);
          stroke(0);
          rect(i * 40 + 15, j * 40, 10, 40);
          pop();

          push();
          fill(0, 150, 0);
          stroke(0);
          rect(i * 40 + 10, j * 40, 20, 20);
          pop();
          break;
        case 2:
          push();
          fill(100, 50, 0);
          stroke(0);
          rect(i * 40, j * 40, 40, 40);
          pop();
          break;
        case 3:
          push();
          fill(0, 0, 100);
          stroke(0);
          rect(i * 40, j * 40, 40, 40);
          pop();
      }
    }
  }

  updateGrid();
}

function updateGrid() {
  var newGrid = grid;

  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      if (grid[i][j] == 2) {
        if (howManySurround(grid, i, j, 3) > 0) {
          newGrid[i][j] = 0;
        }
        if (howManySurround(grid, i, j, 0) > 3) {
          newGrid[i][j] = 0;
        }
        if (howManySurround(grid, i, j, 1) > 3) {
          newGrid[i][j] = 0;
        }



      }
      if (grid[i][j] == 1) {
        if (howManySurround(grid, i, j, 1) > 5) {
          newGrid[i][j] = 2;
        }
      }
      if (grid[i][j] == 0) {
        if (howManySurround(grid, i, j, 1) > 5) {
          newGrid[i][j] = 1;
        }
        if (howManySurround(grid, i, j, 0) > 6) {
          newGrid[i][j] = 2;
        }
        if (howManySurround(grid, i, j, 3) > 3) {
          newGrid[i][j] = 1;
        }
      }
    }
  }

  grid = newGrid;
}

function howManySurround(tgrid, x, y, val) {
  var ret = 0;

  for (var i = -2; i < 2; i++) {
    for (var j = -2; j < 2; j++) {
      if (i != 0 && j != 0) {
        if (x + i >= 0 && y + j >= 0 && x + i < 20 && y + j < 20) {
          if (tgrid[x + i][y + j] == val) {
            ret++;
          }
        }
      }
    }
  }

  return ret;
}

function createGrid(sx, sy) {
  var ret = [];

  for (var i = 0; i < sx; i++) {
    ret.push(new Array(sy));
  }

  return ret;
}