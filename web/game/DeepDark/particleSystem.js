class ParticleSystem {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.particles = [];
		this.lt = 0;
		this.addParticles();
	}

	addParticles() {}

	update(index) {
		this.lt++;
		this.run(index);
		for (var i in this.particles) {
			this.particles[i].lt++;
			this.particles[i].display();

			this.particles[i].update(i);
		}

	}

	run() {}

	deleteMe(index) {
		ParticleSystems.splice(index, 1);
	}
}

class OutwardCircle extends ParticleSystem {
	constructor(x, y) {
		super(x, y);
	}

	addParticles() {
		this.particles.push(new ExpandingCircle(this, this.x, this.y));
	}

	run(i) {
		if (this.lt > 150) {
			this.deleteMe(i);
		}
	}
}

class Attractor extends ParticleSystem {
	constructor(x, y) {
		super(x, y);
		this.destroy = false;
	}

	addParticles() {
		this.particles.push(new AttractingCircle(this, this.x, this.y));
	}

	run(i) {

		if (frameCount % 5 == 0) {
			this.particles.push(new AttractedCircle(this, this.x + random(-50, 50), this.y + random(-50, 50)));
		}

		if (this.destroy) {
			this.deleteMe(i);
		}
	}
}

class BigAttractor extends ParticleSystem {
	constructor(x, y) {
		super(x, y);
		this.destroy = false;
	}

	addParticles() {
		this.particles.push(new BigAttractingCircle(this, this.x, this.y));
	}

	run(i) {

		if (frameCount%3 == 0) {
		this.particles.push(new AttractedCircle(this, this.x + random(-100, 100), this.y + random(-100, 100)));
		}

		if (this.destroy) {
			this.deleteMe(i);
		}
	}
}

class Explosion extends ParticleSystem {
	constructor(x, y) {
		super(x, y);
	}

	run(i) {
		if (this.lt > 150) {
			this.deleteMe(i);
		}
	}
	addParticles() {
		this.particles.push(new ExpandingCircle(this, this.x, this.y));
		for (var i = 0; i < 20; i++) this.particles.push(new ExplosionParticle(this, this.x + random(-10 - this.lt / 5, 10 + this.lt / 5), this.y + random(-10 - this.lt / 5, 10 + this.lt / 5)));
	}

}

class SmokeEmitter extends ParticleSystem {
	constructor(x, y) {
		super(x, y);
		this.destroy = false;
	}

	run(i) {
		this.particles.push(new SmokeParticle(this, this.x + random(-8, 8), this.y + random(-8, 8)));
		if (this.destroy) {
			this.deleteMe(i);
		}
	}
}

class DeathLaser extends ParticleSystem {
	constructor(x, y, t) {
		super(x, y);
		this.shooter = null;
		this.targetPlayer = t;
		GuardianPowerup.play();
		GuardianWhoosh.play();
	}

	addParticles() {
		this.particles.push(new VeryBigAttractingCircle(this, this.x, this.y));
	}

	run(isd) {
		if (this.lt < 90) {
			this.particles.push(new AttractedCircle(this, this.x + random(-150, 150), this.y + random(-150, 150)));
		}

		if (this.lt > 90 && this.lt < 140 && this.lt % 3 == 0) {
			this.particles.push(new BigImplodingCircle(this, this.x + random(-10, 10), this.y + random(-10, 10)));
		}

		if (this.lt == 160) {
			for (var i = 0; i < random(7, 15); i++) {
				ParticleSystems.push(new OutwardCircle(this.x + random(-30, 30), this.y + random(-30, 30)));
			}
			GuardianLaser.play();
			if (this.targetPlayer == 1) {
				var ray = Raycast(this.x, this.y, player.x, player.y, Tiles);
			} else if (this.targetPlayer == 2) {
				var ray = Raycast(this.x, this.y, playertwo.x, playertwo.y, Tiles);
			}

			push();
			strokeWeight(10);
			stroke(255);
			line(this.x, this.y, ray.hitX, ray.hitY);
			pop();

			for (var j = 0; j < ray.rayLength; j += 3) {
				var pos = new p5.Vector(this.x, this.y);
				var diff = new p5.Vector(ray.hitX - this.x, ray.hitY - this.y);
				diff.normalize();
				diff.setMag(j);
				pos.add(diff);

				this.particles.push(new LaserParticle(this, pos.x, pos.y));
			}
			ShakeAmount += 120;
			Tiles[floor(ray.hitX / TileSize)][floor(ray.hitY / TileSize)] = 0;

			for (var k = 0; k < random(3, 5); k++) {
				ParticleSystems.push(new Explosion(ray.hitX + random(-30, 30), ray.hitY + random(-30, 30)));
			}

			if (ray.touchedTarget) {
				ShakeAmount += 120;
				if (this.targetPlayer == 1) {
					player.hp -= 5;
				} else if (this.targetPlayer == 2) {

					playertwo.hp -= 5;
				}
			}
		}



		if (this.lt == 250) {
			this.shooter.state = "Fireballs";
			this.deleteMe(isd);
		}
	}
}

class Portal extends ParticleSystem {
	constructor(x, y) {
		super(x, y);
		this.destroy = false;
	}

	addParticles() {
		this.particles.push(new SquarePortal(this, this.x, this.y));
	}
}