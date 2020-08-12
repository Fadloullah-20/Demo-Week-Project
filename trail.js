//Collision detection and resolution
//move the mouse, the sprite responds to overlapings, collision,
//and displaces another sprite

        //VARIABLES
let jump = false; // are we jumping
let direction = 1; // force of gravity in the y direction
let velocity = 1; // speed of the player
let jumpPower = 16; // strength of player's jump
let fallingSpeed = 1; // equal to velocity
let minHeight = 00; // height of ground
let maxHeight = 0; // height of sky
let jumpCounter = 0; // keeps track of how much we are jumping
let jumpWatch=0; //how many times jump is true
let barrier; // stops character from falling through stuff
let state = 3;
let dy;
let iceS;
px = 150;
py = 50;
let gravity= 0.1;
let vy = 1.0;
let heart = 3;

let newIceB;
//let my =mouseY;
//let mx =mouseX;
        //SETUP

function setup() {
    createCanvas(1000, 600);
    resetSketch();
             
    }
function resetSketch(){
    iceT = new Group(); // top part
    iceB = new Group(); // bottom part
    iceD = new Group(); // portion of the ice that pushes the player down
    
    // for loop for platforms
    for(let i = 0; i < 6; i++) {
        let newIceT = createSprite(random(0, width), random(0, height));
        newIceT.addImage(loadImage('assets/iceF1.png'));
        newIceT.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');
        iceT.add(newIceT);
    }
    for(let i = 0; i < 6; i++) {
        let newIceB = createSprite(random(0, width), random(0, height));
        newIceB.addImage(loadImage('assets/iceF1.png'));
        newIceB.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');
        iceB.add(newIceB);
    }
    for(let i = 0; i < 12; i++) {
        let newIceD = createSprite(random(0, width), random(0, height));
        newIceD.addAnimation('normal','assets/iceF1.png')
        newIceD.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');
        //newIceD1.addAnimation('melty','assets/iceF1.png','assets/ice1.Png','assets/ice2.png','assets/ice3.png','assets/ice4.png','assets/ice5.png');
        iceD.add(newIceD);
       // iceD.add(newIceD1)=false;
    }
    ice = createSprite(150, 200);
    ice.addAnimation('normal','assets/iceF1.png');
    ice.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');

    // sprite creation
    bear = createSprite(400, 200,20,20);
    //compact way to add an image
    bear.addAnimation('forward','assets/bearX1.png','assets/bearX1.png','assets/bearY1.png','assets/bearY1.png');
    bear.addAnimation('normal','assets/bearX1.png');

    bear.addAnimation('left','assets/bearX.png');
    bear.addAnimation('backward','assets/bearX.png','assets/bearX.png','assets/bearY.png','assets/bearY.png');
    // ice sprite
   

    
    // ground sprite
    ground = createSprite(500, 650, 20, 20);
    ground.addImage(loadImage('assets/ground.png')); // replace with water 

    // baby cub sprite
    baby = createSprite(850, 223, 20, 20);

    baby.addImage(loadImage('assets/prime.png'));
    
    
   
    // heart sprites
    heart1 = createSprite(25, 25, 20, 20);
    heart1.addImage(loadImage('assets/heart.png'));
    heart2 = createSprite(75, 25, 20, 20);
    heart2.addImage(loadImage('assets/heart.png'));
    heart3 = createSprite(125, 25, 20, 20);
    heart3.addImage(loadImage('assets/heart.png'));

    // screen image
    loseScreen = loadImage('assets/lose.png');
    winScreen = loadImage('assets/dancing.gif');
    bg = loadImage('assets/background.png');

}
 

                //DRAW
