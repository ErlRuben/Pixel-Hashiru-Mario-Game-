var mapp;
var playerr;
var cursorss;
var groundLayerr, coinLayerr, nextt, waterLayerr;
var textttt;
var coinn;
var texttttt;
var marioo;
var worlddd;
var worldddd;
var timeeee;
var timeeeee;
var timm;
var deathTextt;

var highscoree;
var scoree = 0;
var highScoree = 0;
var hscoree = scoree * 10;
class Scene3 extends Phaser.Scene{
  constructor(){
    super("playGame");
    // this function will be called when the player touches a coin

  }
  preload() {
      
      // map made with Tiled in JSON format
      this.load.tilemapTiledJSON('mapp', 'assets/maps/map2.json');
      // tiles in spritesheet 
      this.load.spritesheet('tiless', 'assets/images/tiles.png', {frameWidth: 50, frameHeight: 50});
      // simple coin image
      this.load.image('coinn', 'assets/images/coinGold.png');

      this.load.image('waterr', 'assets/images/water.png');

      // player animations
      this.load.atlas('playerr', 'assets/sprites/player.png', 'assets/sprites/player.json');
      // alert box
      this.load.image('poleee', 'assets/images/polee.png');
      this.load.audio('jumpp', 'assets/audio/jump.mp3');
      this.load.audio('collectcoinss', 'assets/audio/collectcoins.mp3');
      this.load.audio('deatt', 'assets/audio/death.mp3');


  }
  create() {
    this.add.image(720, 300, 'coinn');
    mapp = this.make.tilemap({key: 'mapp'});


    // tiles for the ground layer
    var groundTiless = mapp.addTilesetImage('tiless');
    // create the ground layer
    groundLayerr = mapp.createDynamicLayer('World', groundTiless, 0, 0);
    // the player will collide with this layer
    groundLayerr.setCollisionByExclusion([-1]);

    // coin image used as tileset
    var coinTiless = mapp.addTilesetImage('coinn');
    var waterTiless = mapp.addTilesetImage('waterr');
    // add coins as tiles
    coinLayerr = mapp.createDynamicLayer('Coins', coinTiless, 0, 0);
    waterLayerr = mapp.createDynamicLayer('water', waterTiless, 0, 0);
    // alert boxes
    var portall = mapp.addTilesetImage('poleee');
    // add alert boxes
    nextt = mapp.createDynamicLayer('next', portall, 0, 0);


    // set the boundaries of our game world
    this.physics.world.bounds.width = groundLayerr.width;
    this.physics.world.bounds.height = groundLayerr.height;

    // create the player sprite    
    playerr = this.physics.add.sprite(200, 800, 'playerr');
    playerr.setBounce(0.01 ); // our player will bounce from items
    playerr.setCollideWorldBounds(true); // don't go out of the map    
    
    // small fix to our player images, we resize the physics body object slightly
    playerr.body.setSize(playerr.width, playerr.height-8);
    
    // player will collide with the level tiles 
    this.physics.add.collider(groundLayerr, playerr);


    coinLayerr.setTileIndexCallback(17, collectCoinn, this);
    waterLayerr.setTileIndexCallback(19, waterdeathh, this);

    // when the player overlaps with a tile with index 17, collectCoin 
    // will be called    
    this.physics.add.overlap(playerr, coinLayerr);
    this.physics.add.overlap(playerr, waterLayerr);

    nextt.setTileIndexCallback(18, nextLevell, this);
    // when the player overlaps with a tile with index 18, nextLevel 
    // will be called    
    this.physics.add.overlap(playerr, nextt);

    // player walk animation
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNames('playerr', {prefix: 'p1_walk', start: 1, end: 11, zeroPad: 2}),
        frameRate: 10,
        repeat: -1
    });
    // idle with only one frame, so repeat is not neaded
    this.anims.create({
        key: 'idle',
        frames: [{key: 'playerr', frame: 'p1_stand'}],
        frameRate: 10,
    });


    cursorss = this.input.keyboard.createCursorKeys();
    coinn = this.add.image(450, 100, 'coinn');
    //this.debug.cameraInfo(this.camera, 500, 32);
    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, mapp.widthInPixels, mapp.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(playerr);

    // set background color, so the sky is not black    
    this.cameras.main.setBackgroundColor('#ccccff');
    marioo = this.add.text(50, 20,'PIXEL HASHIRU', {
      fontSize: '40px',
      fill: '#ffffff'
    });
    highscoree = this.add.text(50, 70,'0', {
      fontSize: '50px',
      fill: '#ffffff'
    });
    texttttt = this.add.text(490, 80,'X', {
      fontSize: '50px',
      fill: '#ffffff'
    });
    textttt = this.add.text(540, 80,'0', {
        fontSize: '50px',
        fill: '#ffffff'
    });
    worlddd = this.add.text(835, 20,'WORLD', {
      fontSize: '40px',
      fill: '#ffffff'
    });
    worldddd = this.add.text(820, 80,'1 - 1', {
      fontSize: '50px',
      fill: '#ffffff'
    });

    timeeee = this.add.text(1180, 20,'TIME', {
      fontSize: '40px',
      fill: '#ffffff'
    });

    timeeeee = this.add.text(1182, 80,'0', {
      fontSize: '50px',
      fill: '#ffffff'
    });
   
    // fix the text to the camera
    marioo.setScrollFactor(0);
    highscoree.setScrollFactor(0);

    coinn.setScrollFactor(0);
    texttttt.setScrollFactor(0);
    textttt.setScrollFactor(0);

    worlddd.setScrollFactor(0);
    worldddd.setScrollFactor(0);

    timeeee.setScrollFactor(0);
    timeeeee.setScrollFactor(0);
  }
  update(time, delta) {
    if (cursorss.left.isDown)
    {
        playerr.body.setVelocityX(-250);
        playerr.anims.play('walk', true); // walk left
        playerr.flipX = true; // flip the sprite to the left
    }
    else if (cursorss.right.isDown)
    {
        playerr.body.setVelocityX(250);
        playerr.anims.play('walk', true);
        playerr.flipX = false; // use the original sprite looking to the right
    } else {
        playerr.body.setVelocityX(0);
        playerr.anims.play('idle', true);
    }
    // jump 
    if (cursorss.up.isDown && playerr.body.onFloor())
    {
        playerr.body.setVelocityY(-800);       
        this.sound.play('jump', {
          loop:false
        }) 
    }
    timm =+ Math.round(time / 200  );
    timeeee.setText(timm);
    playerr.update(time);
  }
}
  function collectCoinn(sprite, tile) {

    coinLayerr.removeTileAt(tile.x, tile.y); // remove the tile/coin
    //hscore += 100;
    scoree++; // add 10 points to the score
   
    highscoree.setText(scoree * 100)
  
    //if time == 300 gameover
    textt.setText(scoree); 
    // set the text to show the current score
    
    /*if (highScore < score) {
     
        highScore = score;
    }*/
    this.sound.play('collectcoinss', {
      loop:false
    }) 
    return false;
  }
  function waterdeathh(sprite, tile) {
    this.scene.start('deathGame');
    //this.camera.flash(0x00ff00, 500);
    //this.camera.shake(0.02, 250, true, Phaser.Camera.SHAKE_VERTICAL);
    //player.body.setVelocityY(-550); 
    playerr.disableBody(true, false);
    this.sound.play('deatt', {
      loop:false
    }) 
    return false;
  }
  
  function death(sprite) {
    deathTextt.setText('Dead! Your Score ' + highscoree);
  }
  
  // Next Scene Function
  function nextLevell(sprite) {
    this.scene.start('bootGame');
    return false;
  }
  
