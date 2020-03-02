var config = {
    type: Phaser.AUTO,
      width: 1400,
      height: 768,
      physics: {
          default: 'arcade',
          arcade: {
              gravity: {y: 500},
              debug: false
          }
      },
    scene: [Scene3, Scene4]
  }
  
  
  var game = new Phaser.Game(config);
  