
class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }
  preload() {
    
    // menu background
    this.load.image('bg', 'assets/images/mainbg.png');
    // game name
    this.load.image('title', 'assets/images/title.png');
    this.load.image('start', 'assets/images/start.png');
    this.load.audio('play', 'assets/audio/start.mp3');


  }
  create() {
    
    this.add.image(720, 300, 'bg');
    this.add.image(720, 300, 'title');

    

    const helloButton = this.add.image(710, 500, 'start');
    helloButton.setInteractive();
    helloButton.on('pointerdown', () => {  
      this.scene.start("playGame1");
      lives = 3;
    });
  }
}