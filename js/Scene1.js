class Scene1 extends Phaser.Scene {
  constructor() {
    super('bootGame');
  }

  preload() {
    this.load.image('Background', '../imges/2ef.gif');

    this.load.spritesheet('power-up', '../imges/power-up.png', {
      frameWidth: 80,
      frameHeight: 80
    });

    this.load.spritesheet('explosion', '../imges/explosion.png', {
      frameWidth: 40,
      frameHeight: 40
    });

    this.load.spritesheet('ship', '../imges/ship41.png', {
      frameWidth: 100,
      frameHeight: 100
    });

    this.load.spritesheet('ship', '../imges/ship41.png', {
      frameWidth: 100,
      frameHeight: 100
    });

    this.load.spritesheet('ship1', '../imges/ship51.png', {
      frameWidth: 112,
      frameHeight: 100
    });

    this.load.spritesheet('ship2', '../imges/ship61.png', {
      frameWidth: 112,
      frameHeight: 100
    });
    // this.load.image('ship1', '../imges/ship51.png');
    // this.load.image('ship2', '../imges/ship61.png');
  }

  create() {
    this.add.text(20, 20, 'Loading Game .....');

    this.scene.start('playGame');
  }
}
