var Tiles;
var TileSize = 90;
var MapSize = 50;
var Builder;
var player;
var playertwo;

var Guardian_Simple;
var Guardian_Fancy;
var Spirit_Simple;
var Spirit_Fancy;

var light = 3;

var camX = 0;
var camY = 0;

var Spirits = [];

var ParticleSystems = [];
var Fireballs = [];

var clicked = false;

var BloodRune;
var SummonRune;
var LightningRune;

var SpiritFrequency = 500;
var frameRater = 60;

var LevelGuardian = null;
var vignette;
var AncientFont;

var ShakeAmount = 5;
var ShakeX = 0;
var ShakeY = 0;

var MainMenu = true;

var SinglePlayerIcon;
var MultiplayerIcon;

var Music;
var SpiritAppear;
var PlayerShot;
var ImpactSound;
var GuardianPowerup;
var GuardianLaser;
var GuardianWhoosh;
var SimpleGraphics = false;
var TutorialImage;

var SelectedNumber = 0;
var ShowTutorial = false;

function preload() {
	TutorialImage = loadImage("tutorial.svg");
	Music = loadSound('DeepDark_Summoned.mp3');
	SpiritAppear = loadSound('Spirit_Appear.wav');
	SpiritShoot = loadSound('Spirit_Shoot.wav');
	PlayerShot = loadSound('Player_Shot.wav');
	GuardianPowerup = loadSound('Guardian_Powerup.wav');
	GuardianLaser = loadSound('Guardian_Laser.wav');
	GuardianWhoosh = loadSound('Guardian_Whoosh.wav');
	CollectRune = loadSound('Collect_Item.wav');
	ImpactSound = loadSound('Impact.wav');
	Guardian_Fancy = loadImage("guardian_fancy.svg");
	Guardian_Simple = loadImage("guardian_simple.svg");
	Spirit_Simple = loadImage("spirit_simple.svg");
	Spirit_Fancy = loadImage("spirit_fancy.svg");
	Player_Image = loadImage("knight.svg");
	BloodRune = loadImage("bloodrune.svg");
	SummonRune = loadImage("summonrune.svg");
	LightningRune = loadImage("lightningyrune.svg");

	SinglePlayerIcon = loadImage("oneplayer.svg");
	MultiplayerIcon = loadImage("multiplayer.svg");

	AncientFont = loadFont("ancientFont.ttf");
	SpiritAppear.setVolume(0.5);
	SpiritShoot.setVolume(0.5);
	CollectRune.setVolume(0.2);
	PlayerShot.rate(0.7);
	GuardianWhoosh.rate(0.7);
	GuardianLaser.rate(0.7);
	GuardianLaser.setVolume(1.2);
}

function setup() {
	createCanvas(900, 800);
	Tiles = createGrid(MapSize, MapSize, 0);
	generateMap(Tiles);
	Builder = new MazeBuilder(MapSize, MapSize);
	Tiles = Builder.maze;
	player = new Player(100, 100);
	playertwo = null;


	//Thank you to Blechdavier for this piece of code
	//https://openprocessing.org/user/220823?view=sketches
	//Please do check out the awesome stuff!

	vignette = createImage(64, 64);
	vignette.loadPixels();
	for (let ii = 0; ii < vignette.width; ii++) {
		for (let jj = 0; jj < vignette.height; jj++) {
			vignette.set(ii, jj, [0, 0, 0, 40 + map(dist(ii, jj, (vignette.width / 2 - 0.5), (vignette.height / 2 - 0.5)), dist(10, 10, (vignette.width / 2 - 0.5), (vignette.height / 2 - 0.5)), dist(0, 0, (vignette.width / 2 - 0.5), (vignette.height / 2 - 0.5)), 0, 60)]);
		}
	}
	vignette.updatePixels();

	for (var i = 0; i < MapSize; i++) {
		for (var j = 0; j < MapSize; j++) {
			if (Tiles[i][j] == 0) {
				if (random(100) > 90) {
					Tiles[i][j] = round(random(2, 4));
				}
			}

		}
	}
	textFont(AncientFont);
	window.addEventListener("keydown", function(e) {
		if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
			e.preventDefault();
		}
	}, false);
}

