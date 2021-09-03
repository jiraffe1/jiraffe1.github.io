class Particle {
	constructor(system, _x, _y) {
		this.parent = system;
		this.x = _x;
		this.y = _y;
		this.lt = 0;
		this.finished = false;
	}

	update(index) {}

	deleteMe(index) {
		this.parent.particles.splice(index, 1);
	}

	display() {}
}

class ExpandingCircle extends Particle {
	constructor(system, _x, _y) {
		super(system, _x, _y);
	}

	update(index) {
		if (this.lt > 60) {
			this.deleteMe(index);
		}
	}

	display() {
		push();
		translate(this.x, this.y);

		noFill();
		strokeWeight(6);
		stroke(255, 255, 255, 255 - this.lt * 16);

		circle(0, 0, min(this.lt * 12, 80));
		pop();
	}
}

class BigImplodingCircle extends Particle {
	constructor(system, _x, _y) {
		super(system, _x, _y);
	}

	update(index) {
		if (this.lt > 60) {
			this.deleteMe(index);
		}
	}

	display() {
		push();
		translate(this.x, this.y);

		noFill();
		strokeWeight(6);
		stroke(255, 255, 255, this.lt * 10);

		circle(0, 0, max(240-this.lt*12, 0));
		pop();
	}
}

class AttractingCircle extends Particle {
	constructor(system, _x, _y) {
		super(system, _x, _y);
	}

	update(index) {
		this.x = this.parent.x;
		this.y = this.parent.y
	}

	display() {
		push();
		fill(255, 255, 255);
		translate(this.x, this.y);
		noStroke();
		circle(0, 0, min(this.lt / 5, 18));
		pop();
	}
}

class BigAttractingCircle extends Particle {
	constructor(system, _x, _y) {
		super(system, _x, _y);
	}

	update(index) {
		this.x = this.parent.x;
		this.y = this.parent.y
	}

	display() {
		push();
		fill(255, 255, 255);
		translate(this.x, this.y);
		noStroke();
		circle(0, 0, min(this.lt / 5, 25));
		pop();
	}
}

class VeryBigAttractingCircle extends Particle {
	constructor(system, _x, _y) {
		super(system, _x, _y);
	}

	update(index) {
		this.x = this.parent.x;
		this.y = this.parent.y
	}

	display() {
		push();
		fill(255, 255, 255);
		translate(this.x, this.y);
		noStroke();
		circle(0, 0, min(this.lt / 2,30));
		pop();
	}
}

class AttractedCircle extends Particle {
	constructor(system, _x, _y) {
		super(system, _x, _y);
		this.size = random(5, 15);
	}

	update(index) {
		var diff = new p5.Vector(this.x - this.parent.x, this.y - this.parent.y);
		diff.setMag(3);
		this.x -= diff.x;
		this.y -= diff.y;

		if (dist(this.x, this.y, this.parent.x, this.parent.y) < 5) {
			this.deleteMe(index);
		}
	}

	display() {
		push();
		fill(255, 255, 255);
		translate(this.x, this.y);
		noStroke();
		circle(0, 0, min(this.lt, this.size));
		pop();
	}
}

class ExplosionParticle extends Particle {
	constructor(system, _x, _y) {
		super(system, _x, _y);
		this.size = random(5, 15);
		this.speed = random(2, 5);
		this.life = random(30, 50);
	}

	update(index) {
		var diff = new p5.Vector(this.x - this.parent.x, this.y - this.parent.y);
		diff.setMag(-this.speed);
		this.x -= diff.x;
		this.y -= diff.y;

		if (dist(this.x, this.y, this.parent.x, this.parent.y) > 50 || this.lt > this.life) {
			this.deleteMe(index);
		}
	}

	display() {
		push();
		fill(255, 255, 255);
		translate(this.x, this.y);
		noStroke();
		circle(0, 0, min(this.lt, this.size));
		pop();
	}
}

class SmokeParticle extends Particle {
	constructor(system, _x, _y) {
		super(system, _x, _y);
		this.size = random(5, 15);
		this.life = random(10, 30);
	}

	update(index) {
		if (this.lt > this.life) {
			this.deleteMe(index);
		}
	}

	display() {
		push();
		fill(255, 255, 255);
		translate(this.x, this.y);
		noStroke();
		circle(0, 0, min(this.lt*3, this.size));
		pop();
	}
}
class LaserParticle extends Particle {
	constructor(system, _x, _y) {
		super(system, _x, _y);
		this.size = 20
		this.life = random(10, 30);
	}

	update(index) {
		if (this.lt > this.life) {
			this.deleteMe(index);
		}
	}

	display() {
		push();
		fill(255, 255, 255);
		translate(this.x, this.y);
		noStroke();
		circle(0, 0, min(this.lt*3, this.size));
		pop();
	}
}

class SquarePortal extends Particle {//this isnt actually square
		constructor(system, _x, _y) {
		super(system, _x, _y);
	}
	
	update(index) {
		if(dist(this.x, this.y, player.x, player.y) < min(this.lt/2, 50) / 2) {
			NextLevel();
		}
	}

	display() {
		push();
		fill(255, 255, 255);
		translate(this.x, this.y);
		stroke(255);
		strokeWeight(10);
		fill(0, 0, 0, 150);
		circle(0, 0, min(this.lt / 2,150));
		pop();
	}
}