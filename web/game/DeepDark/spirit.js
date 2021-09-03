class Spirit {
	constructor(x, y, t) {
		this.orb = new Attractor(x, y)
		ParticleSystems.push(this.orb);

		//i have no idea what these do
		//|
		//v
		this.currentTSquareX = 0;
		this.currentTSquareY = 0;
		this.currentSquareX = 0;
		this.currentSquareY = 0;
		this.PSquareX = 0;
		this.PSquareY = 0;
		this.PSquareX1 = 0;
		this.PSquareY1 = 0;
		this.vel = 1;
		this.dir = 0;
		this.searchDepth = 180;
		this.len = 0;
		this.lastPosX = [];
		this.lastPosY = [];
		//^
		//|
		this.position = new p5.Vector(x, y);
		this.run = false;
		this.canSeePlayer = false;

		this.hp = 4;
		this.targetPlayer = t;
		ParticleSystems.push(new Explosion(x, y));
		SpiritAppear.play();
	}

	display() {
		push();
		translate(this.position.x, this.position.y);
		fill(255, 0, 0);
		noStroke();
		ellipse(0, 0, 9, 9);
		scale(0.7);
		image(Spirit_Fancy, -150, -150);
		//ellipse(0, 0, 9, 9);
		pop();
		/*
		push();
		translate(this.position.x, this.position.y);
		fill(255);
		stroke(255);
		textAlign(CENTER);
		text(this.hp, 0, -50);
		pop();
		*/
	}

	deleteMe(index) {
		for (var i = 0; i < random(3, 7); i++) {
			ParticleSystems.push(new Explosion(this.position.x + random(50), this.position.y + random(-30, 30)));
		}
		if (Tiles[this.currentSquareX][this.currentSquareY] == 0) {
			Tiles[this.currentSquareX][this.currentSquareY] = round(random(2, 4));
		}
		this.orb.destroy = true;
		SpiritFrequency *= 0.75;
		SpiritFrequency = floor(SpiritFrequency);
		SpiritFrequency = max(SpiritFrequency, 5);
		ShakeAmount += 5;
		Spirits.splice(index, 1);
		ShakeAmount += 5;
	}

	update(index) {
		this.orb.x = this.position.x;
		this.orb.y = this.position.y - 25;
		this.display();
		this.PSquareX1 = this.PSquareX; //i have no idea what this is for
		this.PSquareY1 = this.PSquareY;
		this.PSquareX = this.currentSquareX;
		this.PSquareY = this.currentSquareY;
		this.currentSquareX = floor(this.position.x / TileSize);
		this.currentSquareY = floor(this.position.y / TileSize);
		this.lastPosX.push(this.currentSquareX);
		this.lastPosY.push(this.currentSquareY);
		this.display();
		this.findTarget();
		this.move();
		if (frameCount % 10 == 0) {
			this.run = !this.run;
		}

		var ray = Raycast(this.position.x, this.position.y - 25, player.x, player.y, Tiles);
		this.canSeePlayer = ray.touchedTarget;

		if (this.canSeePlayer && frameCount % 30 == 0 && this.targetPlayer == 1) {
			Fireballs.push(new Fireball(this.position.x, this.position.y - 25, player.x, player.y, false));
			SpiritShoot.rate(random(0.6, 1));
			SpiritShoot.play();
			ParticleSystems.push(new OutwardCircle(this.position.x, this.position.y));
		}
		if (this.canSeePlayer && frameCount % 30 == 0 && this.targetPlayer == 2) {
			Fireballs.push(new Fireball(this.position.x, this.position.y - 25, playertwo.x, playertwo.y, false));
			SpiritShoot.rate(random(0.6, 1));
			SpiritShoot.play();
			ParticleSystems.push(new OutwardCircle(this.position.x, this.position.y));
		}
		if (this.hp < 0) {
			this.deleteMe(index);
		}

		//Despawn if too far away

		if (dist(this.position.x, this.position.y, player.x, player.y) > TileSize * 15) {
			this.deleteMe(index);
		}
	}
	glevel(level, x, y) { //<-- i dont know why this is necessary
		if (x > 0 && x < MapSize && y > 0 && y < MapSize) {
			return level[x][y];
		}
		return 1;
	}
	findTarget() { //<-- i still have no idea how this works
		if (this.targetPlayer == 1) {
			var bestPosX = 0;
			var bestPosY = 0;
			var bestDist = 10000000;
			for (var i = -1; i < 2; i++) {
				for (var j = -1; j < 2; j++) {
					if (i + j != 0) { //<-- i still have no idea how this works
						var nx = this.currentSquareX + i;
						var ny = this.currentSquareY + j;
						var ndist = dist(player.x, player.y, this.toSquare(nx), this.toSquare(ny));
						if (this.glevel(Tiles, nx, ny) != 1 && !this.isInLast(nx, ny, this.searchDepth)) {
							if (ndist < bestDist) {
								bestPosX = nx;
								bestPosY = ny;
								bestDist = ndist;
							}
						} else {
							continue; //????
						}
					}
				}
			}
		}
		else if(this.targetPlayer == 2) {
			var bestPosX = 0;
			var bestPosY = 0;
			var bestDist = 10000000;
			for (var i = -1; i < 2; i++) {
				for (var j = -1; j < 2; j++) {
					if (i + j != 0) { //<-- i still have no idea how this works
						var nx = this.currentSquareX + i;
						var ny = this.currentSquareY + j;
						var ndist = dist(playertwo.x, playertwo.y, this.toSquare(nx), this.toSquare(ny));
						if (this.glevel(Tiles, nx, ny) != 1 && !this.isInLast(nx, ny, this.searchDepth)) {
							if (ndist < bestDist) {
								bestPosX = nx;
								bestPosY = ny;
								bestDist = ndist;
							}
						} else {
							continue; //????
						}
					}
				}
			}
		}
		this.currentTSquareX = bestPosX;
		this.currentTSquareY = bestPosY;
	}

	compareIntVec(x1, y1, x2, y2) {
		return (x1 == x2 && y1 == y2);
	}

	isInLast(x, y, search) { //<-- i still have no idea how this works or what it is for
		this.len = this.lastPosX.length - 1;
		for (var i = 0; i < search; i++) {
			var index = this.len - i;
			if (index > 0) { //???
				var x1 = this.lastPosX[index];
				var y1 = this.lastPosY[index];
				if (this.compareIntVec(x, y, x1, y1)) {
					return true;
				}
			}
		}
		return false;
	}

	toSquare(grid) {
		return (grid * TileSize) + TileSize / 2;
	}

	move() {
		var newPos = new p5.Vector((this.currentTSquareX * TileSize) + TileSize / 2, (this.currentTSquareY * TileSize) + TileSize / 2);
		this.position = p5.Vector.lerp(this.position, newPos, 0.02);
		if (p5.Vector.dist(this.position, newPos) < 1) {
			this.position = newPos;
		}
	}
}