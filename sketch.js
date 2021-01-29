var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score=0;
var ground
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  ground=createSprite(300,467,1500,20);
}

function setup() {
  createCanvas(800,500);
  
  backgr=createSprite(0,0,800,500);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,400,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,400,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  if(bananaGroup.isTouching(player))
    {
      player.scale=0.3;
      bananaGroup.destroyEach();
      score=score+2
    }
    
  switch(score)
    {
      case 10: monkey.scale=0.10;
        break;
      case 20: monkey.scale=0.12;
        break;
      case 30: monkey.scale=0.14;
        break;
      case 40: monkey.scale=0.16;
        break;
      default: break;
    }

  spawnBananas();
  spawnObstacles();

}

  drawSprites();

  textSize(10)
  text("Score="+ score,700,25);

  if(obstacleGroup.isTouching(player))
  {
    gameState = END;
  }
    
 else if(gameState === END)
 {
   backgr.velocityX = 0;
   player.visible = false;

   bananaGroup.destroyEach();
   obstacleGroup.destroyEach();

   textSize(30);
   fill(255)
   text("Game Over",300,220)
 }
}

function spawnBananas() 
{
 if (frameCount % 80 === 0){
    var banana = createSprite(600,30,20,10)
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.y = Math.round(random(20,100));
    banana.velocityX = -3;
    banana.lifetime = 200;
    bananaGroup.add(banana);
 }
}
function spawnObstacles() 
{
 if (frameCount % 300 === 0)
   {
    var obstacle = createSprite(600,350,10,40);
    obstacle.addImage(obstacleImage);
     obstacle.scale=0.3;
     obstacle.y = Math.round(random(350,400));
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
}
}

