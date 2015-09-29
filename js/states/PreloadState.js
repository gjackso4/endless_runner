var Runner = Runner || {}

Runner.PreloadState = {
	preload: function() {
		this.preloadbar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');

		this.preloadbar.anchor.setTo(0.5);
		this.preloadbar.scale.setTo(1);

		this.load.setPreloadSprite(this.preloadbar);

		this.load.image('playerDead', 'assets/images/player_dead.png');
		this.load.image('floor', 'assets/images/floor.png');
		this.load.image('water', 'assets/images/water.png');
		this.load.image('coin', 'assets/images/coin.png');
		this.load.image('background', 'assets/images/background.png');
		this.load.spritesheet('player', 'assets/images/player_spritesheet2.png', 51, 67, 5, 2, 3);
		this.load.audio('coin', ['assets/audio/coin.mp3','assets/audio/coin.ogg']);
	},
	create: function() {
		this.state.start('Game');
	}
};