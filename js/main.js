var Runner = Runner || {};

//Start the FrameWork
Runner.game = new Phaser.Game('100%', '100%', Phaser.AUTO);

Runner.game.state.add('Boot', Runner.BootState);
Runner.game.state.add('Preload', Runner.PreloadState);
Runner.game.state.add('Game', Runner.GameState);

Runner.game.state.start('Boot');