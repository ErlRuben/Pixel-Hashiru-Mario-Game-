var map;
var player;
var cursors;
var groundLayer, coinLayer, next, waterLayer;
var text;
var coin;
var textt;
var mario;
var world;
var worldd;
var timee;
var timeee;
var tim;
var deathText;

var highscore;
var score = 0;
var highScore = 0;
var hscore = score * 10;
class Scene2 extends Phaser.Scene{
  constructor(){
    super("playGame1");
    // this function will be called when the player touches a coin

  }
  preload() {
      
      // map made with Tiled in JSON format
      this.load.tilemapTiledJSON('map', 'assets/maps/map1.json');
      // tiles in spritesheet 
      this.load.spritesheet('tiles', 'assets/images/tiles.png', {frameWidth: 50, frameHeight: 50});
      // simple coin image
      this.load.image('coin', 'assets/images/coinGold.png');

      this.load.image('water', 'assets/images/water.png');

      // player animations
      this.load.atlas('player', 'assets/sprites/player.png', 'assets/sprites/player.json');
      // alert box
      //this.load.image('next', 'assets/images/polee.png');
      this.load.audio('jump', 'assets/audio/jump.mp3');
      this.load.audio('collectcoins', 'assets/audio/collectcoins.mp3');
      this.load.audio('deat', 'assets/audio/death.mp3');


  }
  create() {
    // load the map 
    map = this.make.tilemap({key: 'map'});


    // tiles for the ground layer
    var groundTiles = map.addTilesetImage('tiles');
    // create the ground layer
    groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
    // the player will collide with this layer
    groundLayer.setCollisionByExclusion([-1]);

    // coin image used as tileset
    var coinTiles = map.addTilesetImage('coin');
    var waterTiles = map.addTilesetImage('water');
    // add coins as tiles
    coinLayer = map.createDynamicLayer('Coins', coinTiles, 0, 0);
    waterLayer = map.createDynamicLayer('water', waterTiles, 0, 0);
    // alert boxes
    /*var portal = map.addTilesetImage('next');
    // add alert boxes
    next = map.createDynamicLayer('next', portal, 0, 0);*/


    // set the boundaries of our game world
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;

    // create the player sprite    
    player = this.physics.add.sprite(200, 800, 'player');
    player.setBounce(0.01); // our player will bounce from items
    player.setCollideWorldBounds(true); // don't go out of the map    
    
    // small fix to our player images, we resize the physics body object slightly
    player.body.setSize(player.width, player.height-8);
    
    // player will collide with the level tiles 
    this.physics.add.collider(groundLayer, player);


    coinLayer.setTileIndexCallback(17, collectCoin, this);
    waterLayer.setTileIndexCallback(19, waterdeath, this);

    // when the player overlaps with a tile with index 17, collectCoin 
    // will be called    
    this.physics.add.overlap(player, coinLayer);
    this.physics.add.overlap(player, waterLayer);
    /*next.setTileIndexCallback(17, nextLevel, this);
    // when the player overlaps with a tile with index 17, collectCoin 
    // will be called    
    this.physics.add.overlap(player, next);*/

    // player walk animation
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 1, end: 11, zeroPad: 2}),
        frameRate: 10,
        repeat: -1
    });
    // idle with only one frame, so repeat is not neaded
    this.anims.create({
        key: 'idle',
        frames: [{key: 'player', frame: 'p1_stand'}],
        frameRate: 10,
    });


    cursors = this.input.keyboard.createCursorKeys();
    coin = this.add.image(450, 100, 'coin');

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(player);

    // set background color, so the sky is not black    
    this.cameras.main.setBackgroundColor('#ccccff');

    // this text will show the score
    mario = this.add.text(50, 20,'PIXEL HASHIRU', {
      fontSize: '40px',
      fill: '#ffffff'
    });
    highscore = this.add.text(50, 70,'0', {
      fontSize: '50px',
      fill: '#ffffff'
    });
    textt = this.add.text(490, 80,'X', {
      fontSize: '50px',
      fill: '#ffffff'
    });
    text = this.add.text(540, 80,'0', {
        fontSize: '50px',
        fill: '#ffffff'
    });
    world = this.add.text(835, 20,'WORLD', {
      fontSize: '40px',
      fill: '#ffffff'
    });
    worldd = this.add.text(820, 80,'1 - 1', {
      fontSize: '50px',
      fill: '#ffffff'
    });

    timee = this.add.text(1180, 20,'TIME', {
      fontSize: '40px',
      fill: '#ffffff'
    });

    timeee = this.add.text(1182, 80,'0', {
      fontSize: '50px',
      fill: '#ffffff'
    });
   
    // fix the text to the camera
    mario.setScrollFactor(0);
    highscore.setScrollFactor(0);

    coin.setScrollFactor(0);
    textt.setScrollFactor(0);
    text.setScrollFactor(0);

    world.setScrollFactor(0);
    worldd.setScrollFactor(0);

    timee.setScrollFactor(0);
    timeee.setScrollFactor(0);
  
  }
  update(time, delta) {
    if (cursors.left.isDown)
    {
        player.body.setVelocityX(-200);
        player.anims.play('walk', true); // walk left
        player.flipX = true; // flip the sprite to the left
    }
    else if (cursors.right.isDown)
    {
        player.body.setVelocityX(200);
        player.anims.play('walk', true);
        player.flipX = false; // use the original sprite looking to the right
    } else {
        player.body.setVelocityX(0);
        player.anims.play('idle', true);
    }
    // jump 
    if (cursors.up.isDown && player.body.onFloor())
    {
        player.body.setVelocityY(-550);       
        this.sound.play('jump', {
          loop:false
        }) 
    }
    tim =+ Math.round(time / 200  );
    timeee.setText(tim);
    player.update(time);
  }

}
function collectCoin(sprite, tile) {

  coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
  //hscore += 100;
  score++; // add 10 points to the score
 
  highscore.setText(score * 100)

  //if time == 300 gameover
  text.setText(score); 
  // set the text to show the current score
  
  /*if (highScore < score) {
   
      highScore = score;
  }*/
  this.sound.play('collectcoins', {
    loop:false
  }) 
  return false;
}
function waterdeath(sprite, tile) {
  //player.body.setVelocityY(-550); 
  player.disableBody(true, false);
  this.sound.play('deat', {
    loop:false
  }) 
  return false;
}

/*function death(sprite, tile) {
  player.removeTileAt(tile.x, tile.y)
  deathText.setText('Dead! Your Score ' + highscore);
}


function nextLevel(sprite, tile) {
  this.scene.start('playGame1');

  next.removeTileAt(tile.x, tile.y);
  return false;
}*/
