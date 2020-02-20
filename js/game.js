var config = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x000000,
  scene: [Scene1, Scene2],
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
      // gravity: { y: 50 }
    }
  }
};

var game = new this.Phaser.Game(config);

var gameSettings = {
  playerSpeed: 150
};
