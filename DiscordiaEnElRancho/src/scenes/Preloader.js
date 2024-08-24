import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'fondo');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0x7FFF00);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.image("fondo", "./public/assets/fondo.png");
        this.load.image("cultivo", "./public/assets/cultivo.png");
        this.load.spritesheet("jugador1", "./public/assets/jugador1.png", {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("jugador2", "./public/assets/jugador2.png", {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("jugador1Ataca", "./public/assets/jugador1Ataque.png", {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("jugador2Ataca", "./public/assets/jugador2Ataque.png", {frameWidth: 64, frameHeight: 64});
    
        
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
