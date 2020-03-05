var config = {
  type: Phaser.AUTO,
    width: 1400,
    height: 768,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 1000},
            debug: false
        }
    },
  scene: [Scene1, Scene2, SceneDeath]
}


var game = new Phaser.Game(config);
var map, map2;
var player, player2;
var cursors;
var groundLayer, coinLayer, next, waterLayer, groundLayer2, coinLayer2, next2, waterLayer2;
var text;
var coin, coin2;
var textt;
var pepol;
var mario;
var world;
var worldd;
var timee;
var timeee;
var livesText;
//var lifeLostText;

var tim;
var deathText;
var highscore;
var score = 0;
var highScore = 0;
var hscore = score * 10;
var lives = 3;

