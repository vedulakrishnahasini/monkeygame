//Sprites
var Monkey 
var MonkeyRunning
var M
var Banana 
var Obstacle

//Image Sprites
var BananaImage   
var ObstacleImage

//Groups
var FoodGroup
var ObstacleGroup

//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

//Groups
var FruitGroup
var ObstacleGroup

//Ground
var Ground

//Score & 
var score=0

function preload(){
  
MonkeyRunning=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");

M=loadAnimation("sprite_0.png")
    
BananaImage = loadImage("banana.png");
ObstacleImage = loadImage("obstacle.png");
}

function setup() {
createCanvas(570,450);
  
Monkey = createSprite(80,315,20,20);
Monkey.addAnimation("Monkey",MonkeyRunning);
Monkey.addAnimation("M",M);
Monkey.scale= 0.2;
  
Ground= createSprite(400,400,900,10);
score = 0;
  
FruitGroup = new Group();
ObstacleGroup = new Group();
}

function draw() {
background("lightblue")
  
if(gameState===PLAY){ 
Bananas();
Obstacles();
  
if(FruitGroup.isTouching(Monkey)){
FruitGroup.destroyEach(); 
score= score +1;
}
  
Monkey.velocityY = Monkey.velocityY +1;
Monkey.collide(Ground);
   
if(keyDown("space")){    
Monkey.velocityY=-10;
}
  
if(ObstacleGroup.isTouching(Monkey)){
gameState = END;     
}
}
  
if(gameState === END){
FruitGroup.destroyEach();
    
Monkey.changeAnimation("M",M);
    
ObstacleGroup.setVelocityXEach(0);
ObstacleGroup.setLifetimeEach(-1);
}
  
Monkey.collide(Ground);
  
drawSprites(); 
  
fill("black");
stroke ("black")
textSize(20)
  
text("Bananas Taken = " +score,10,20);

}

function Bananas(){
  
if (frameCount%140===0){
Banana = createSprite(570,350,40,10);
Banana.addImage(BananaImage);
Banana.y = Math.round(random(70,230));
Banana.scale = 0.1;
Banana.velocityX = -7;
Banana.lifetime = 200; 
    
FruitGroup.add(Banana)
}
}

function Obstacles(){
if(frameCount%100===0){
Obstacle = createSprite(570,360,40,10);
Obstacle.addImage(ObstacleImage);
Obstacle.velocityX=-6;
Obstacle.scale = 0.18 ;
Obstacle.lifetime = 200
Obstacle.setCollider("rectangle",0,0,380,380);
ObstacleGroup.add(Obstacle);    
}
}





