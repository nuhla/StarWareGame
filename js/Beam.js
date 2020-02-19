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
  }
}
