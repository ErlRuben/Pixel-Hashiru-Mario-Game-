
class SceneDeath extends Phaser.Scene {
  constructor() {
    super("deathGame");
  }
  preload() {
    
    // menu background
    this.load.image('bg', 'assets/images/mainbg.png');
    this.load.image('hart', 'assets/images/pepol.png');
    // game name
    this.load.image('title', 'assets/images/title.png');
    this.load.image('start', 'assets/images/start.png');
    this.load.audio('deatt', 'assets/audio/death.mp3');
    this.load.audio('over', 'assets/audio/gameover.mp3');

  }
  create() {
   
    this.add.image(720, 300, 'bg');
    this.add.image(665, 450, 'hart');

    this.add.text(690, 440,'X ' + lives, {
      fontSize: '30px',
      fill: '#ffffff'
    })
    this.add.text(470, 300,'You DIED', {
      fontSize: '100px',
      fontStyle: 'bold',
      fill: '#ffffff'
    })

    this.sound.play('deatt', {
      loop:false
    })
    
    const retry = this.add.text(600, 500, 'Retry',{
      fontSize: '70px',
      fontStyle: 'bold',
      fill: '#ffffff'
    });
    retry.setInteractive();
    retry.on('pointerdown', () => { 
      if (retry){
        
        this.scene.start("bootGame");
      }
      
    });
  }
}

