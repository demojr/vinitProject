class Game{
    constructor(){

    }
    getState(){
        var gameStateRef = database.ref('gameState')
        gameStateRef.on("value",function(data){
            gameState = data.val()
        })  }  
        update(state){
          database.ref('/').update({
              gameState:state
          })
        }
        async start(){
          if(gameState==0){
              player = new Player()
              var playerRef=await database.ref('playerCount').once("value")
              if(playerRef.exists()){
                playerCount=playerRef.val()
                player.getCount()
              }
              form = new Form()
              form.display()

              
          }
          stroke("black")

          box = createSprite(displayWidth/2-100,100,800,800)
          box.shapeColor="white"

          player1 = createSprite(1058,400,10,100)
          player1.scale = 0.2
          player1.addImage(play1Img)

          player2 = createSprite(400,400,10,100)
          player2.addImage(play2Img)
          player2.scale = 0.2;

          infinity = createSprite(713,400,20,20);
          infinity.velocityX = 1;
          infinity.velocityY = 1;
          infinity.scale = 0.1;
          infinity.addImage(infinImg);
          

        }
        play(){
            form.hide()
            Player.getPlayerInfo();
           
            


            if(keyIsDown(UP_ARROW)&&player.index!==null){
                if(player.index == 1){
                    player1.y = player1.y +10;
                    player.y = player1.y;
                }
                else if(player.index == 2){
                    player2.y = player2.y +10;
                    player.y= player2.y;
                }
                
                player.update()
            }
            if(keyIsDown(DOWN_ARROW)&&player.index!==null){
                if(player.index == 1){
                    player1.y = player1.y -10;
                    player.y = player1.y;
                }
                else if(player.index == 2){
                    player2.y = player2.y - 10;
                    player.y= player2.y;
                }
                player.update()
            }        
            infinity.bounceOff(wall1)
            infinity.bounceOff(wall2)
            infinity.bounceOff(wall3)
            infinity.bounceOff(wall4)
            drawSprites()
        }
}


// read players Info from the database 