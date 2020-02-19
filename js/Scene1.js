class Scene1 extends Phaser.Scene {
  constructor() {
    super('bootGame');
  }

  preload() {
    this.load.image('Background', '../imges/2ef.gif');

    this.load.spritesheet('player', '../imges/player.png', {
      frameWidth: 100,
      frameHeight: 100
    });

    this.load.spritesheet('power-up', '../imges/power-up.png', {
      frameWidth: 30,
      frameHeight: 30
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

    //-----------------------------------------------------//
    //------- Create SpreadSheet Anim ---------------------//
    //----------------------------------------------------//
    this.anims.create({
      key: 'expolode',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 20,
      repeat: 0, //---------- just once ----------------//
      hideOnComplete: true //--- disapear when finish --//
    });

    //////////////////////////////////////////////////////////////////
    this.anims.create({
      key: 'ship_anim', //--------animation name----------//
      frames: this.anims.generateFrameNumbers('ship'),
      frameRate: 20,
      repeat: -1 //--------------repeation ---------------//
    });

    ///////////////////////////////////////////////////////////////////
    this.anims.create({
      key: 'ship1_anim',
      frames: this.anims.generateFrameNumbers('ship1'),
      frameRate: 20,
      repeat: -1
    });

    ///////////////////////////////////////////////////////////////////
    this.anims.create({
      key: 'ship2_anim',
      frames: this.anims.generateFrameNumbers('ship2'),
      frameRate: 20,
      repeat: -1
    });

    ////////////////////////////////////////////////////////////////////
    this.anims.create({
      key: 'red',
      frames: this.anims.generateFrameNumbers('power-up', {
        start: 0,
        end: 1
      }),
      frameRate: 8,
      repeat: -1
    });

    ////////////////////////////////////////////////////////////////////

    this.anims.create({
      key: 'gray',
      frames: this.anims.generateFrameNumbers('power-up', {
        start: 2,
        end: 3
      }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'thrust',
      frames: this.anims.generateFrameNumbers('player'),
      frameRate: 20,
      repeat: -1
    });
  }
}
