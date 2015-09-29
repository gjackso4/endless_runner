var Runner = Runner || {}

Runner.Platform = function(game, floorPool, numTiles, x, y, speed, coinsPool) {
	Phaser.Group.call(this, game);

	this.tileSize = 40;
	this.game = game;
	this.enableBody = true;
	this.floorPool = floorPool;
	this.coinsPool = coinsPool;
	this.prepare(numTiles, x, y, speed);
};

Runner.Platform.prototype = Object.create(Phaser.Group.prototype);
Runner.Platform.prototype.constructor = Runner.Platform;

Runner.Platform.prototype.prepare = function(numTiles, x, y, speed) {

	this.alive = true;

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
	this.setAll('body.velocity.x', speed);

	this.addCoins(speed);

};

Runner.Platform.prototype.kill = function() {
	this.alive = false;
	this.callAll('kill');

	var sprites = [];
	this.forEach(function(tile){
		sprites.push(tile);
	}, this);

	sprites.forEach(function(tile){
		this.floorPool.add(tile);
	}, this);
};

Runner.Platform.prototype.addCoins = function(speed) {
	var coinsY = 90 + Math.random() * 110;

	var hasCoin;
	this.forEach(function(tile){

	hasCoin = Math.random() <= 0.4;

		if(hasCoin) {
			var coin = this.coinsPool.getFirstExists(false);

		 	if(!coin) {
				coin = new Phaser.Sprite(this.game, tile.x, tile.y - coinsY, 'coin');
				this.coinsPool.add(coin);
			} else {
				coin.reset(tile.x, tile.y - coinsY);
			}

			coin.body.velocity.x = speed;
			coin.body.allowGravity = false;
		}
	}, this);
};