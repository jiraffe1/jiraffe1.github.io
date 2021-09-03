var rayStepSize= TileSize;
function Raycast(fromX, fromY, toX, toY, tiles) {
	var hitPlayer = false;
	var lastD;
	for(var i = 0; i < dist(fromX, fromY, toX, toY); i+=rayStepSize) { //?
		var diff = createVector(toX, toY).sub(createVector(fromX, fromY));
		var hitted = false;
		diff.normalize();
		diff.setMag(i);
		diff.add(createVector(fromX, fromY));
		lastD = diff;
		
		/*
		push();
		fill(0, 255, 0);
		noStroke();
		ellipse(diff.x, diff.y, 5, 5);
		pop();
		
		push();
		strokeWeight(3);
		*/
		var x = floor(diff.x / TileSize);
		var y = floor(diff.y / TileSize);
		
		if(tiles[x][y] == 1) {
			hitted = true;	
		}
		if(floor(player.x / TileSize) == x && floor(player.y / TileSize) == y) {
			hitPlayer = true;
			hitted = true;
						return {
				rayLength: i,
				touchedTarget: hitPlayer,
				hit: true,
				hitX: diff.x,
				hitY: diff.y,
			}
		}
		/*
		noFill();
		stroke(0, 255, 0);
		if(hitted) {
			stroke(255, 0, 0);
		}
		rect((x * TileSize), (y * TileSize), TileSize, TileSize);
		pop();
		*/
		if(hitted) {
			return {
				rayLength: i,
				touchedTarget: hitPlayer,
				hit: true,
				hitX: diff.x,
				hitY: diff.y,
			}
		}
		/*
		pop();
		*/
		//if(i > 500) {
		//	break;
		//}
	}
	
	return {
		rayLength: dist(fromX, fromY, toX, toY),
		touchedTarget: hitPlayer,
		hit:false,
		hitX: lastD.x,
		hitY: lastD.y,
	}
}