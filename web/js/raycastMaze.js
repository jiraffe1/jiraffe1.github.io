const worldMap = [
[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,],  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,],
  [1,0,0,1,1,0,0,0,0,0,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,],
  [1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,1,],
  [1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,1,],
  [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,2,2,0,2,2,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,1,],
  [1,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1,0,0,1,0,0,1,1,1,1,1,0,0,1,],
  [1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,2,0,0,0,0,0,2,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,1,0,0,0,2,0,0,0,0,0,2,0,0,0,0,1,0,0,1,0,0,1,1,1,0,1,0,0,1,],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,2,2,0,2,2,0,0,0,0,0,1,0,1,1,0,0,1,1,1,0,1,0,0,1,],
  [1,2,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,1,],
  [1,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,1,],
  [1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,1,1,0,0,1,],
  [1,0,0,1,1,3,3,0,0,1,1,1,0,1,1,1,1,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,3,0,1,0,0,0,0,0,1,0,0,0,0,1,],
  [1,0,1,3,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,1,1,0,0,0,0,1,],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,3,0,1,0,0,0,1,0,0,0,0,0,0,1,],
  [1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,1,1,0,1,3,0,1,1,0,0,1,1,1,0,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,],
  [1,0,2,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,],
  [1,0,1,1,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,],
  [1,0,0,1,0,1,0,0,1,0,0,1,1,0,0,1,1,3,0,0,1,1,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,],
  [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,1,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,],
  [1,0,0,0,0,1,0,0,0,0,0,0,2,0,0,1,0,0,1,0,0,0,1,0,0,0,1,1,1,0,1,1,1,1,0,0,1,0,1,1,1,1,1,1,0,1,1,1,0,1,],
  [1,0,0,0,0,1,0,0,1,0,0,1,2,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,1,],
  [1,0,0,1,1,1,0,0,0,0,1,1,0,0,2,0,0,0,0,3,0,0,1,1,1,1,1,1,3,3,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,1,1,0,1,],
  [1,0,0,0,0,1,1,0,0,0,0,0,0,0,2,1,0,0,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,1,],
  [1,1,1,0,0,1,0,1,1,1,1,1,1,0,0,1,1,3,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,1,],
  [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,0,1,1,1,1,1,0,1,0,0,0,0,0,1,1,1,1,0,1,],
  [1,0,0,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,1,1,1,0,1,],
  [1,0,0,0,0,1,0,0,1,1,1,0,0,1,1,0,1,3,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,1,0,0,0,0,0,1,1,1,1,0,1,],
  [1,1,1,0,0,1,0,0,1,0,1,0,0,1,0,0,0,3,0,0,1,1,0,0,0,0,0,1,0,1,1,1,0,1,0,1,0,0,0,0,0,0,0,0,1,1,1,0,0,1,],
  [1,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,1,0,0,0,0,3,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,1,0,0,1,],
  [1,0,0,2,1,1,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,3,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,1,0,0,1,],
  [1,1,1,2,1,1,1,1,0,0,1,1,1,1,0,0,0,1,1,0,0,0,3,3,3,3,0,0,1,0,1,1,0,1,0,3,1,0,0,1,0,0,0,0,0,0,1,0,0,1,],
  [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,3,1,1,0,0,0,0,0,0,0,0,1,1,0,1,],
  [1,0,1,0,1,0,1,1,1,1,0,0,0,0,0,0,1,3,0,1,0,1,0,1,0,2,1,0,0,0,0,0,0,0,0,3,1,0,0,0,0,0,1,0,0,0,1,0,0,1,],
  [1,0,1,1,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,2,0,0,1,0,1,1,1,0,0,1,0,0,1,],
  [1,0,1,0,1,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,0,1,0,1,0,1,0,0,1,1,0,1,1,1,0,1,0,0,0,0,0,0,1,0,0,0,1,1,0,1,],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,],
  [1,0,1,0,1,0,2,0,0,0,1,0,0,0,0,0,1,2,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,2,2,2,1,1,1,1,1,1,1,0,1,0,1,1,],
  [1,0,1,1,0,0,1,0,0,0,1,1,1,1,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,],
  [1,0,1,0,1,0,1,2,0,2,0,0,0,0,0,0,0,2,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,0,0,1,0,0,0,0,0,0,0,1,1,],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,1,],
  [1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,3,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1,1,0,0,1,0,0,0,0,0,1,1,],
  [1,0,1,1,0,0,0,0,1,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,0,1,0,0,0,0,0,1,1,],
  [1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,],
];

