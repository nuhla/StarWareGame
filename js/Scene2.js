class Scene2 extends Phaser.Scene {
  constructor() {
    super('playGame');
  }

  create() {
    //--------- A Score Vriable ----------------------------//
    this.score = 0;

    //-------------------------------------------------------//
    //------- creat a back ground to the score lable --------//
    //-------------------------------------------------------//
    var graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(config.width, 0);
    graphics.lineTo(config.width, 50);
    graphics.lineTo(0, 50);
    graphics.lineTo(0, 0);
    graphics.closePath();
    graphics.fillPath();

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

    this.player = this.physics.add.sprite(
      config.width / 2 - 8,
      config.height - 100,
      'player'
    );

    //-------------------- Creat Out Bitmap Text for score ----------------//
    this.scoreLable = this.add.bitmapText(20, 20, 'pixelFont', 'SCORE :', 40);
    //--------------------- creat a keys handling object ------------------//

    this.cursorKey = this.input.keyboard.createCursorKeys();

    //-------------------- create a space handling object -----------------//
    this.spacer = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.existing = this.add.group();
    //-------------- add a collidion to the palyer for the word -----------//
    this.player.setCollideWorldBounds(true);
    // this.player.setBounce(1);

    //---------------------------------------------------------------------//
    // var nane ///sprit to scen //// x /////// y // sprit name
    this.explosion = this.add.sprite(config.width, 0, 'explosion');
    this.ship = this.add.sprite(config.width / 2 - 100, 0, 'ship');
    this.ship1 = this.add.sprite(config.width / 2, 0, 'ship1');
    this.ship2 = this.add.sprite(config.width / 2, 0, 'ship2');

    //------------------------------------------------------------------//
    //---------------------- using physics------------------------------//
    //------------------------------------------------------------------//
    this.powerUps = this.physics.add.group();

    //--------------------------------------------------------//
    //-------------- Creat a group of power uo ---------------//
    //--------------------------------------------------------//
    var maxObjects = 4;
    for (var i = 0; i <= maxObjects; i++) {
      var powerUp = this.physics.add.sprite(30, 30, 'power-up');
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(
        0,
        0,
        this.game.config.width,
        this.game.config.height
      );

      if (Math.random() > 0.5) {
        powerUp.play('red');
      } else {
        powerUp.play('gray');
      }

      powerUp.setVelocity(Math.random() * 100, Math.random() * 100);
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(1);

      //-------------------------------------------------------//
      //----------- Enabling colider between ------------------//
      //----------------- pwoer up and beam--------------------//
      //-------------------------------------------------------//
      this.physics.add.collider(
        this.existing,
        this.powerUps,
        (existing, powerUp) => {
          existing.destroy();
          powerUp.destroy();
        }
      );
    }
    //-------------------------------------------------------//
    //----------- Enabling colider between ------------------//
    //----------------- player and beam----------------------//
    //-------------------------------------------------------//
    this.physics.add.overlap(
      this.player,
      this.powerUps,
      this.pickUpPower,
      null,
      this
    );
    //--------------------------------------------------------------//
    //--------- flipping and scaliing the sprites ------------------//
    //--------------------------------------------------------------//
    this.ship.play('ship_anim');
    this.ship1.play('ship1_anim');
    this.ship2.play('ship2_anim');
    this.player.play('thrust');
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
    this.player.setScale(0.85);

    //---------------------------------------------------------------//
    //--- create physics group  to the ships  and add ships to it ---//
    //---------------------------------------------------------------//

    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship);
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);

    //-----------------------------------------------------------------//
    //------- create an ovelerlaping between ships group and player----//
    //-----------------------------------------------------------------//

    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.hurtPlayer,
      null,
      this
    );

    //-----------------------------------------------------------------//
    //------- create an ovelerlaping between ships group and player----//
    //-----------------------------------------------------------------//

    this.physics.add.overlap(
      this.existing,
      this.enemies,
      this.crashEnimy,
      null,
      this
    );
  }

  //----------------------------------------------------------------------//
  //--------- coliding when overlaping between player --------------------//
  //--------------- and pwer-up ------------------------------------------//
  //----------------------------------------------------------------------//
  pickUpPower(player, powerUp) {
    powerUp.disableBody(true, true);
  }
  //-------------------------------------------------------------------//
  //---------- a function to handel the event of destroy --------------//
  //-------------------------------------------------------------------//

  destroyShip(pointer, gameObject) {
    //-----------------------------------------------------------------//
    //------- in this function we switch the sheet of the ship --------//
    //------ and insted we play the explotion anim in the same pos ----//
    //-----------------------------------------------------------------//
    gameObject.setTexture('explosion');
    gameObject.play('expolode');
    this.explosion.setScale(1.5);
  }

  //---------------------------------------------------------------------//
  //-------------- a function to handel the overlaping of ---------------//
  //-------------------- both player and an animy ship ------------------//
  //---------------------------------------------------------------------//
  hurtPlayer(player, enemies) {
    this.resetShipPos(enemies);
    player.x = config.width / 2 - 8;
    player.y = config.height - 64;
  }

  crashEnimy(existing, enemy) {
    this.resetShipPos(enemy);
    existing.destroy();
    this.score++;
  }

  resetShipPos(enmy) {
    enmy.x = Phaser.Math.Between(
      this.ship.width,
      config.width - this.ship.width
    );
    enmy.y = 0;
  }

  //----------------------------------------------------------------//
  //------- a function to controle player movment ------------------//
  //----------------------------------------------------------------//

  movePlayerManager() {
    //----------- detect the left arrow of the keyboard ------------//
    if (this.cursorKey.left.isDown) {
      this.player.setVelocityX(-gameSettings.playerSpeed);
    }

    //------------- detect the up arrow of the keyboard ------------//
    if (this.cursorKey.up.isDown) {
      this.player.setVelocityY(-gameSettings.playerSpeed);
    }

    //----------- detect the down arrow of the keyboard ------------//
    if (this.cursorKey.down.isDown) {
      this.player.setVelocityY(gameSettings.playerSpeed);
    }

    //----------- detect the Right arrow of the keyboard ----------//
    if (this.cursorKey.right.isDown) {
      this.player.setVelocityX(gameSettings.playerSpeed);
    }
  }

  update() {
    this.scoreLable.text = 'Score :' + this.score;
    //--------------------------------------------------------------//
    //---------- Update Player Movment due to keyboard -------------//
    //--------------------------------------------------------------//
    this.movePlayerManager();

    //----------- detect the space key of the keyboard -------------//
    if (Phaser.Input.Keyboard.JustDown(this.spacer)) {
      //------------------------------------------------------------//
      // ----- this function controles the shooting act ------------//
      //------------------------------------------------------------//
      this.shootBeam();
    }
    for (var i = 0; i < this.existing.getChildren().length; i++) {
      var beam = this.existing.getChildren()[i];
      beam.update();
    }
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
      //--------------------------------------------------------------//
      //----- between gives us a random number between tow ranges ----//
      //--------------------------------------------------------------//
      ship.x = Phaser.Math.Between(
        this.ship.width,
        config.width - this.ship.width
      );
    }
    ship.y += speed;
  }

  shootBeam() {
    //------------------------------------------------//
    //---- creat a new Object from the Beam class ----//
    //------------------------------------------------//
    this.existing.add(new Beam(this));
  }
}
