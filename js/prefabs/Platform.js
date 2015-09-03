var Runner = Runner || {}

Runner.Platform = function(game, floorPool, numTiles, x, y) {
	Phaser.Group.call(this, game);

	this.tileSize = 40;
	this.game = game;
	this.enableBody = true;
	this.floorPool = floorPool;
	this.prepare(numTiles, x, y);

};

Runner.Platform.prototype = Object.create(Phaser.Group.prototype);
Runner.Platform.prototype.constructor = Runner.Platform;

Runner.Platform.prototype.prepare = function(numTiles, x, y) {

	var i = 0;
	while(i < numTiles) {
		var floorTile = this.floorPool.getFirstExists(false);

		if (!floorTile) {
			floorTile = new Phaser.Sprite(this.game, x + i * this.tileSize, y, 'floor');
		} else {
			floorTile.reset(x + i * this.tileSize, y);
		}

		this.add(floorTile);
		i++;
	}

	//set physics
	this.setAll('body.immovable', true);
	this.setAll('body.allowGravity', false);
}