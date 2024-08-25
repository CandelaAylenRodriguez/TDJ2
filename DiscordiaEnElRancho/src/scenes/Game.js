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
        this.cultivo = this.physics.add.image(960,540,"cultivo")
        this.cultivo.setScale(0.5)
        this.cultivo.body.setImmovable(true);

      //personaje 
      this.jugador1 = this.physics.add.sprite(900,500,"jugador1");
      this.jugador1.setScale(4)
      this.jugador1.body.setSize(13,18,true)
      this.direccionapunta= "caminarabajo" 
      

    // Crear la animación de caminar

    this.CreaAnimaciones('caminarabajo',0,5,10,-1)
    this.CreaAnimaciones('caminarizquierda',8,13,10,-1)
    this.CreaAnimaciones('caminarderecha',16,21,10,-1)
    this.CreaAnimaciones('caminararriva',24,29,10,-1)

    this.CreaAnimaciones("ataqueAbajo",32,39,10,0)
    this.CreaAnimaciones("ataqueIzquierda",40,47,10,0)
    this.CreaAnimaciones("ataquederecha",48,55,10,0)
    this.CreaAnimaciones("ataqueArriva",56,63,10,0)
    this.jugador1.anims.play(this.direccionapunta, true); 

    this.CreaAnimaciones("iddle",32,34,5,-1)

      this.grupoenemigos= this.physics.add.group()

      this.time.addEvent({ // crea un evento que llama al metodo generar enemigo cada un segundo para que cree un enemigo
        delay: 2000, // Cada 2 segundo
        callback: this.generarEnemigo,
        callbackScope: this,
        loop: true
    });

      // Escuchar las teclas de dirección
      this.cursors = this.input.keyboard.createCursorKeys();
      this.physics.add.collider(this.cultivo,this.grupoenemigos,this.colisionCultivo, null,this)
      this.physics.add.overlap(this.jugador1,this.grupoenemigos, this.colisionjugador1, null,this) // overlap =se superponen 
  }
    
    


   update() {
   
   ///movimientojugador1
    if (this.cursors.down.isDown) {
      this.moverPersonaje(200,"caminarabajo")
      this.direccionapunta= "ataqueAbajo"
      } 
      else if (this.cursors.left.isDown) {
       this.moverPersonajex(-200,"caminarizquierda")
       this.direccionapunta= "ataqueIzquierda"
        } 
      else if (this.cursors.right.isDown) {
        this.moverPersonajex(200,"caminarderecha")
        this.direccionapunta= "ataquederecha"
        } 
      else if (this.cursors.up.isDown) {
       this.moverPersonaje(-200, "caminararriva")
       this.direccionapunta= "ataqueArriva"
      }
      else 
      { 
        console.log(this.jugador1.anims.currentAnim.key)
          /*if (!this.jugador1.anims.isPlaying && (this.jugador1.anims.currentAnim.key == "caminararriva" ||this.jugador1.anims.currentAnim.key == "caminarderecha"||this.jugador1.anims.currentAnim.key == "caminarizquierda"||this.jugador1.anims.currentAnim.key == "caminarabajo")) {
             this.moverPersonajex(0,"iddle")
            
          }*/
          this.jugador1.setVelocity(0,0) 
      }


      if (this.cursors.space.isDown) {
        this.reproduceAtaque()
        
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

  moverPersonaje(velY, claveAnim){
    this.jugador1.setVelocityY(velY);  
    this.jugador1.anims.play(claveAnim, true);  
  }

  moverPersonajex(velX, claveAnim){
    this.jugador1.setVelocityX(velX);  
    this.jugador1.anims.play(claveAnim, true);  
  }

  reproduceAtaque()  {
    this.enAtaque = true; // pongo la variable en ataque como activa
    this.jugador1.anims.play(this.direccionapunta, true).on('animationcomplete', () => {
      this.enAtaque = false; ///reprodusco la animacion y luego cuando se completa la animacion la variable enataque se desactiva
    });

}

  generarEnemigo() { ///metodo para crear enemigos en lugares aleatorios
    const posisiones = [
        { x: Phaser.Math.Between(0, 1920), y: -50 },  //  toma la un numero aleatoriae entre 0 y 1920 de x //Arriba
        { x: Phaser.Math.Between(0, 1920), y: 1130 }, // Abajo // toma un numero aleatorio de x 
        { x: -50, y: Phaser.Math.Between(0, 1080) },  // Izquierda// toma un nuemro aleatorio de y
        { x: 1970, y: Phaser.Math.Between(0, 1080) }, // Derecha // toma un numero aleatorio de y
      ];
      const posicion = posisiones[Phaser.Math.Between(0, posisiones.length - 1)]; // crea una variable que vale lo que valga posisiones
      const enemigo = this.grupoenemigos.create(posicion.x, posicion.y, "enemigo1"); // crea un enemigo y lo guarda en el grupo enemigo, lo crea en las posision es que saca de la variable posisiones
      enemigo.setScale(2)
      this.physics.moveToObject(enemigo, this.cultivo, 50); // mueve el enemigo creado a la posision del cultivo
  }
    
    colisionCultivo(cultivo,enemigo) {
      enemigo.destroy();
    }
  
    
 
    colisionjugador1(jugador1,enemigo) {
     console.log(this.enAtaque)
      if (this.enAtaque == true){
      enemigo.destroy();
     }
      

  }
   



}

  /*if(this.direccionapunta=="ataqueIzquierda") {
    var t=this.physics.add.sprite(this.jugador1.x,this.jugador1.y,"cultivo")
  t.setVelocityX(-500)
  t.setScale(0.2)
  this.disparoj1.add(t)
  }
  else if(this.direccionapunta=="ataquederecha") {
  var t=this.physics.add.sprite(this.jugador1.x,this.jugador1.y,"cultivo")
  t.setVelocityX(500)
  t.setScale(0.2)
  this.disparoj1.add(t)
  }*/