const screenModes = [
    "screen",
    "minimap"
]
    
const floorColor = 130;
const ceilingColor = 65;

const stripWidth = 1;

var screenMode = screenModes[0];

var screenLines = []

var wallImages = [];

var player = {
	x : 16,
	y : 10,
	dir : 0,		
	rot : 0,		
	speed : 0,		
	moveSpeed : 0.1,	
	rotSpeed : 3 * Math.PI / 180	
}

var mapWidth = worldMap[0].length;
var mapHeight = worldMap.length;

var miniMapScale = 8;

var screenWidth = 800;
var screenHeight = 600;

var fov = 60 * Math.PI / 180;

var numRays = Math.ceil(screenWidth / stripWidth);
var fovHalf = fov / 2;

var viewDist = (screenWidth/2) / Math.tan((fov / 2));

var twoPI = Math.PI * 2;


function preload() {

}
    
function setup() {
    createA("https://jiraffe1.github.io/web/game.html", "back");
    var c = createCanvas(screenWidth, screenHeight);
    c.class("gameCanvas")
    

    var dpi = window.devicePixelRatio;
    var canvas = document.getElementById('defaultCanvas0');
    
    var ctx = canvas.getContext('2d');
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false; /// future
    
    canvas.style.width = windowWidth;
    canvas.style.height = windowHeight * 2;
    
    fill(255)
}

function draw() {
    clear();

    if (keyIsDown(TAB)) {
        screenMode = screenModes[1];
    } else {
        screenMode = screenModes[0];
    }
    
    if (screenMode == screenModes[0]) {
        resetScreenDefaults()
        drawScreen()
    } else if (screenMode == screenModes[1]) {
        resetScreenDefaults()
        drawMinimap()
    }
    
    move();
}    

function drawScreen() {
    
    noStroke();
    fill(20, 100, 20);
    rect(0,screenHeight/2, screenWidth, (screenHeight/2));
    
    fill(50, 150, 255);
    rect(0,0, screenWidth, (screenHeight/2));
    
    
    screenLines = [];
    

	for (var i=0;i<numRays;i++) {

		var rayScreenPos = (-numRays/2 + i) * stripWidth;
		var rayViewDist = Math.sqrt(rayScreenPos*rayScreenPos + viewDist*viewDist);
		var rayAngle = Math.asin(rayScreenPos / rayViewDist);

		castRay(player.rot + rayAngle);
	}
    
    //render lines
    for (var i=0;i<screenWidth;i+=stripWidth) {
        
        if (screenLines[i] != undefined) {
            var lineWidth = screenLines[i][0];
            var lineHeight = screenLines[i][1];
            var lineTop = screenLines[i][2];
            var lineWallType = screenLines[i][3];
            var lineIsHorizontal = screenLines[i][4];
             switch(lineWallType) {
               case 1:
                 fill(255-(300-lineHeight), 0, 0);
                 break;
                 case 2:
                 fill(0, 0, 255-(300-lineHeight));
                 break;
                 case 3:
                 fill(100-(100-lineHeight*2)-50, 100-(100-lineHeight*2)-50, 100-(100-lineHeight*2)-50);
                 break;
             }
            noStroke();
            rect(i, lineTop, stripWidth, lineHeight);
            //rect( i, lineTop, stripWidth, lineHeight, (64*lineTexX)/lineWidth ,0, stripWidth, 64);
        }
    }
}

