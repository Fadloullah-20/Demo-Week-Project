//Collision detection and resolution
//move the mouse, the sprite responds to overlapings, collision,
//and displaces another sprite

        //VARIABLES
let jump = false; // are we jumping
let direction = 1; // force of gravity in the y direction
let velocity = 1; // speed of the player
let jumpPower = 15; // strength of player's jump
let fallingSpeed = 1; // equal to velocity
let minHeight = 00; // height of ground
let maxHeight = 0; // height of sky
let jumpCounter = 0; // keeps track of how much we are jumping
let jumpWatch=0; //how many times jump is true
let barrier=1; // stops character falling through stuff
let state = 2;
let dy;
let iceS;
px = 150;
py = 50;
let gravity= 0.1;
let vy = 1.0;
let heart = 3;


        //SETUP
function setup() {
  createCanvas(1000, 600);
    
    iceT = new Group(); // top part
    iceB = new Group(); // bottom part
    iceD = new Group(); // portion of the ice that pushes the player down
    
  // for loop for platforms
  for(let i = 0; i < 6; i++) {
    let newIceT = createSprite(random(0, width), random(0, height));
    newIceT.addImage(loadImage('assets/iceF1.png'));
    iceT.add(newIceT);
  }
  for(let i = 0; i < 6; i++) {
    let newIceB = createSprite(random(0, width), random(0, height));
    newIceB.addImage(loadImage('assets/iceF1.png'));
    iceB.add(newIceB);
  }
  for(let i = 0; i < 12; i++) {
    let newIceD = createSprite(random(0, width), random(0, height));
    newIceD.addImage(loadImage('assets/iceF1.png'));
    iceD.add(newIceD);
  }


  // sprite creation
  bear = createSprite(400, 200,20,20);
  //compact way to add an image
  bear.addAnimation('forward','assets/bearX1.png','assets/bearX1.png','assets/bearY1.png','assets/bearY1.png');
  bear.addAnimation('normal','assets/bearX1.png');
  //bear.addAnimation('normalB','assets/bearX.png');
  bear.addAnimation('backward','assets/bearX.png','assets/bearX.png','assets/bearY.png','assets/bearY.png');
  // ice sprite
  ice = createSprite(150, 200);
  ice.addAnimation('normal','assets/iceF1.png');
  //ice.addAnimation('melty','assets/iceF1.png','assets/iceF1A.Png','assets/iceF1B.png','assets/iceF1C.png','assets/assets/iceF1D.png','assets/iceF1E.png');

  
  // ground sprite
  ground = createSprite(500,650,20,20);
  ground.addImage(loadImage('assets/ground.png'));

  // baby cub sprite
  // baby = createSprite(400, 200,20,20);
  

  // heart sprites
  heart1 = createSprite(25, 25, 20, 20);
  heart1.addImage(loadImage('assets/heart.png'));
  heart2 = createSprite(75, 25, 20, 20);
  heart2.addImage(loadImage('assets/heart.png'));
  heart3 = createSprite(125, 25, 20, 20);
  heart3.addImage(loadImage('assets/heart.png'));

            
}
                //DRAW
