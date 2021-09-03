class Player {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.shootCursor = new p5.Vector(1, 0);
		this.speed = 2.6;
		this.flipImage = 1;
		this.flipped = 1;
		this.shotCounter = 0;
		this.shotTimer = 0;

		this.hp = 10;
		this.summon = 0;
		this.ammo = 50;
		this.arrowKeys = false;
	}

	display() {
		push();
		translate(this.x, this.y);
		rectMode(CENTER);
		scale(0.55 * this.flipImage, 0.55);
		image(Player_Image, -150, -150);
		this.flipImage = lerp(this.flipImage, this.flipped, 0.5);
		pop();

		push();
		translate(this.x + (this.shootCursor.copy().setMag(60).x), this.y + (this.shootCursor.copy().setMag(60).y));
		fill(50, 100, 255);
		ellipse(0, 0, 9, 9);
		pop();




		push();
		translate(this.x, this.y);
		fill(255);
		stroke(255);
		textAlign(CENTER);
		text(this.ammo, 0, -60);
		if(this.arrowKeys) {
					fill(0, 0, 255);
		stroke(0, 0, 255);
			text("P2", 0, -30);
		}
		else {
					fill(255, 0, 0);
		stroke(255, 0, 0);
			text("P1", 0, -30);
		}
		pop();

	}

	update() {
		this.display();
		this.myInput();
		this.shotTimer -= 1 * (60 / frameRate());

		if (Tiles[floor(this.x / TileSize)][floor(this.y / TileSize)] == 2) {
			this.hp += floor(random(1, 3));
			ShakeAmount += 10;
			Tiles[floor(this.x / TileSize)][floor(this.y / TileSize)] = 0;
			CollectRune.rate(random(0.7, 1));
			CollectRune.play();
			ParticleSystems.push(new OutwardCircle(floor(this.x / TileSize) * TileSize + (TileSize / 2), floor(this.y / TileSize) * TileSize + (TileSize / 2)));
		}

		if (Tiles[floor(this.x / TileSize)][floor(this.y / TileSize)] == 3) {
			this.ammo += 15;
			ShakeAmount += 10;
			Tiles[floor(this.x / TileSize)][floor(this.y / TileSize)] = 0;
			CollectRune.rate(random(0.7, 1));
			CollectRune.play();
			ParticleSystems.push(new OutwardCircle(floor(this.x / TileSize) * TileSize + (TileSize / 2), floor(this.y / TileSize) * TileSize + (TileSize / 2)));
		}

		if (Tiles[floor(this.x / TileSize)][floor(this.y / TileSize)] == 4) {
			this.summon++;
			ShakeAmount += 10;
			Tiles[floor(this.x / TileSize)][floor(this.y / TileSize)] = 0;
			CollectRune.rate(random(0.7, 1));
			CollectRune.play();
			ParticleSystems.push(new OutwardCircle(floor(this.x / TileSize) * TileSize + (TileSize / 2), floor(this.y / TileSize) * TileSize + (TileSize / 2)));
		}

		if (this.summon >= 3 && LevelGuardian == null) {
			this.summon = 0;
			summonGuardian(this.x, this.y);
		}
	}

	myInput() {
		if (!this.arrowKeys) {
			if (keyIsDown(Input.UP)) {
				if (this.canMoveTo(this.x, this.y - this.speed * (60 / frameRate()))) {
					this.y -= this.speed * (60 / frameRate());
					this.shootCursor.y -= 0.5 * this.speed * (60 / frameRate());
					this.shootCursor.y = max(this.shootCursor.y, -5);
					this.shootCursor.x *= 0.8;
				}
			}
			if (keyIsDown(Input.DOWN)) {
				if (this.canMoveTo(this.x, this.y + this.speed * (60 / frameRate()))) {
					this.y += this.speed * (60 / frameRate());
					this.shootCursor.y += 0.5 * this.speed * (60 / frameRate());
					this.shootCursor.y = min(this.shootCursor.y, 5);
					this.shootCursor.x *= 0.8;
				}
			}
			if (keyIsDown(Input.LEFT)) {
				if (this.canMoveTo(this.x - this.speed * (60 / frameRate()), this.y)) {
					this.x -= this.speed * (60 / frameRate());
					this.flipped = -1;
					this.shootCursor.x -= 0.5 * this.speed * (60 / frameRate());
					this.shootCursor.x = max(this.shootCursor.x, -5);
					this.shootCursor.y *= 0.8;
				}
			}
			if (keyIsDown(Input.RIGHT)) {
				if (this.canMoveTo(this.x + this.speed * (60 / frameRate()), this.y)) {
					this.x += this.speed * (60 / frameRate());
					this.flipped = 1;
					this.shootCursor.x += 0.5 * this.speed * (60 / frameRate());
					this.shootCursor.x = min(this.shootCursor.x, 5);
					this.shootCursor.y *= 0.8;
				}
			}
			var shoot = keyIsDown(Input.SPACE);
			if (shoot && this.shotTimer < 0 && this.ammo > 0) {
				this.shotTimer = 10;
				if (this.shotCounter % 2 == 0) {
					Fireballs.push(new Fireball(25 * this.flipImage + this.x, 8 + this.y, this.x + (this.shootCursor.x * 90), this.y + (this.shootCursor.y * 90), true));
					ParticleSystems.push(new OutwardCircle(25 * this.flipImage + this.x, 8 + this.y));
				} else {
					Fireballs.push(new Fireball(-25 * this.flipImage + this.x, 11 + this.y, this.x + (this.shootCursor.x * 90), this.y + (this.shootCursor.y * 90), true));
					ParticleSystems.push(new OutwardCircle(-25 * this.flipImage + this.x, 11 + this.y));
				}
				ShakeAmount += 5;
				PlayerShot.rate(random(0.5, 0.8));
				PlayerShot.play();
				this.shotCounter++;
				this.ammo--;
			}
		} else {
			if (keyIsDown(Input.UPARROW)) {
				if (this.canMoveTo(this.x, this.y - this.speed * (60 / frameRate()))) {
					this.y -= this.speed * (60 / frameRate());
					this.shootCursor.y -= 0.5 * this.speed * (60 / frameRate());
					this.shootCursor.y = max(this.shootCursor.y, -5);
					this.shootCursor.x *= 0.8;
				}
			}
			if (keyIsDown(Input.DOWNARROW)) {
				if (this.canMoveTo(this.x, this.y + this.speed * (60 / frameRate()))) {
					this.y += this.speed * (60 / frameRate());
					this.shootCursor.y += 0.5 * this.speed * (60 / frameRate());
					this.shootCursor.y = min(this.shootCursor.y, 5);
					this.shootCursor.x *= 0.8;
				}
			}
			if (keyIsDown(Input.LEFTARROW)) {
				if (this.canMoveTo(this.x - this.speed * (60 / frameRate()), this.y)) {
					this.x -= this.speed * (60 / frameRate());
					this.flipped = -1;
					this.shootCursor.x -= 0.5 * this.speed * (60 / frameRate());
					this.shootCursor.x = max(this.shootCursor.x, -5);
					this.shootCursor.y *= 0.8;
				}
			}
			if (keyIsDown(Input.RIGHTARROW)) {
				if (this.canMoveTo(this.x + this.speed * (60 / frameRate()), this.y)) {
					this.x += this.speed * (60 / frameRate());
					this.flipped = 1;
					this.shootCursor.x += 0.5 * this.speed * (60 / frameRate());
					this.shootCursor.x = min(this.shootCursor.x, 5);
					this.shootCursor.y *= 0.8;
				}
			}
			var shoot = keyIsDown(Input.ENTER);
			if (shoot && this.shotTimer < 0 && this.ammo > 0) {
				this.shotTimer = 10;
				if (this.shotCounter % 2 == 0) {
					Fireballs.push(new Fireball(25 * this.flipImage + this.x, 8 + this.y, this.x + (this.shootCursor.x * 90), this.y + (this.shootCursor.y * 90), true));
					ParticleSystems.push(new OutwardCircle(25 * this.flipImage + this.x, 8 + this.y));
				} else {
					Fireballs.push(new Fireball(-25 * this.flipImage + this.x, 11 + this.y, this.x + (this.shootCursor.x * 90), this.y + (this.shootCursor.y * 90), true));
					ParticleSystems.push(new OutwardCircle(-25 * this.flipImage + this.x, 11 + this.y));
				}
				ShakeAmount += 5;
				PlayerShot.rate(random(0.5, 0.8));
				PlayerShot.play();
				this.shotCounter++;
				this.ammo--;
			}
		}
	}

	canMoveTo(x, y) {
		var i = floor(x / TileSize);
		var j = floor(y / TileSize);

		if (Tiles[i][j] != 1) {
			return true;
		}

		return false;
	}
}