function draw() {

	if (!Music.isPlaying()) {
		Music.play();
		Music.setVolume(0.3);
	}

	ShakeAmount *= 0.95;
	ShakeX = noise(frameCount * 0.2) * ShakeAmount;
	ShakeY = noise((frameCount + 10000) * 0.2) * ShakeAmount;
	if (frameCount % 10 == 0) {
		frameRater = floor(frameRate());
	}
	if (!MainMenu) {
		spawnSpirits();
	}
	background(10);

	if (MainMenu) {
		//if(keyIsDown(Input.ENTER) || mouseIsPressed) {
		//	MainMenu = false;
		//}
		push();
		fill(100, 100, 100, 40);
		noStroke();
		rect(0, height / 5, 500, height / 5);
		pop();
		push();
		fill(255);
		stroke(255);
		textSize(100);
		textAlign(LEFT);
		text("DEEP DARK", width / 60, height / 3);
		pop();

		push();
		fill(100, 100, 100, 40);
		if (SelectedNumber == 0) {
			stroke(255, 0, 0);
			strokeWeight(3);
		} else {
			noStroke();
		}
		rectMode(CORNER);
		rect(0, height / 2, 350, height / 8);

		image(SinglePlayerIcon, 0, height / 2 - 25, 125, 125);
		pop();

		push();
		fill(100, 100, 100, 40);
		if (SelectedNumber == 1) {
			stroke(255, 0, 0);
			strokeWeight(3);
		} else {
			noStroke();
		}
		rectMode(CORNER);
		rect(0, height * 0.65, 350, height / 8);

		image(MultiplayerIcon, 0, height * 0.65 - 25, 125, 125);
		pop();

		push();
		fill(100, 100, 100, 40);
		if (SelectedNumber == 2) {
			stroke(255, 0, 0);
			strokeWeight(3);
		} else {
			noStroke();
		}
		rectMode(CORNER);
		rect(0, height * 0.8, 350, height / 8);
		fill(255);
		stroke(255);
		textSize(70);
		text("?", width / 60, height * 0.8 + 75);
		pop();

		if (ShowTutorial) {
			push();
			imageMode(CENTER);
			image(TutorialImage, width / 2, height / 2, 500, 500);
			pop()
		}
	}

	if (!MainMenu) {
		if (mouseIsPressed) {
			clicked = true;
		}
		if (playertwo == null) {

			cameraMovement(player.x - width / 2, player.y - height / 2);
		} else {
			cameraMovement(lerp(player.x, playertwo.x, 0.5) - width / 2, lerp(player.y, playertwo.y, 0.5) - height / 2);
		}
		drawTiles(Tiles);
		player.update();
		if (playertwo != null) {
			playertwo.update();
		}

		for (var s in Spirits) {
			Spirits[s].update(s);
		}

		if (LevelGuardian != null) {
			LevelGuardian.update();
		}

		for (var f in Fireballs) {
			Fireballs[f].update(f);
		}

		for (var p in ParticleSystems) {
			try {
				ParticleSystems[p].update(p);
			} catch {

			}
		}

		reverseCameraMovement();
	}
	image(vignette, 0, 0, width, height);
	if (!MainMenu) {
		fill(255);
		stroke(255);
		textSize(25);
		text("FPS: " + frameRater, 20, 20);
		//text("Monsters: " + str(Spirits.length), 20, 50);
		//text("ParticleSystems: " + str(ParticleSystems.length), 20, 80);

		drawPlayerHealth();
		clicked = false;
	}
}


function cameraMovement(x, y) {
	camX = lerp(camX, x, 0.1);
	camY = lerp(camY, y, 0.1);
	translate(-camX - ShakeX, -camY - ShakeY);
}

function reverseCameraMovement() {
	translate(camX + ShakeX, camY + ShakeY);
}

