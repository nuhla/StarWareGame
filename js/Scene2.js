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

    this.ship = this.add.image(
      config.width / 2 - 100,
      config.height / 2,
      'ship'
    );

    this.ship1 = this.add.image(config.width / 2, config.height / 2, 'ship1');

    this.ship3 = this.add.image(
      config.width / 2 + 100,
      config.height / 2,
      'ship2'
    );
    //--------------------------------------------------------------//
    //--------- flipping and scaliing the sprites ------------------//
    //--------------------------------------------------------------//
    this.ship.flipY = true;
    this.ship1.flipY = true;
    this.ship3.flipY = true;

    this.ship.setScale(0.2);
    this.ship3.setScale(0.2);
    this.ship1.setScale(0.2);

    this.add.text(20, 20, 'Playing Game', {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffffff',
      align: 'center',
      lineSpacing: 44
    });
  }
  update() {
    //---------------------------------------------------------------//
    //-------- in the update we give moves to the sprites -----------//
    //---------------------------------------------------------------//
    this.movwShip(this.ship, 1);
    this.movwShip(this.ship1, 2);
    this.movwShip(this.ship3, 3);
    this.Background.tilePositionX -= 0.5;
  }

  //------------------------------------------------------------------//
  //-------- Controle the moves of the ships -------------------------//
  //------------------------------------------------------------------//
  movwShip(ship, speed) {
    if (ship.y > window.innerHeight) {
      ship.y = 0;
      ship.x = Phaser.Math.Between(0, config.width);
    }
    ship.y += speed;
  }
}
