class Scene1 extends Phaser.Scene {
  constructor() {
    super('bootGame');
  }

  preload() {
    this.load.image('Background', '../imges/2ef.gif');
    this.load.image('ship', '../imges/ship4.png');
    this.load.image('ship1', '../imges/ship5.png');
    this.load.image('ship2', '../imges/ship6.png');
  }

  create() {
    this.add.text(20, 20, 'Loading Game .....');

    this.scene.start('playGame');
  }
}