function draw() {
    fill(0, 0, 25);
    background(0, 170, 255);
    gravity();

      //  image(iceC,100,450,10,10);
    //fill(0, 0, 255);
    //rect(0, 500, 1000, 100);
    bear.frameDelay=20;
    if(state=2){
       // bear.stop();
    }
    function bearP(){
        // position
        bear.position.x = px;
        bear.position.y = py;
        
        // controls
        if (keyIsDown(LEFT_ARROW)) {
            px -= 3.2;
        //image(rpolarBear,this.x,py,this.r);
        bear.changeAnimation('backward');
        }
        else{
            bear.changeAnimation('backward');
        }
       
        if (keyIsDown(RIGHT_ARROW)) {
            px += 3.2;
            bear.changeAnimation('forward');
        }
        else{
            bear.changeAnimation('normal');
        }
        if (keyIsDown(UP_ARROW)) {
            jump = true;
            
        } 
        else {
            jump = false;
        } 
        
        if(state==1||state==2||state==3||state==4){
            py+=4;
        }
       
        
        console.log(jumpWatch);
    }
    bearP();

    function collision() {
        if(bear.collide(ice)){
            py -= barrier;
          
        }
        if(bear.collide(ground)){
            py -= 6;
           fill(255, 0, 0);
            textSize(50);
            text('You lost a heart!', 100, 150);
            heart -= 1;
            respawn();
            life();
            // put a respawn functio
            // decrease life function
            
        }
        /*if (bear.collide(baby)) {
            text('You win!', 100, 150)
            // state = win state
        }*/
        if(bear.collide(iceT)){
            py -= barrier;
            //py+=6;
        }
        if(bear.collide(iceB)){
            py -= barrier;
            //py+=6;
        }
        // collision for iceD
        if (bear.collide(iceD)) {
           py += 9;
        }

        

        
    }  
    function jumpObserver(){
        // jumpWatch=0;
        
        if (jump == true){
            jumpWatch += 1;
        }


        if (jumpWatch>8){
            jump=false;
           // jumpWatch=0
        }

        if (bear.collide(iceB)){
            jump = true;
            jumpWatch = 0;
           // barrier= vy+fallingSpeed-1;
          // barrier = 1;
        }
        else{
            //barrier=1;
        }
        if(bear.collide(iceT)){
            jump=true;
            jumpWatch=0;
            //barrier=vy+fallingSpeed-1;
           // barrier=1;
        }
        else{
            //barrier=6;
        }
        if (bear.collide(ice)){
           jump=true;
           jumpWatch=0;
            //barrier=vy+fallingSpeed-1;
          //  barrier=1;
        }
        else{
            //barrier=6;
        }

    }
    jumpObserver();
    
    
    collision();

    function life() {
        if (heart == 0) {
            text('No more life!', 300, 150);
            heart1.visible = false;
            // respawn
            // state = losing state
            state = 1;
        }   
        else if (heart == 2) {
            heart3.visible = false;
        }
        else if (heart == 1) {
            heart2.visible = false;
        }
    }

    function respawn() {
        px = 120;
        py = 100;
    }


    
 
    function iceP(){

        iceT[0].position.x=245;
        iceT[0].position.y=271;
        iceT[1].position.x=618;
        iceT[1].position.y=173;
        iceT[2].position.x=365;
        iceT[2].position.y=336;
        iceT[3].position.x=912;
        iceT[3].position.y=113;
        iceT[4].position.x=689;
        iceT[4].position.y=363;
        iceT[5].position.x=192;
        iceT[5].position.y=402;
        //top 
        iceD[6].position.x=245;
        iceD[6].position.y=281;
        iceD[7].position.x=618;
        iceD[7].position.y=183;
        iceD[8].position.x=365;
        iceD[8].position.y=346;
        iceD[9].position.x=912;
        iceD[9].position.y=123;
        iceD[10].position.x=689;
        iceD[10].position.y=373;
        iceD[11].position.x=192;
        iceD[11].position.y=412;

        iceB[0].position.x=331;
        iceB[0].position.y=156;
        iceB[1].position.x=892;
        iceB[1].position.y=119;
        iceB[2].position.x=739;
        iceB[2].position.y=198;
        iceB[3].position.x=208;
        iceB[3].position.y=482;
        iceB[4].position.x=988;
        iceB[4].position.y=297;
        iceB[5].position.x=846;
        iceB[5].position.y=246;

        //bottom
        iceD[0].position.x=331;
        iceD[0].position.y=166;
        iceD[1].position.x=892;
        iceD[1].position.y=129;
        iceD[2].position.x=739;
        iceD[2].position.y=208;
        iceD[3].position.x=208;
        iceD[3].position.y=492;
        iceD[4].position.x=988;
        iceD[4].position.y=307;
        iceD[5].position.x=846;
        iceD[5].position.y=256;

        




        
    
    }
  iceP();
     
  function gravity() {
    vy += gravity;
    bear.position.y += vy;
    vy=constrain(vy,1,3.9);
        if (py >= minHeight && jump == false){
            // stop falling on the ground
            py = py;
            jumpCounter = 0;
            
        } 
        else {
            py = py + (direction*velocity); // code that makes gravity work
            
        }

        if (jump == true) {
            if(py <= maxHeight || jumpCounter >= jumpPower) {
                if (py >= minHeight) {
                    //py = minHeight;
                }
                else {
                    velocity = fallingSpeed;
                }
                velocity = fallingSpeed; // falls at max
            }
            else{
                velocity = -jumpPower;
                jumpCounter = jumpCounter + 1; // add to jump coutner
            }
        } // close jump
        else{
            velocity = fallingSpeed;
        }
    }
    
    
    
  //if debug is set to true bounding boxes, centers and depths are visualized
  bear.debug =true// mouseIsPressed;
  ice.debug = true//mouseIsPressed;
  iceT.debug = true//mouseIsPressed;
  iceB.debug= true//mouseIsPressed
  ground.debug =true// mouseIsPressed;

 
  drawSprites();
}


