function createGrid(i, j, f) {
  var ret = [];
  for (var a = 0; a < i; a++) {
    ret.push(new Array(j));
  }

  for (var x = 0; x < i; x++) {
    for (var y = 0; y < j; y++) {
      ret[x][y] = f;
    }
  }

  return ret;
}