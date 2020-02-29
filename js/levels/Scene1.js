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

    this.load.audio('title music', 'assets/audio/mainmenu.mp3');

  }
  create() {
    this.add.image(720, 300, 'bg');
    this.add.image(720, 300, 'title');

    this.sound.pauseOnBlur = false;
    this.sound.play('title music', {
      loop: true
    })

    const helloButton = this.add.image(710, 500, 'start');
    helloButton.setInteractive();
    helloButton.on('pointerdown', () => { 
      this.scene.start("playGame1");
    });
  }
}

