class Beam extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    //-----------------------------------------------------------------------------------------//
    //------------- get the x, y from the player postion throw the secne parameter ------------//
    //-----------------------------------------------------------------------------------------//
    var x = scene.player.x;
    var y = scene.player.y;
    super(scene, x, y, 'beam');

    //---------------------------------------------------------------------//
    // --------- add the game object to the scene which is scen 2 ---------//
    //---------------------------------------------------------------------//
    scene.add.existing(this);

    //----------------------------------------------------------------------//
    //------- add animation and ohysics to the beam ------------------------//
    //----------------------------------------------------------------------//

    this.play('fire_anim');
    scene.physics.world.enableBody(this);
    this.body.velocity.y = -300;
  }

  update() {
    if (this.y < 50 || this.y > config.height - 50) {
      this.destroy();
    }
  }
}
