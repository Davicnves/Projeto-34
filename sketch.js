const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;


var bg_img;
var food;
var rabbit;

var button,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;

var ballon;
var ballon2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var littleStar;
var rockStar;
var rockStar2;

var noStar;
var oStar;
var tStar;
var point;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  
  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');
  littleStar = loadImage('star.png');

  noStar = loadImage('empty.png');
  oStar = loadImage('one_star.png');
  tStar = loadImage('stars.png');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");


  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  createCanvas(600,700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  point = createSprite(50,20,30,30);
  point.scale = 0.2;
  point.addAnimation('pointStars', noStar);
  point.addAnimation('pointOneStar', oStar);
  point.addAnimation('pointTwoStar', tStar);
  point.changeAnimation('pointStars')
  
  //estrelas
  rockStar = createSprite(320,50,20,20);
  rockStar.addImage(littleStar);
  rockStar.scale = 0.02;

  rockStar2 = createSprite(50,370,20,20);
  rockStar2.addImage(littleStar);
  rockStar2.scale = 0.02;

  //botão 1
  button = createImg('cut_btn.png');
  button.position(100,90);
  button.size(50,50);
  button.mouseClicked(drop);

   //botão 2
   button2 = createImg('cut_btn.png');
   button2.position(450,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);

   //botão 3
   button3 = createImg('cut_btn.png');
   button3.position(210,450);
   button3.size(50,50);
   button3.mouseClicked(drop3);
   
   //corda
   rope = new Rope(7,{x:120,y:90});
   rope2 = new Rope(7,{x:490,y:90});
   rope3 = new Rope(7,{x:250,y:450});
   
   //balão
   ballon = createImg('baloon2.png');
   ballon.position(260,370);
   ballon.size(120,120);
   ballon.mouseClicked(ballonAir);

   ballon2 = createImg('baloon2.png');
   ballon2.position(500,370);
   ballon2.size(120,120);
   ballon2.mouseClicked(ballonAir2);
   
   //botão mudo
  mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  ground = new Ground(250,height,width,20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;
  
  //coelho
  bunny = createSprite(450,height-80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  //fruta
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);
  fruit_con_3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny,80)==true)
  {
    World.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
   }
  
   if(collide(fruit,rockStar,20)==true)
   {
     rockStar.visible = false;
     point.changeAnimation('pointOneStar')
   }

   if(collide(fruit,rockStar2,20)==true)
   {
     rockStar2.visible = false;
     point.changeAnimation('pointTwoStar')
   }
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}

function drop3()
{
  cut_sound.play();
  rope3.break();
  fruit_con_3.dettach();
  fruit_con_3 = null;
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

function ballonAir()
{
  Matter.Body.applyForce(fruit,{x:0, y:0},{x:0, y:-0.03});
  air.play();
}

function ballonAir2()
{
  Matter.Body.applyForce(fruit,{x:0, y:0},{x:0.03, y:0});
  air.play();
}