function draw() {
    //console.log(bear.collide(ice));
    // start screen
    function iceP() {

        iceT[0].position.x=245;
        iceT[0].position.y=271;
        iceT[1].position.x=618;
        iceT[1].position.y=173;
        iceT[2].position.x=365;
        iceT[2].position.y=336;
        iceT[3].position.x=912;
        iceT[3].position.y=113;
        iceT[4].position.x=669;
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
        iceD[10].position.x=669;
        iceD[10].position.y=373;
        iceD[11].position.x=192;
        iceD[11].position.y=412;

        iceB[0].position.x=331;
        iceB[0].position.y=156;
        iceB[1].position.x=892;
        iceB[1].position.y=119;
        iceB[2].position.x=739;
        iceB[2].position.y=198;
        iceB[3].position.x=488;
        iceB[3].position.y=282;
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
        iceD[3].position.x=488;
        iceD[3].position.y=292;
        iceD[4].position.x=988;
        iceD[4].position.y=307;
        iceD[5].position.x=846;
        iceD[5].position.y=256;
       

    }
 text('hmm',mouseX,mouseY);
    if (state == 1) {
        background(bg);
        //background();
        // title button
        rect(370, 100, 400, 50, 20)
        // play button - go to state 3
        fill('red');
        rect(500, 320, 100, 50, 40);
        // how to play button - go to help state 
        fill('blue');
        rect(500, 380, 90, 40, 40);
        // excersion button
        rect(525, 435, 50, 25, 40);
       
    }
    // how to play
    if (state == 2) {
        background(bg);
        fill(0, 50, 255);
        textSize(35);
        textFont('Lemonada');
        text("Your objective is to find", 250, 250);
        text("your lost cub while jumping on", 250, 300);
        text("melting ice platforms", 250, 350)
        text("Up arrow - jump, left/right arrow - move", 250, 400);
    }
    // test stage
    if (state == 3) {
    fill(0, 0, 25);
    background(bg);
   // image(backScreen,0,0,1000,600);
    gravity();
       
    
      console.log(ice.animation.getFrame());
  
    bear.frameDelay=20;
    
       // bear.stop();
    
    // player
    function bearP(){
        // position
        bear.position.x = px;
        bear.position.y = py;
        
        // controls
        if (keyIsDown(LEFT_ARROW)) {
            px -= 3;
        //image(rpolarBear,this.x,py,this.r);
        bear.changeImage('backward');
        }
        else{
          //  bear.changeImage('left')
        }
        //if(!(keyIsDown(LEFT_ARROW))){
           // bear.changeImage('left');
        // }
       
        if (keyIsDown(RIGHT_ARROW)) {
            px += 3;
            bear.changeImage('forward');
        }
        else{
           //bear.changeImage('normal');
        }
       
        if (!(keyIsDown(RIGHT_ARROW)||keyIsDown(LEFT_ARROW))){
            bear.changeImage('normal');
        }
            //bear.changeAnimation('normal');
       // }
        if (keyIsDown(UP_ARROW)) {
            jump = true;
            
        } 
        else {
            jump = false;
        } 
        if (keyIsDown(UP_ARROW) && bear.collide(ice)){
            jump=true;
            jumpWatch=0;
        }
        if(keyIsDown(UP_ARROW) && bear.collide(iceB)){
            jump = true;
            jumpWatch = 0;
        }
        if(keyIsDown(UP_ARROW) && bear.collide(iceT)){
            jump = true;
            jumpWatch = 0;
        }

        if(state==1||state==2||state==3||state==4){
            py+=4;
        }
       
        
        //console.log(jumpWatch);
    }
        bearP();

    function collision() {
        if(bear.collide(ice)){
            py -= barrier;
          //  ice.changeAnimation('melty')
        }
        if(bear.collide(ground)){
            py -= 6;
            heart -= 1;
            respawn();
            life();
            
        }
        if (bear.collide(baby)) {
            state = 5;
        }
        if(bear.collide(iceT)){
          //  py -= barrier;
            //py+=6;
        }
        if(bear.collide(iceB)){
          //  py -= barrier;
            //py+=6;
        }
        // collision for iceD
        if (bear.collide(iceD)) {
           py += 20;
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
        for(let i=0; i<6; i++){
        if (bear.collide(iceB[i])){
           
            py= iceB[i].position.y-10;
           // py= 5+iceB.position.y
           // barrier= vy+fallingSpeed-1;
          // barrier = 1;
            }
        }
        for(let i=0;i<6;i++){
            if(bear.collide(iceT[i])){
         //  for()
                py= iceT[i].position.y-10;
           
            //barrier=vy+fallingSpeed-1;
           // barrier=1;
            }
        }
        if (bear.collide(ice)){
          
           py= ice.position.y-10;
            //barrier=vy+fallingSpeed-1;
          //  barrier=1;
        }
        

    }
    jumpObserver();
    collision();

    // health system
    function life() {
        if (heart == 0) {
            heart1.visible = false;
            // respawn
            // state = losing state
            state = 4;
        }   
        else if (heart == 2) {
            heart3.visible = false;
            for(let i=0; i<6; i++){
                iceT[i].removed = true//mouseIsPressed;
                }
                for(let i=0; i<6; i++){
                  iceB[i].removed = true//mouseIsPressed;
                  }
                  for(let i=0; i<12; i++){
                      iceD[i].removed = true//mouseIsPressed;
                  }
            resetIce()
        }
        else if (heart == 1) {
            heart2.visible = false;
            for(let i=0; i<6; i++){
                iceT[i].removed = true//mouseIsPressed;
                }
                for(let i=0; i<6; i++){
                  iceB[i].removed = true//mouseIsPressed;
                  }
                  for(let i=0; i<12; i++){
                      iceD[i].removed = true//mouseIsPressed;
                  }
            resetIce();
        }
    }
    // respawn location 
    function respawn() {
        px = 120;
        py = 100;

    }

    // ice platforms
    iceP();

  function gravity() {
    vy += gravity;
    bear.position.y += vy;
    vy = constrain(vy,1,3.9);
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
  //  ice.animation('normal');
function meltingIce(){  
    if(py==ice.position.y-10){
        ice.changeImage('melty')
       ice.animation.frameDelay=20;
    }
   
    if(ice.animation.getFrame()===11){
        ice.removed=true;
        ice.position.x=5000;
        ice.position.y=5000;
     
    }
    if(state==4 &&(ice.removed=true)){
        ice.changeImage('normal')
        //ice.removed=false;
        //ice.position.x=150;
       // ice.position.y=200;
    }
    
         for(let i= 0; i<6; i++){
      if (py==iceT[i].position.y-10&&px>iceT[i].position.x-50&&px<iceT[i].position.x+50){
          iceT[i].changeAnimation('melty');
          iceT[i].animation.frameDelay=20;
      }
      if(iceT[i].animation.getFrame()===11){ 
          iceT[i].removed=true;
          iceT[i].position.x=5000;
          iceT[i].position.y=5000;
         // iceT[i].changeAnimation('normal');
      }
      if(state==4){
        iceT[i].changeAnimation('normal');
       // iceT[i].removed=false;
        // iceT[0].position.x=245;
        // iceT[0].position.y=271;
        // iceT[1].position.x=618;
        // iceT[1].position.y=173;
        // iceT[2].position.x=365;
        // iceT[2].position.y=336;
        // iceT[3].position.x=912;
        // iceT[3].position.y=113;
        // iceT[4].position.x=669;
        // iceT[4].position.y=363;
        // iceT[5].position.x=192;
        // iceT[5].position.y=402;
      }
      
     }
     for(let i=0; i<6;i++){
     if (py==iceB[i].position.y-10&&px>iceB[i].position.x-50&&px<iceB[i].position.x+50){
             iceB[i].changeAnimation('melty');
             iceB[i].animation.frameDelay=20;
     }
        if(iceB[i].animation.getFrame()===11){    
          iceB[i].removed=true;
          iceB[i].position.x=5000;
          iceB[i].position.y=5000;
        //  iceB[i].changeAnimation('normal');
        }
        if(state==4){
            iceB[i].changeAnimation('normal');
            //iceB[i].removed=false;
            // iceB[0].position.x=331;
            // iceB[0].position.y=156;
            // iceB[1].position.x=892;
            // iceB[1].position.y=119;
            // iceB[2].position.x=739;
            // iceB[2].position.y=198;
            // iceB[3].position.x=488;
            // iceB[3].position.y=282;
            // iceB[4].position.x=988;
            // iceB[4].position.y=297;
            // iceB[5].position.x=846;
            // iceB[5].position.y=246;
        }
    }

     for(let i=0; i<12; i++){
         if (py==iceD[i].position.y-20&&px>iceD[i].position.x-50&&px<iceD[i].position.x+50){
            iceD[i].changeImage('melty');
            iceD[i].animation.frameDelay=20;
         }
        if(iceD[i].animation.getFrame()===11){    
            iceD[i].removed=true;
            iceD[i].position.x=5000;
            iceD[i].position.y=5000;
         //   iceD[i].changeImage('normal');
        }
      
        if(state==4){
            iceD[i].changeImage('normal');
           // iceD[i].removed=false;
            // iceD[0].position.x=331;
            // iceD[0].position.y=166;
            // iceD[1].position.x=892;
            // iceD[1].position.y=129;
            // iceD[2].position.x=739;
            // iceD[2].position.y=208;
            // iceD[3].position.x=488;
            // iceD[3].position.y=292;
            // iceD[4].position.x=988;
            // iceD[4].position.y=307;
            // iceD[5].position.x=846;
            // iceD[5].position.y=256;
            // iceD[6].position.x=245;
            // iceD[6].position.y=281;
            // iceD[7].position.x=618;
            // iceD[7].position.y=183;
            // iceD[8].position.x=365;
            // iceD[8].position.y=346;
            // iceD[9].position.x=912;
            // iceD[9].position.y=123;
            // iceD[10].position.x=669;
            // iceD[10].position.y=373;
            // iceD[11].position.x=192;
            // iceD[11].position.y=412;
        }
        
     }
    console.log(ice.removed);
}
    
 meltingIce();  
  //if debug is set to true bounding boxes, centers and depths are visualized
  bear.debug = false// mouseIsPressed;
  ice.debug = false//mouseIsPressed;
  for(let i=0; i<6; i++){
  iceT[i].debug = false//mouseIsPressed;
  }
  for(let i=0; i<6; i++){
    iceB[i].debug = false//mouseIsPressed;
    }
    for(let i=0; i<12; i++){
        iceD[i].debug = false//mouseIsPressed;
        }
 // iceB[i].debug = true//mouseIsPressed
 // ground.debug = true// mouseIsPressed;
 function mouse() {
    ellipse(mouseX, mouseY, 1, 1); 
  var hello = mouseX + ", " +mouseY;
  text( hello, mouseX, mouseY);
};
mouse();
 
  drawSprites();    
    }
    // lose state
    if(state == 4) {
        background(loseScreen);
        fill(0, 120, 255);
        textSize(60);
        text('Gameover!', 300, 100);
        textSize(25);
        text("Don't give up! Press down arrow to retry!", 300, 200)    
        
        iceP();
    
        ice.position.x=150;
        ice.position.y=200;
   //    ice.animation.looping=true;
        //ice.removed=false;
         
         
         if (keyIsDown(UP_ARROW)||keyIsDown(DOWN_ARROW)) {
            state = 3;
            for(let i=0; i<6; i++){
                iceT[i].removed = true//mouseIsPressed;
                }
                for(let i=0; i<6; i++){
                  iceB[i].removed = true//mouseIsPressed;
                  }
                  for(let i=0; i<12; i++){
                      iceD[i].removed = true//mouseIsPressed;
                  }
       
            // reset hearts back to 3
            heart = 3;
            heart1.visible = true;
            heart2.visible = true;
            heart3.visible = true;
            
            resetIce();
            
            //state = 3;
            
            
        }
    }   
     if(state == 5) {
        background(winScreen);
        fill(0, 120, 255);
        textSize(60);
        text('You WIN!', 300, 100);
        textSize(20);
        text("Press down arrow to play again!", 300, 200); 
        if (keyIsDown(DOWN_ARROW)) {
            state = 3;
            // reset hearts back to 3
            heart = 3;
            heart1.visible = true;
            heart2.visible = true;
            heart3.visible = true;
        }  
    }
    console.log((ice.position.x),(ice.position.y));
}


function mouseClicked() {
    if (state == 4) {
       state==3;        
    }
}






function resetIce(){
    iceT = new Group(); // top part
    iceB = new Group(); // bottom part
    iceD = new Group(); // portion of the ice that pushes the player down
    
    // for loop for platforms
    for(let i = 0; i < 6; i++) {
        let newIceT = createSprite(random(0, width), random(0, height));
        newIceT.addImage(loadImage('assets/iceF1.png'));
        newIceT.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');
        iceT.add(newIceT);
    }
    for(let i = 0; i < 6; i++) {
        let newIceB = createSprite(random(0, width), random(0, height));
        newIceB.addImage(loadImage('assets/iceF1.png'));
        newIceB.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');
        iceB.add(newIceB);
    }
    for(let i = 0; i < 12; i++) {
        let newIceD = createSprite(random(0, width), random(0, height));
        newIceD.addAnimation('normal','assets/iceF1.png')
        newIceD.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');
        //newIceD1.addAnimation('melty','assets/iceF1.png','assets/ice1.Png','assets/ice2.png','assets/ice3.png','assets/ice4.png','assets/ice5.png');
        iceD.add(newIceD);
       // iceD.add(newIceD1)=false;
    }
    ice = createSprite(150, 200);
    ice.addAnimation('normal','assets/iceF1.png');
    ice.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');

}

function retry(){

   // 
        if (py==iceT[0].position.y-10&&px>iceT[0].position.x-50&&px<iceT[0].position.x+50){
            iceT[0].changeAnimation('melty');
            iceT[0].animation.frameDelay=20;
        }
        if(iceT[0].animation.getFrame()===11){ 
            iceT[0].removed=true;
            iceT[0].position.x=5000;
            iceT[0].position.y=5000;
           // iceT[i].changeAnimation('normal');
        }
        if (py==iceT[1].position.y-10&&px>iceT[1].position.x-50&&px<iceT[1].position.x+50){
            iceT[1].changeAnimation('melty');
            iceT[1].animation.frameDelay=20;
        }
        if(iceT[1].animation.getFrame()===11){ 
            iceT[1].removed=true;
            iceT[1].position.x=5000;
            iceT[1].position.y=5000;
           // iceT[i].changeAnimation('normal');
        }
        if (py==iceT[2].position.y-10&&px>iceT[2].position.x-50&&px<iceT[2].position.x+50){
            iceT[2].changeAnimation('melty');
            iceT[2].animation.frameDelay=20;
        }
        if(iceT[2].animation.getFrame()===11){ 
            iceT[2].removed=true;
            iceT[2].position.x=5000;
            iceT[2].position.y=5000;
           // iceT[i].changeAnimation('normal');
        }
        if (py==iceT[3].position.y-10&&px>iceT[3].position.x-50&&px<iceT[3].position.x+50){
            iceT[3].changeAnimation('melty');
            iceT[3].animation.frameDelay=20;
        }
        if(iceT[3].animation.getFrame()===11){ 
            iceT[3].removed=true;
            iceT[3].position.x=5000;
            iceT[3].position.y=5000;
           // iceT[i].changeAnimation('normal');
        }
        if (py==iceT[4].position.y-10&&px>iceT[4].position.x-50&&px<iceT[4].position.x+50){
            iceT[4].changeAnimation('melty');
            iceT[4].animation.frameDelay=20;
        }
        if(iceT[4].animation.getFrame()===11){ 
            iceT[4].removed=true;
            iceT[4].position.x=5000;
            iceT[4].position.y=5000;
           // iceT[i].changeAnimation('normal');
        }
        if (py==iceT[5].position.y-10&&px>iceT[5].position.x-50&&px<iceT[5].position.x+50){
            iceT[5].changeAnimation('melty');
            iceT[5].animation.frameDelay=20;
        }
        if(iceT[5].animation.getFrame()===11){ 
            iceT[5].removed=true;
            iceT[5].position.x=5000;
            iceT[5].position.y=5000;
           // iceT[i].changeAnimation('normal');
        }
        for(let i= 0; i<6; i++){    
        if(state==4){
           iceT[i].changeAnimation('normal');
           iceT[i].removed=false;
           iceT[0].position.x=245;
           iceT[0].position.y=271;
           iceT[1].position.x=618;
           iceT[1].position.y=173;
           iceT[2].position.x=365;
           iceT[2].position.y=336;
           iceT[3].position.x=912;
           iceT[3].position.y=113;
           iceT[4].position.x=669;
           iceT[4].position.y=363;
           iceT[5].position.x=192;
           iceT[5].position.y=402;
        }
        
       }
      
    if (py==iceB[0].position.y-10&&px>iceB[0].position.x-50&&px<iceB[0].position.x+50){
               iceT[0].changeAnimation('melty');
               iceT[0].animation.frameDelay=20;
       }
          if(iceB[0].animation.getFrame()===11){    
            iceB[0].removed=true;
            iceB[0].position.x=5000;
            iceB[0].position.y=5000;
          //  iceB[0].changeAnimation('normal');
          }
    if (py==iceB[1].position.y-10&&px>iceB[1].position.x-50&&px<iceB[1].position.x+50){
            iceB[1].changeAnimation('melty');
            iceB[1].animation.frameDelay=20;
        }
       if(iceB[1].animation.getFrame()===11){    
         iceB[1].removed=true;
         iceB[1].position.x=5000;
         iceB[1].position.y=5000;
       //  iceB[1].changeAnimation('normal');
       }
    if (py==iceB[2].position.y-10&&px>iceB[2].position.x-50&&px<iceB[2].position.x+50){
        iceB[2].changeAnimation('melty');
        iceB[2].animation.frameDelay=20;
    }
    if(iceB[2].animation.getFrame()===11){    
        iceB[2].removed=true;
        iceB[2].position.x=5000;
        iceB[2].position.y=5000;
        //  iceB[2].changeAnimation('normal');
        }
    if (py==iceB[3].position.y-10&&px>iceB[3].position.x-50&&px<iceB[3].position.x+50){
            iceB[3].changeAnimation('melty');
            iceB[3].animation.frameDelay=20;
        }
       if(iceB[3].animation.getFrame()===11){    
         iceB[3].removed=true;
         iceB[3].position.x=5000;
         iceB[3].position.y=5000;
       //  iceB[3].changeAnimation('normal');
       }
    if (py==iceB[4].position.y-10&&px>iceB[4].position.x-50&&px<iceB[4].position.x+50){
        iceB[4].changeAnimation('melty');
        iceB[4].animation.frameDelay=20;
    }
   if(iceB[4].animation.getFrame()===11){    
     iceB[4].removed=true;
     iceB[4].position.x=5000;
     iceB[4].position.y=5000;
   //  iceB[4].changeAnimation('normal');
   }
   if (py==iceB[5].position.y-10&&px>iceB[5].position.x-50&&px<iceB[5].position.x+50){
    iceB[5].changeAnimation('melty');
    iceB[5].animation.frameDelay=20;
        }
        if(iceB[5].animation.getFrame()===11){    
        iceB[5].removed=true;
        iceB[5].position.x=5000;
        iceB[5].position.y=5000;
        //  iceB[5].changeAnimation('normal');
        }
        for(let i=0; i<6;i++){
          if(state==4){
              iceB[i].changeAnimation('normal');
              iceB[i].removed=false;
              iceB[0].position.x=331;
              iceB[0].position.y=156;
              iceB[1].position.x=892;
              iceB[1].position.y=119;
              iceB[2].position.x=739;
              iceB[2].position.y=198;
              iceB[3].position.x=488;
              iceB[3].position.y=282;
              iceB[4].position.x=988;
              iceB[4].position.y=297;
              iceB[5].position.x=846;
              iceB[5].position.y=246;
          }
      }
  
      if (py==iceD[1].position.y-20&&px>iceD[1].position.x-50&&px<iceD[1].position.x+50){
              iceD[1].changeImage('melty');
              iceD[1].animation.frameDelay=20;
           }
          if(iceD[1].animation.getFrame()===11){    
              iceD[1].removed=true;
              iceD[1].position.x=5000;
              iceD[1].position.y=5000;
           //   iceD[1].changeImage('normal');
          }
          if (py==iceD[2].position.y-20&&px>iceD[2].position.x-50&&px<iceD[2].position.x+50){
            iceD[2].changeImage('melty');
            iceD[2].animation.frameDelay=20;
         }
        if(iceD[2].animation.getFrame()===11){    
            iceD[2].removed=true;
            iceD[2].position.x=5000;
            iceD[2].position.y=5000;
         //   iceD[2].changeImage('normal');
        }
        if (py==iceD[3].position.y-20&&px>iceD[3].position.x-50&&px<iceD[3].position.x+50){
            iceD[3].changeImage('melty');
            iceD[3].animation.frameDelay=20;
         }
        if(iceD[3].animation.getFrame()===11){    
            iceD[3].removed=true;
            iceD[3].position.x=5000;
            iceD[3].position.y=5000;
         //   iceD[3].changeImage('normal');
        }
        if (py==iceD[4].position.y-20&&px>iceD[4].position.x-50&&px<iceD[4].position.x+50){
            iceD[4].changeImage('melty');
            iceD[4].animation.frameDelay=20;
         }
        if(iceD[4].animation.getFrame()===11){    
            iceD[4].removed=true;
            iceD[4].position.x=5000;
            iceD[4].position.y=5000;
         //   iceD[4].changeImage('normal');
        }
        if (py==iceD[5].position.y-20&&px>iceD[5].position.x-50&&px<iceD[5].position.x+50){
            iceD[5].changeImage('melty');
            iceD[5].animation.frameDelay=20;
         }
        if(iceD[5].animation.getFrame()===11){    
            iceD[5].removed=true;
            iceD[5].position.x=5000;
            iceD[5].position.y=5000;
         //   iceD[5].changeImage('normal');
        }
        if (py==iceD[6].position.y-20&&px>iceD[6].position.x-50&&px<iceD[6].position.x+50){
            iceD[6].changeImage('melty');
            iceD[6].animation.frameDelay=20;
         }
        if(iceD[6].animation.getFrame()===11){    
            iceD[6].removed=true;
            iceD[6].position.x=5000;
            iceD[6].position.y=5000;
         //   iceD[6].changeImage('normal');
        }
        if (py==iceD[7].position.y-20&&px>iceD[7].position.x-50&&px<iceD[7].position.x+50){
            iceD[7].changeImage('melty');
            iceD[7].animation.frameDelay=20;
         }
        if(iceD[7].animation.getFrame()===11){    
            iceD[7].removed=true;
            iceD[7].position.x=5000;
            iceD[7].position.y=5000;
         //   iceD[7].changeImage('normal');
        }
        if (py==iceD[8].position.y-20&&px>iceD[8].position.x-50&&px<iceD[8].position.x+50){
            iceD[8].changeImage('melty');
            iceD[8].animation.frameDelay=20;
         }
        if(iceD[8].animation.getFrame()===11){    
            iceD[8].removed=true;
            iceD[8].position.x=5000;
            iceD[8].position.y=5000;
         //   iceD[8].changeImage('normal');
        }
        if (py==iceD[9].position.y-20&&px>iceD[9].position.x-50&&px<iceD[9].position.x+50){
            iceD[9].changeImage('melty');
            iceD[9].animation.frameDelay=20;
         }
        if(iceD[9].animation.getFrame()===11){    
            iceD[9].removed=true;
            iceD[9].position.x=5000;
            iceD[9].position.y=5000;
         //   iceD[9].changeImage('normal');
        }
        if (py==iceD[10].position.y-20&&px>iceD[10].position.x-50&&px<iceD[10].position.x+50){
            iceD[10].changeImage('melty');
            iceD[10].animation.frameDelay=20;
         }
        if(iceD[10].animation.getFrame()===11){    
            iceD[10].removed=true;
            iceD[10].position.x=5000;
            iceD[10].position.y=5000;
         //   iceD[10].changeImage('normal');
        }
        if (py==iceD[11].position.y-20&&px>iceD[11].position.x-50&&px<iceD[11].position.x+50){
            iceD[11].changeImage('melty');
            iceD[11].animation.frameDelay=20;
         }
        if(iceD[11].animation.getFrame()===11){    
            iceD[11].removed=true;
            iceD[11].position.x=5000;
            iceD[11].position.y=5000;
         //   iceD[11].changeImage('normal');
        }
    
          for(let i=0; i<12; i++){
          if(state==4){
              iceD[i].changeImage('normal');
             iceD[i].removed=false;
              iceD[0].position.x=331;
              iceD[0].position.y=166;
              iceD[1].position.x=892;
              iceD[1].position.y=129;
              iceD[2].position.x=739;
              iceD[2].position.y=208;
              iceD[3].position.x=488;
              iceD[3].position.y=292;
              iceD[4].position.x=988;
              iceD[4].position.y=307;
              iceD[5].position.x=846;
              iceD[5].position.y=256;
              iceD[6].position.x=245;
              iceD[6].position.y=281;
              iceD[7].position.x=618;
              iceD[7].position.y=183;
              iceD[8].position.x=365;
              iceD[8].position.y=346;
              iceD[9].position.x=912;
              iceD[9].position.y=123;
              iceD[10].position.x=669;
              iceD[10].position.y=373;
              iceD[11].position.x=192;
              iceD[11].position.y=412;
          }
          
       }
}