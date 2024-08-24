import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

  
    create ()
    {
          // create game objects
        this.add.image(960, 540, "fondo");
      

        //cultivo
        this.cultivo = this.add.image(960,540,"cultivo")
        this.cultivo.setScale(0.5)

      //personaje 
      this.jugador1 = this.physics.add.sprite(900,500,"jugador1");
      this.jugador1.body.setAllowGravity(false);
      this.jugador1.setScale(2)

    // Crear la animación de caminar

    this.CreaAnimaciones('caminarabajo',0,5,10,-1)
    this.CreaAnimaciones('caminarizquierda',6,11,10,-1)
    this.CreaAnimaciones('caminarderecha',12,17,10,-1)
    this.CreaAnimaciones('caminararriva',18,23,10,-1)

      // Escuchar las teclas de dirección
      this.cursors = this.input.keyboard.createCursorKeys();
  }
    
    


   update() {
   
   ///mivimientojugador1
    if (this.cursors.down.isDown) {
      this.jugador1.setVelocityY(200);  // Mover a la izquierda
      this.jugador1.anims.play('caminarabajo', true);  // Reproducir animación
      } 
      else if (this.cursors.left.isDown) {
        this.jugador1.setVelocityX(-200);  // Mover a la izquierda
        this.jugador1.anims.play('caminarizquierda', true);  // Reproducir animación
        } 
      else if (this.cursors.right.isDown) {
        this.jugador1.setVelocityX(200);  // Mover a la izquierda
        this.jugador1.anims.play('caminarderecha', true);  // Reproducir animación
        } 
      else if (this.cursors.up.isDown) {
        this.jugador1.setVelocityY(-200);  // Mover a la izquierda
        this.jugador1.anims.play('caminararriva', true);  // Reproducir animación
      }
      else 
      {
        this.jugador1.setVelocity(0,0)

      }
      
  }

  CreaAnimaciones(clave, startframe,endframe,rate, repet) {
    this.anims.create({
      key: clave,  // Nombre de la animación
      frames: this.anims.generateFrameNumbers('jugador1', { start: startframe, end: endframe }),  // Rango de frames a usar
      frameRate: rate,  // Velocidad de la animación (frames por segundo)
      repeat: repet  // Repetir indefinidamente
      });
  }
}
