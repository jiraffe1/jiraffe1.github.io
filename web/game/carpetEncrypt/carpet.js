//11: A
//22: B
//33: C
//44: D
//55: E
//66: F
//77: G
//88: H

var grid = [
  ["A", "B", "C", "D", "E", "*", "0", "("],
  ["F", "G", "H", "I", "J", "/", "1", ")"],
  ["K", "L", "M", "N", "O", "=", "2", "["],
  ["P", "Q", "R", "S", "T", "&", "3", "]"],
  ["U", "V", "W", "X", "Y", "#", "4", "^"],
  ["Z", ".", ",", "-", "+", "{", "5", "%"],
  ["6", "7", "8", "9", ";", ":", "}", "_"],
  ["|", "!", "?", "<", ">", "$", "£", " "],
];

var stringy = "hi there dude";
var numbery = "£#$!$!&R![][#[#$#!#£!Q&#&#$&]W[W!#$!£#&$#&#[!#$£";
var encodeBtn;
var decodeBtn;
var encodeText;
var decodeText;

function setup() {
  noCanvas();
  encodeBtn = document.getElementById("encoder");
  decodeBtn = document.getElementById("decoder");
  encodeText = document.getElementById("forEncoding");
  decodeText = document.getElementById("forDecoding");
  encodeBtn.onclick = enc;
  decodeBtn.onclick = dec;
  console.log(encrypt(stringy));
  console.log(decrypt(numbery));
}

function enc() {
  document.getElementById("enc").innerHTML = encrypt(encodeText.value);
}

function dec() {
  document.getElementById("dec").innerHTML = decrypt(decodeText.value);
}

function encrypt(t) {
  var ret = numberify(t);
  ret = compressIt(ret);
  return ret;
}

function decrypt(t) {
  var ret = decompressIt(t);
  ret = unNumberify(ret);
  return ret;
}

function compressIt(t) {
  var text = t;
  text = text.replaceAll("11", "Q");
  text = text.replaceAll("22", "W");
  text = text.replaceAll("33", "E");
  text = text.replaceAll("44", "R");
  text = text.replaceAll("55", "T");
  text = text.replaceAll("66", "Y");
  text = text.replaceAll("77", "U");
  text = text.replaceAll("88", "X");

  text = text.replaceAll("1", "&");
  text = text.replaceAll("2", "#");
  text = text.replaceAll("3", "£");
  text = text.replaceAll("4", "!");
  text = text.replaceAll("5", "$");
  text = text.replaceAll("6", "[");
  text = text.replaceAll("7", "]");
  text = text.replaceAll("8", "+");
  return text;
}

function decompressIt(t) {
  var text = t;
  text = text.replaceAll("&", "1");
  text = text.replaceAll("#", "2");
  text = text.replaceAll("£", "3");
  text = text.replaceAll("!", "4");
  text = text.replaceAll("$", "5");
  text = text.replaceAll("[", "6");
  text = text.replaceAll("]", "7");
  text = text.replaceAll("+", "8");
  
  text = text.replaceAll("Q", "11");
  text = text.replaceAll("W", "22");
  text = text.replaceAll("E", "33");
  text = text.replaceAll("R", "44");
  text = text.replaceAll("T", "55");
  text = text.replaceAll("Y", "66");
  text = text.replaceAll("U", "77");
  text = text.replaceAll("X", "88");


  /*
  text = text.replaceAll("Z", "1");
  text = text.replaceAll("Y", "2");
  text = text.replaceAll("X", "3");
  text = text.replaceAll("W", "4");
  text = text.replaceAll("V", "5");
  text = text.replaceAll("U", "6");
  text = text.replaceAll("T", "7");
  text = text.replaceAll("S", "8");
  */
  return text;
}

function getPositionInSquare(character) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (grid[i][j] == character) {
        return str(str(j + 1) + str(i + 1));
      }
    }
  }

  return "NONONONNON";
}

function getCharacterAt(digits) {
  var xp = numberToInt(digits[0]);
  var yp = numberToInt(digits[1]);
  return grid[int(yp - 1)][int(xp - 1)];
}

function numberToInt(n) {
  switch (n) {
    case "0":
      return 0;
    case "1":
      return 1;
    case "2":
      return 2;
    case "3":
      return 3;
    case "4":
      return 4;
    case "5":
      return 5;
    case "6":
      return 6;
    case "7":
      return 7;
    case "8":
      return 8;
    case "9":
      return 9;
    default:
      return 8;
  }
}

function numberify(text) {
  var uppered = text.toUpperCase();
  var output = ""; //= 66
  //console.log(uppered);
  for (var x = 0; x < text.length; x++) {
    var c = uppered.charAt(x);
    output += getPositionInSquare(c);
  }
  //output+= "77";
  return output;
}

function unNumberify(text) {
  var output = "";
  for (var x = 0; x < text.length; x += 2) {
    var thing = getCharacterAt(text.substring(x, x + 2));
    output += thing;
  }
  return output;
}
