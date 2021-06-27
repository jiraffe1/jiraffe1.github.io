//11: A
//22: B
//33: C
//44: D
//55: E
//66: F
//77: G
//88: H

var grid = [
  ["A","B","C","D","E","*","0","("],
  ["F","G","H","I","J","/","1",")"],
  ["K","L","M","N","O","=","2","["],
  ["P","Q","R","S","T","&","3","]"],
  ["U","V","W","X","Y","#","4","^"],
  ["Z",".",",","-","+","{","5","%"],
  ["6","7","8","9",";",":","}","_"],
  ["|","!","?","<",">","$","£"," "],
];

var stringy = "hi. this is a test";
var numbery = "3254541D4676262524234A1212517B6B4254321521264253";
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
  var originalLength = t.length;
  var ret = numberify(t);
  ret = compressIt(ret);
  var newLength = ret.length;
  console.log("encryption completed - new string is " + floor(newLength/originalLength*100) + "%" + " of original size:");
  return ret;
}

function decrypt(t) {
  var ret = decompressIt(t);
  ret = unNumberify(ret);
  return ret;
}

function compressIt(t) {
  var text = t;
  text=text.replaceAll("11", "A");
  text=text.replaceAll("22", "B");
  text=text.replaceAll("33", "C");  
  text=text.replaceAll("44", "D");
  text=text.replaceAll("55", "E");
  text=text.replaceAll("66", "F");
  text=text.replaceAll("77", "G");
  text=text.replaceAll("88", "H");
  return text;
}

function decompressIt(t) {
  var text = t;
  text=text.replaceAll("A", "11");
  text=text.replaceAll("B", "22");
  text=text.replaceAll("C", "33");  
  text=text.replaceAll("D", "44");
  text=text.replaceAll("E", "55");
  text=text.replaceAll("F", "66");
  text=text.replaceAll("G", "77");
  text=text.replaceAll("H", "88");
  return text;
}

function getPositionInSquare(character) {
  for(var i= 0; i < 9; i++) {
    for(var j = 0; j < 9; j++) {
      if(grid[i][j] == character) {
         return str(str(j+1)+str(i+1));
      }
    }
  }
  
  return "NONONONNON";
}

function getCharacterAt(digits) {
  var xp = numberToInt(digits[0]);
  var yp = numberToInt(digits[1]);
  return grid[int(yp-1)][int(xp-1)];
}

function numberToInt(n) {
  switch(n) {
    case '0':
      return 0;
    case '1':
      return 1;
    case '2':
      return 2;
    case '3':
      return 3;
    case '4':
      return 4;
    case '5':
      return 5;
    case '6':
      return 6;
    case '7':
      return 7;
    case '8':
      return 8;
    case '9':
      return 9;
    default:
      return 8;
  }
}

function numberify(text) {
  var uppered = text.toUpperCase();
  var output = "";//= 66
  //console.log(uppered);
  for(var x = 0; x < text.length; x++) {
    var c = uppered.charAt(x);
    output += getPositionInSquare(c);
  }
  //output+= "77";
  return output;
}

function unNumberify(text) {
  var output = "";
  for(var x = 0; x < text.length; x+=2) {
    var thing = getCharacterAt(text.substring(x, x+2))
    output += thing;
    
  }
  return output;  
}