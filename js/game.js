var config = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x000000,
  scene: [Scene1, Scene2],
  pixelArt: true,
  physics: {
    defualt: 'arcade',
    arcade: {
      debuge: false
    }
  }
};

var game = new this.Phaser.Game(config);
