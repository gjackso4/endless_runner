var Runner = Runner || {}

Runner.GameState = {
	init: function() {

		//pool of floors
		this.floorPool = this.add.group();

		this.game.physics.arcade.gravity.y = 1000;

		//max jumping distance
		this.maxJump = 120;

		//Move player with up key
		this.cursors = this.game.input.keyboard.createCursorKeys();

		this.myCoins = 0;
	},

	create: function(){

		//create player
		this.player = this.add.sprite(50, 50, 'player');
		this.player.anchor.setTo(0.5);
		this.player.animations.add('running', [0,1,2,3,2,1], 15, true);
		this.game.physics.arcade.enable(this.player);

		this.player.body.setSize(38,60, 0, 0);
		this.player.play('running');

		this.platform = new Runner.Platform(this.game,this.floorPool, 12, 0, 500);
		this.add.existing(this.platform);
	},

	update: function(){
		this.game.physics.arcade.collide(this.player, this.platform);

		if(this.cursors.up.isDown || this.game.input.activePointer.isDown) {
			this.playerJump();
		} else if (this.cursors.up.isUp || this.game.input.activePointer.isUp) {
			this.isJumping = false;
		} 
	}, 
	playerJump: function() {
		if (this.player.body.touching.down) {
			//starting point of jump
			this.startJump = this.player.y;
			this.isJumping = true;
			this.jumpPeak = false;
		
			this.player.body.velocity.y = -300;
		} else if (this.isJumping && !this.jumpPeak) {
			var distanceJumped = this.startJump - this.player.y;

			if(distanceJumped <= this.maxJump) {
				this.player.body.velocity.y = -300;
			} else {
				this.jumpPeak = true;
			}
		}
	},

	render: function() {
		// this.game.debug.body(this.player);
		this.game.debug.bodyInfo(this.player, 0, 10);
	}
};