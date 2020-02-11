class Scene2 extends Phaser.Scene {
  constructor() {
    super('playGame');
  }

  create() {
    //------------------------------------------------------//
    //-------- putting the backgroung in the secne----------//
    //------------------------------------------------------//
    this.Background = this.add.tileSprite(
      0,
      0,
      config.width,
      config.height,
      'Background'
    );
    //------------------------------------------------------//
    //-------- set properties of the background ------------//
    //------------------------------------------------------//
    this.Background.setOrigin(0, 0);

    //// var nane ///sprit to scen //// x /////// y // sprit name
    this.explosion = this.add.sprite(config.width, 0, 'power-up');
    this.explosion = this.add.sprite(config.width, 0, 'explosion');
    this.ship = this.add.sprite(config.width / 2 - 100, 0, 'ship');
    this.ship1 = this.add.sprite(config.width / 2, 0, 'ship1');
    this.ship2 = this.add.sprite(config.width / 2, 0, 'ship2');

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
      })
    });

    ////////////////////////////////////////////////////////////////////

    this.anims.create({
      key: 'gray',
      frames: this.anims.generateFrameNumbers('power-up', {
        start: 2,
        end: 3
      })
    });

    //------------------------------------------------------------------//
    //---------------------- using physics------------------------------//
    //------------------------------------------------------------------//
    this.powerUps = this.physics.add.group();

    var maxObjects = 4;
    for (var i = 0; i <= maxObjects; i++) {
      var powerUp = this.physics.add.sprite(40, 40, 'power-up');
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(
        0,
        0,
        this.game.config.width,
        this.game.config.height
      );
    }

    // this.ship1 = this.add.image(config.width / 2, config.height / 2, 'ship1');

    //--------------------------------------------------------------//
    //--------- flipping and scaliing the sprites ------------------//
    //--------------------------------------------------------------//
    this.ship.play('ship_anim');
    this.ship1.play('ship1_anim');
    this.ship2.play('ship2_anim');
    //---------------------------------------------------------------//
    //----------make sprites interactive with the mouse -------------//
    //---------------------------------------------------------------//
    this.ship.setInteractive();
    this.ship1.setInteractive();
    this.ship2.setInteractive();

    //--------------------------------------------------------------//
    //------ Create the interactive Event and the call back --------//
    //--------------------------------------------------------------//

    this.input.on('gameobjectdown', this.destroyShip, this);

    this.ship1.flipY = true;
    this.ship2.flipY = true;

    this.ship.setScale(0.65);
    this.ship2.setScale(0.65);
    this.ship1.setScale(0.65);

    //--------------------------------------------------------------//
    //--------- Create a Text Name of the Scene --------------------//
    //--------------------------------------------------------------//
    this.add.text(20, 20, 'Playing Game', {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffffff',
      align: 'center',
      lineSpacing: 44
    });
  }

  //-------------------------------------------------------------------//
  //---------- a function to handel the event of destroy --------------//
  //-------------------------------------------------------------------//

  destroyShip(pointer, gameObject) {
    gameObject.setTexture('explosion');
    gameObject.play('expolode');
    this.explosion.setScale(1.2);
  }
  update() {
    //---------------------------------------------------------------//
    //-------- in the update we give moves to the sprites -----------//
    //---------------------------------------------------------------//
    this.movwShip(this.ship, 1);
    this.movwShip(this.ship1, 2);
    this.movwShip(this.ship2, 3);
    this.Background.tilePositionX -= 0.5;
  }

  //------------------------------------------------------------------//
  //-------- Controle the moves of the ships -------------------------//
  //------------------------------------------------------------------//
  movwShip(ship, speed) {
    if (ship.y > window.innerHeight) {
      ship.y = 0;
      ship.x = Phaser.Math.Between(
        this.ship.width,
        config.width - this.ship.width
      );
    }
    ship.y += speed;
  }
}