function castRay(rayAngle) {
	rayAngle %= twoPI;
	if (rayAngle < 0) rayAngle += twoPI;

	
	var right = (rayAngle > twoPI * 0.75 || rayAngle < twoPI * 0.25);
	var up = (rayAngle < 0 || rayAngle > Math.PI);

	var wallType = 0;

	// only do these once
	var angleSin = Math.sin(rayAngle);
	var angleCos = Math.cos(rayAngle);

	var dist = 0;	
	var xHit = 0; 
	var yHit = 0;
	var wallX;	
	var wallY;

	var wallIsHorizontal = false;

    var wallDark = true;


	var slope = angleSin / angleCos; 	
	var dXVer = right ? 1 : -1; 	
	var dYVer = dXVer * slope; 	

	var x = right ? Math.ceil(player.x) : Math.floor(player.x);	
	var y = player.y + (x - player.x) * slope;			
	while (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) {
		var wallX = Math.floor(x + (right ? 0 : -1));
		var wallY = Math.floor(y);

		// is this point inside a wall block?
		if (worldMap[wallY][wallX] > 0) {
			var distX = x - player.x;
			var distY = y - player.y;
			dist = distX*distX + distY*distY;	

			wallType = worldMap[wallY][wallX]; 
			if (!right) textureX = 1 - textureX; 
			xHit = x;
			yHit = y;

			wallIsHorizontal = false;

			break;
		}
		x += dXVer;
		y += dYVer;
	}



	var slope = angleCos / angleSin;
	var dYHor = up ? -1 : 1;
	var dXHor = dYHor * slope;
	var y = up ? Math.floor(player.y) : Math.ceil(player.y);
	var x = player.x + (y - player.y) * slope;

	while (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) {
		var wallY = Math.floor(y + (up ? -1 : 0));
		var wallX = Math.floor(x);
		if (worldMap[wallY][wallX] > 0) {
			var distX = x - player.x;
			var distY = y - player.y;
          
          if(distX < distY) {
             wallDark = true;
             }
			var blockDist = distX*distX + distY*distY;
			if (!dist || blockDist < dist) {
				dist = blockDist;
				xHit = x;
				yHit = y;

				wallType = worldMap[wallY][wallX];
				textureX = x % 1;
				if (up) textureX = 1 - textureX;
			}
			break;
		}
		x += dXHor;
		y += dYHor;
	}

	if (dist) {

		dist = Math.sqrt(dist);


		dist = dist * Math.cos(player.rot - rayAngle);



		var height = Math.round(viewDist / dist);


		var width = height * stripWidth;

		var top = Math.round((screenHeight - height) / 2);

	//	if (texX > width - stripWidth)
	//		texX = width - stripWidth;
        
        screenLines.push([width, height, top, wallType, wallDark]);
        
	}
}
    
function resetScreenDefaults() {
    fill(255);
    stroke(0);
    strokeWeight(1);
}
    
function drawMinimap(){
    //MINIMAP BLOCKS
  push();  
  translate(-0.5*(player.x*(miniMapScale)), -0.5*(player.y*(miniMapScale)));
  fill(200)
    noStroke();
    
    for (var y=0;y<mapHeight;y++) {
		
        for (var x=0;x<mapWidth;x++) {

			var wall = worldMap[y][x];

			if (wall > 0) {
                
                rect(x * miniMapScale, y * miniMapScale, miniMapScale, miniMapScale)
			}
		}
	}
    
    //MINIMAP PLAYER
    //MINIMAP PLAYER
    fill(color("red"))
    rect(player.x * miniMapScale - 2, player.y * miniMapScale - 2, miniMapScale / 2, miniMapScale / 2)
    
    strokeWeight(2)
    stroke(color("red"));
    line(player.x * miniMapScale, player.y * miniMapScale, (player.x + Math.cos(player.rot) * 2) * miniMapScale, (player.y + Math.sin(player.rot) * 2) * miniMapScale);
  
  pop();
}
    
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        player.dir = -1;
    } else if (keyCode === RIGHT_ARROW) {
        player.dir = 1;
    }
    
    if (keyCode === UP_ARROW) {
        player.speed = 1;
    } else if (keyCode === DOWN_ARROW) {
        player.speed = -1;
    }
  
    if (keyCode === 116) {
        location.reload();
    }
    return false
}

function keyReleased() {
    if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
        player.dir = 0;
    }
    
    if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
        player.speed = 0;
    }
    
    return false
}

function move() {
	var moveStep = player.speed * player.moveSpeed;	

	player.rot += player.dir * player.rotSpeed; 
	var newX = player.x + Math.cos(player.rot) * moveStep;	
	var newY = player.y + Math.sin(player.rot) * moveStep;

	if (isBlocking(newX, newY)) {	
		return; 
	}

	player.x = newX; 
	player.y = newY;
}

function isBlocking(x,y) {

	
	if (y < 0 || y >= mapHeight || x < 0 || x >= mapWidth)
		return true;

	
	return (worldMap[Math.floor(y)][Math.floor(x)] != 0); 
}


document.addEventListener("keydown", function(e) {
        if (e.keyCode == 9) {
            e.preventDefault();
        }
}, false);