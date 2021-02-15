var balloon, backgroundImage, database, position;
var balloonImage1;

function preload(){
 backgroundImage = loadImage("Hot Air Balloon-01.png");
 balloonImage1 = loadAnimation("Hot Air Balloon-02.png", "Hot Air Balloon-03.png", "Hot Air Balloon-04.png");
}

function setup() {
  createCanvas(500,500);
  balloon = createSprite(400, 200, 50, 50);
  balloon.addAnimation("hotAirBalloon", balloonImage1);
  database = firebase.database();
  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", readPosition, showError);
}

function draw() {
  background(backgroundImage);  
//adding controls to the balloon

if(keyDown(LEFT_ARROW)){
  balloon.x = balloon.x-10;
}
else if(keyDown(RIGHT_ARROW)){
  balloon.x = balloon.x+10;
}
else if(keyDown(DOWN_ARROW)){
  balloon.y = balloon.y+10;
}
else if(keyDown(UP_ARROW)){
  updateHeight(0, -10);
  balloon.addAnimation("hotAirBalloon", balloonImage1);
  balloon.scale = balloon.scale-0.01;
}

textSize(21);
fill("green");
stroke("blue");
text("hotAirBalloon", 55, 220);

  drawSprites();
}

function updateHeight(){
 database.ref('balloon/height').set({
  'x' : height.x + x,
  'y' : height.y + y
 });
}

function readHeight(data){
 height = data.val();
 balloon.x = height.x;
 balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database.");
}