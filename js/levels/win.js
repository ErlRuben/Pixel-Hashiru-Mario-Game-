class win extends Phaser.Scene {
    constructor() {
      super("win");
    }
    preload() {
      
      // menu background
      this.load.image('bg', 'assets/images/mainbg.png');
      this.load.image('hart', 'assets/images/pepol.png');
      // game name
      this.load.image('title', 'assets/images/title.png');
      this.load.image('start', 'assets/images/start.png');
   
  
    }
    create() {
     
      this.add.image(720, 300, 'bg');
  
      this.add.text(470, 300,'You Win', {
        fontSize: '100px',
        fontStyle: 'bold',
        fill: '#ffffff'
      });
  

      const retry = this.add.text(600, 500, 'Retry',{
        fontSize: '70px',
        fontStyle: 'bold',
        fill: '#ffffff'
      });
      retry.setInteractive();
      retry.on('pointerdown', () => {
        this.scene.start("bootGame");
      });
    }
  }
  
  