var helaaa;
class SceneDeath extends Phaser.Scene {
  constructor() {
    super("deathGame");
  }
  preload() {
    
    // menu background
    this.load.image('bg', 'assets/images/mainbg.png');
    // game name
    this.load.image('title', 'assets/images/title.png');
    this.load.image('start', 'assets/images/start.png');
    this.load.audio('dad', 'assets/audio/powerup.mp3');

  }
  create() {
   
    this.add.image(720, 300, 'bg');


    this.add.text(470, 300,'You DIED', {
      fontSize: '100px',
      fontStyle: 'bold',
      fill: '#ffffff'
    })

    helaaa = this.sound.play('dad', {
      loop:true
    })

    const retry = this.add.image(710, 500, 'start');
    retry.setInteractive();
    retry.on('pointerdown', () => { 
      this.scene.start("bootGame");
    });
  }
}

