
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

    this.load.audio('music', 'assets/audio/mainmenu.mp3');

  }
  create() {
    this.add.image(720, 300, 'bg');
    this.add.image(720, 300, 'title');

    this.add.text( 100, 100, 'High Score: '+ highScore);

    this.sound.play('music', {
      loop:true
    })

    const helloButton = this.add.image(710, 500, 'start');
    helloButton.setInteractive();
    helloButton.on('pointerdown', () => { 
      this.scene.start("playGame1");
    });
  }
}