function spawnSpirits() {
	if (frameCount % SpiritFrequency == 0 || frameCount == 5 && LevelGuardian == null) {
		if (Spirits.length < 7) {
			if (playertwo == null) Spirits.push(new Spirit(constrain(player.x + random(-TileSize * 15, TileSize * 15), TileSize * 3, (MapSize - 1) * TileSize), constrain(player.y + random(-TileSize * 15, TileSize * 15), TileSize * 3, (MapSize - 1) * TileSize), 1));
			else {
				if (random(1) > 0.5) {
					Spirits.push(new Spirit(constrain(player.x + random(-TileSize * 15, TileSize * 15), TileSize * 3, (MapSize - 1) * TileSize), constrain(player.y + random(-TileSize * 15, TileSize * 15), TileSize * 3, (MapSize - 1) * TileSize), 1));

				} else {
					Spirits.push(new Spirit(constrain(player.x + random(-TileSize * 15, TileSize * 15), TileSize * 3, (MapSize - 1) * TileSize), constrain(player.y + random(-TileSize * 15, TileSize * 15), TileSize * 3, (MapSize - 1) * TileSize), 2));
				}
			}
		}
	}
}

function summonGuardian(x, y) {
	LevelGuardian = new Guardian(x, y);
}

function drawPlayerHealth() {
	push();
	fill(255, 0, 0);
	stroke(255, 0, 0);
	text("P1", 20, height - 15);
	pop();
	for (var i = 0; i < player.hp; i++) {
		var y = height - 50;
		var x = 40 + (i * 40);

		push();
		translate(x, y);
		image(BloodRune, 0, 0, 50, 50);

		pop();
	}

	for (var j = 0; j < player.summon; j++) {
		var y = height - 50;
		var x = (20 + (j * 40)) + (20 + (player.hp * 40)) + 20;

		push();
		translate(x, y);
		image(SummonRune, 0, 0, 50, 50);

		pop();
	}

	if (playertwo != null) {
		push();
		fill(0, 0, 255);
		stroke(0, 0, 255);
		text("P2", 20, height - 65);
		pop();
		for (var i = 0; i < playertwo.hp; i++) {
			var y = height - 100;
			var x = 40 + (i * 40);

			push();
			translate(x, y);
			image(BloodRune, 0, 0, 50, 50);

			pop();
		}

		for (var j = 0; j < playertwo.summon; j++) {
			var y = height - 100;
			var x = (20 + (j * 40)) + (20 + (player.hp * 40)) + 20;

			push();
			translate(x, y);
			image(SummonRune, 0, 0, 50, 50);

			pop();
		}
	}
}

function NextLevel() {
	Tiles = createGrid(MapSize, MapSize, 0);
	generateMap(Tiles);
	Builder = new MazeBuilder(MapSize, MapSize);
	Tiles = Builder.maze;
	player.x = 100;
	player.y = 100;
	player.hp = max(player.hp, 5);
	if (playertwo != null) {
		playertwo.x = 120;
		playertwo.y = 120;
		playertwo.hp = max(playertwo.hp, 5);
	}
	Spirits = [];
	Fireballs = [];
	LevelGuardian = null;
	for (var i = 0; i < MapSize; i++) {
		for (var j = 0; j < MapSize; j++) {
			if (Tiles[i][j] == 0) {
				if (random(100) > 90) {
					Tiles[i][j] = round(random(2, 4));
				}
			}

		}
	}

	ParticleSystems = [];
}

function keyPressed() {
	if (keyIsDown(Input.DOWNARROW)) {
		SelectedNumber++;
		if (SelectedNumber > 2) {
			SelectedNumber = 0;
		}
	}

	if (keyIsDown(Input.UPARROW)) {
		SelectedNumber--;
		if (SelectedNumber < 0) {
			SelectedNumber = 2;
		}
	}

	if (keyIsDown(Input.ENTER) && MainMenu) {
		if (SelectedNumber == 0) {
			MainMenu = false;
		}
		if (SelectedNumber == 1) {
			MainMenu = false;
			playertwo = new Player(120, 120);
			playertwo.arrowKeys = true;
		}
		if (SelectedNumber == 2) {
			ShowTutorial = true;
		}
	}

	if (SelectedNumber != 2) {
		ShowTutorial = false;
	}
}