function drawTiles(tiles) {
	for (var i = constrain(floor(camX / TileSize), 0, TileSize * (MapSize - 1)); i < constrain(floor((camX + width + TileSize) / TileSize), 0, MapSize); i++) {
		for (
			var j = constrain(floor(camY / TileSize), 0, TileSize * (MapSize - 1)); j < constrain(floor((camY + height + TileSize) / TileSize), 0, MapSize); j++
		) {
			switch (tiles[i][j]) {

				case 0:
					break;
				case 1:
					var d = dist(player.x, player.y, i * TileSize, j * TileSize) / light;
					push();
					rectMode(CENTER);
					fill(150 - d);
					stroke(140 - d);
					translate(i * TileSize + TileSize / 2, j * TileSize + TileSize / 2);
					rect(0, 0, TileSize, TileSize);
					if(!SimpleGraphics) {
					rectMode(CORNER);

					rect(-TileSize / 2, -TileSize / 2, TileSize / 2, TileSize / 3);
					rect(0, -TileSize / 2, TileSize / 2, TileSize / 3);
					rect(-TileSize / 4, -TileSize / 6, TileSize / 2, TileSize / 3);
					rect(-TileSize / 2, TileSize / 6, TileSize / 2, TileSize / 3);
					rect(0, TileSize / 6, TileSize / 2, TileSize / 3);
					}
					pop();
					break;
				case 2: //Blood Rune
					push();
					rectMode(CENTER);
					fill(255, 0, 0);
					translate(i * TileSize + TileSize / 2, j * TileSize + TileSize / 2);
					//rect(0, 0, TileSize, TileSize);
					image(BloodRune, -TileSize / 2, -TileSize / 2, TileSize, TileSize);
					pop();
					break;
				case 3: //Fire Rune
					push();
					rectMode(CENTER);
					fill(255, 0, 0);
					translate(i * TileSize + TileSize / 2, j * TileSize + TileSize / 2);
					//rect(0, 0, TileSize, TileSize);
					image(LightningRune, -TileSize / 2, -TileSize / 2, TileSize, TileSize);
					pop();
					break;
				case 4: //Summon Rune
					push();
					rectMode(CENTER);
					fill(255, 0, 0);
					translate(i * TileSize + TileSize / 2, j * TileSize + TileSize / 2);
					//rect(0, 0, TileSize, TileSize);
					image(SummonRune, -TileSize / 2, -TileSize / 2, TileSize, TileSize);
					pop();
					break;
			}
		}
	}
}