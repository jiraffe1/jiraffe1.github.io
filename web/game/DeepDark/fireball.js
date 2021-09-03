class Fireball {
	constructor(x, y, mx, my, isPlayer, isGuardian) {
		this.x = x;
		this.y = y;
		var vel = new p5.Vector(mx - x, my - y).normalize().setMag(4);
		this.vx = vel.x;
		this.vy = vel.y;
		this.isPlayer = isPlayer;

		if (!SimpleGraphics) {
			this.smoker = new SmokeEmitter(this.x, this.y);
			ParticleSystems.push(this.smoker);
		}
		this.isGuardian = isGuardian;
	}

	update(index) {
		this.display();

		if (Tiles[floor(this.x / TileSize)][floor(this.y / TileSize)] == 1) {
			if (this.isGuardian && random(1) > 0.25) {
				Tiles[floor(this.x / TileSize)][floor(this.y / TileSize)] = 0;
				ShakeAmount += 50;
			}

			this.deleteMe(index);
		}
		if (dist(this.x, this.y, player.x, player.y) < 30 && !this.isPlayer) {

			player.hp--;
			ShakeAmount += 50;
			this.deleteMe(index);

		}
		if (playertwo != null) {
			if (dist(this.x, this.y, playertwo.x, playertwo.y) < 30 && !this.isPlayer) {

				playertwo.hp--;
				ShakeAmount += 50;
				this.deleteMe(index);

			}
		}
		if (this.isPlayer) {
			for (var s in Spirits) {
				if (dist(this.x, this.y, Spirits[s].position.x, Spirits[s].position.y) < 40) {
					Spirits[s].hp--;
					ShakeAmount += 10;
					this.deleteMe(index);
				}
			}
			if (LevelGuardian != null) {
				if (dist(this.x, this.y, LevelGuardian.position.x, LevelGuardian.position.y) < 70) {
					LevelGuardian.hp--;
					ShakeAmount += 10;
					this.deleteMe(index);
				}
			}
		}

		this.x += this.vx* (60 / frameRate());
		this.y += this.vy* (60 / frameRate());
		if (!SimpleGraphics) {
			this.smoker.x = this.x;
			this.smoker.y = this.y;
		}
	}

	display() {
		push();
		noStroke();
		translate(this.x, this.y);
		if (!this.isPlayer) {
			fill(255, 100, 50);
		} else {
			fill(50, 100, 255);
		}
		ellipse(0, 0, 18, 18)
		pop();
	}

	deleteMe(index) {
		if (!SimpleGraphics) this.smoker.destroy = true;
		ParticleSystems.push(new Explosion(this.x, this.y));
		ShakeAmount += 10;
		ImpactSound.rate(random(0.5, 0.9));
		ImpactSound.play();
		Fireballs.splice(index, 1);

	}
}