window. onload = function ()
{
var canvas = document.getElementById("myCanvas"); // sets which div in the html the canvas will go in
var context = canvas.getContext("2d"); // creates 2D canvas and calls it "context"

//Rocket coordinates
var xcoord=388; 
var ycoord=180; 

var xBulletInit = 398;
var yBulletInit = 168;

var nModObsX = -0; 
var nModObsY = -2; 


// NOTE: AUDIO MAKES THE GAME LAG SLIGHTLY AS THERE ARE MANY AUDIO SOUNDS PLAYING 
// AT ONCE. REMOVING ALL 'soundfilename'.play() FROM THIS JAVASCRIPT FILE WILL FIX THIS 
// (where 'soundfilename' is one of the 6 variables below)

var bangSmall = new Audio("bangSmall.wav"); 
var bangMedium = new Audio("bangMedium.wav"); 
var bangLarge = new Audio("bangLarge.wav"); 
var fire = new Audio("fire.wav"); 
var saucerSmall = new Audio("saucerSmall.wav"); 
var thrustSound = new Audio("thrust.wav"); 

saucerSmall.volume = 0.5;

var space = false;
var left = false;
var right = false;
var up = false;

var down = false;

var deg = 0;

var xPos;
var yPos;
    
var bulletIncrement = -1;

var thrust = 0;
var lowerThrust = false;

var thrustDeg = 0;

var slowThrust = false;
var midThrust = false;

var thrustStarting = false;

var activeBullets = [];

var activeAsteroids = [];
var destroyedAsteroids = [];
var asteroidCount;

var gameLife = 3;
var lifePosX = 50;
var lifePosY = 5;

var gameScore;

var rocketExplode;
var rocketExplCounter;
var rocketExplX;
var rocketExplY;

var curLevel = 1;
var levelDisplay = false;
var levelDispCount;
var curScore = 0;
var curScoreString;

var gameOver = false;
var goCounter;

var isUfo = false;
var ufoCounter;
var modUfo = 3;
var ufoXPos;
var ufoYPos = 70;
var ufoLife;
var ufoBullet1;
var ufoBullet2;
var ufoBullet3;
var ufoBullet4;
var ufoBullet5;
var ufoBullet6;

var obstacle1 = document.getElementById("obstacle1");
var obstacle1hit1 = document.getElementById("obstacle1hit1");
var obstacle1hit2 = document.getElementById("obstacle1hit2");
var obstacle2 = document.getElementById("obstacle2");
var obstacle2hit1 = document.getElementById("obstacle2hit1");
var obstacle2hit2 = document.getElementById("obstacle2hit2");
var obstacle3 = document.getElementById("obstacle3");
var obstacle3hit1 = document.getElementById("obstacle3hit1");
var obstacle3hit2 = document.getElementById("obstacle3hit2");
var rocketExplosionImg = document.getElementById("rocketExplosion");
var ufo = document.getElementById("ufo");
var ufohit1 = document.getElementById("ufohit1");
var ufohit2 = document.getElementById("ufohit2");
var flame = document.getElementById("flame");
var stones1 = document.getElementById("stones1");
var stones2 = document.getElementById("stones2");

var background = document.getElementById("background");

var video = document.getElementById("video");

window.addEventListener('keyup', function (key){

if (key.which == 32){
	space = false;
	bulletIncrement = -1;
	down = false;
	}

if (key.which == 37){left = false;}

if (key.which == 39){right = false;}

if (key.which == 38){up = false; lowerThrust = true;}

if (key.which == 40){down = false;}

});

window.addEventListener('keydown', function (key){

if (key.which == 32) {
	if(down) return;
    down = true;
	space = true; 
	activeBullets.push([-1, deg, xcoord, ycoord, xBulletInit, yBulletInit, 12, 20]);
	if(!gameOver && ! rocketExplode && !levelDisplay && (video.ended || video.paused)) {
		fire.play();
	}
	}

if (key.which == 37){left = true;}   

if (key.which == 39){right = true;}

if (key.which == 38){
	up = true; 
	lowerThrust = false; 
	if(deg != thrustDeg) {
		slowThrust = true;
	}
	if(!gameOver && ! rocketExplode && !levelDisplay && (video.ended || video.paused)) {
	thrustSound.play();
	}
}

});


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


function createAsteroid(asteroidType) {
	
	var index;
	var startxPos;
	var startyPos;
	var modX;
	var modY;
	var img;
	var rotate;
	var startDeg;
	var size;
	var life;
	
	if(asteroidType == 0) {
		index = 0;
		var rand = getRndInteger(0, 1); // returns a number between 0 and 1
		if(rand == 0) {startxPos = getRndInteger(-35, 265);}
		else {startxPos = getRndInteger(500, 800);}
		rand = getRndInteger(0, 1);
		if(rand == 0) {startyPos = getRndInteger(-35, 65);}
		else {startyPos = getRndInteger(300, 400);}
		rand = getRndInteger(0, 1);
		if(rand == 0) {rand = getRndInteger(0, 1);
		if(rand == 0){modX = 3;}
		else {modX = -3;}
		modY = getRndInteger(-3, 3);}
		else {rand = getRndInteger(0, 1);
		if(rand == 0){modY = 3;}
		else {modY = -3;}
		modX = getRndInteger(-3, 3);}
		rand = getRndInteger(0, 1);
		if(rand == 0) {rotate = 4;}
		else {rotate = -4;}
		size = 35;
		life = 1;}
	else if(asteroidType == 1) {
		index = 1;
		var rand = getRndInteger(0, 1);
		if(rand == 0) {startxPos = getRndInteger(-60, 240);}
		else {startxPos = getRndInteger(500, 800);}
		rand = getRndInteger(0, 1);
		if(rand == 0) {startyPos = getRndInteger(-60, 40);}
		else {startyPos = getRndInteger(300, 400);}
		rand = getRndInteger(0, 1);
		if(rand == 0) {rand = getRndInteger(0, 1);
		if(rand == 0){modX = 2;}
		else {modX = -2;}
		modY = getRndInteger(-2, 2);}
		else {rand = getRndInteger(0, 1);
		if(rand == 0){modY = 2;}
		else {modY = -2;}
	    modX = getRndInteger(-2, 2);}
		rand = getRndInteger(0, 1);
		if(rand == 0) {rotate = 3;}
		else {rotate = -3;}
		size = 60;
		life = 3;}
	else if(asteroidType == 2) {
		index = 2;
		var rand = getRndInteger(0, 1);
		if(rand == 0) {startxPos = getRndInteger(-90, 210);}
		else {startxPos = getRndInteger(500, 800);}
		rand = getRndInteger(0, 1);
		if(rand == 0) {startyPos = getRndInteger(-90, 10);}
		else {startyPos = getRndInteger(300, 400);}
		rand = getRndInteger(0, 1);
		if(rand == 0) {rand = getRndInteger(0, 1);
		if(rand == 0){modX = 1;}
		else {modX = -1;}
		modY = getRndInteger(-1, 1);}
		else {rand = getRndInteger(0, 1);
		if(rand == 0){modY = 1;}
		else {modY = -1;}
	    modX = getRndInteger(-1, 1);}
		rand = getRndInteger(0, 1);
		if(rand == 0) {rotate = 2;}
		else {rotate = -2;}
		size = 90;
		life = 6;}
		
	rand = getRndInteger(1, 3);
	
    if(rand == 1) {
		img = obstacle1;
	}		
	if(rand == 2) {
		img = obstacle2;
	}
	if(rand == 3) {
		img = obstacle3;
	}
	
	//Makes sure no asteroids travel completely horizontally/vertically
	if(modX == 0) {
		modX = 1;
	}
	if(modY == 0) {
		modY = 1;
	}
	
	startDeg = getRndInteger(0, 360);
	
	activeAsteroids.push([index, startxPos, startyPos, modX, modY, img, rotate, startDeg, size, life]);
	
}


function animateAsteroid(asteroid){
  
  //Move asteroid   
  asteroid[1] += asteroid[3];
  asteroid[2] += asteroid[4];
  
  size = asteroid[8];

  // Wrap-around for asteroid
  
  if (asteroid[1] > 800 + (size/2) ){
    asteroid[1] = -(size);
  }

  if (asteroid[1] < -(size)) {
    asteroid[1] = 800 + (size/2);
  }

  if (asteroid[2] > 400 + (size/2)) {
    asteroid[2] = -(size);
  }

  if(asteroid[2] < -(size)){
    asteroid[2] = 400 + (size/2);
  }
  
  //Rotate asteroid
  asteroid[7] += asteroid[6];

  if (checkCollision(asteroid[1], asteroid[2], asteroid[8], asteroid[8])) {
	  return true;
  }
  else {
	  return false;
  }
  
}

function newLevel(levelNo) {
	
	curLevel = levelNo;
	activeAsteroids = [];
	var i;
	
	switch(levelNo) {
		case 1:
		  for(i = 0; i < 2; i++) {
			  createAsteroid(0);
		  }
          for(i = 0; i < 3; i++) {
			  createAsteroid(1);
		  }		
          for(i = 0; i < 1; i++) {
			  createAsteroid(2);
		  }				  
		  break;
		case 2:
		  for(i = 0; i < 2; i++) {
			  createAsteroid(0);
		  }
          for(i = 0; i < 3; i++) {
			  createAsteroid(1);
		  }		
          for(i = 0; i < 2; i++) {
			  createAsteroid(2);
		  }
		  break;
		case 3:
		  for(i = 0; i < 3; i++) {
			  createAsteroid(0);
		  }
          for(i = 0; i < 3; i++) {
			  createAsteroid(1);
		  }		
          for(i = 0; i < 2; i++) {
			  createAsteroid(2);
		  }
		  break;
		case 4:
		  for(i = 0; i < 4; i++) {
			  createAsteroid(0);
		  }
          for(i = 0; i < 3; i++) {
			  createAsteroid(1);
		  }		
          for(i = 0; i < 2; i++) {
			  createAsteroid(2);
		  }
		  break;
		case 5: 
		  for(i = 0; i < 4; i++) {
			  createAsteroid(0);
		  }
          for(i = 0; i < 4; i++) {
			  createAsteroid(1);
		  }		
          for(i = 0; i < 3; i++) {
			  createAsteroid(2);
		  }
		  break;
		case 6:
		  for(i = 0; i < 5; i++) {
			  createAsteroid(0);
		  }
          for(i = 0; i < 4; i++) {
			  createAsteroid(1);
		  }		
          for(i = 0; i < 3; i++) {
			  createAsteroid(2);
		  }
		  break;
		case 7:
		  for(i = 0; i < 5; i++) {
			  createAsteroid(0);
		  }
          for(i = 0; i < 5; i++) {
			  createAsteroid(1);
		  }		
          for(i = 0; i < 3; i++) {
			  createAsteroid(2);
		  }
		  break;
		case 8:
		  for(i = 0; i < 6; i++) {
			  createAsteroid(0);
		  }
          for(i = 0; i < 5; i++) {
			  createAsteroid(1);
		  }		
          for(i = 0; i < 4; i++) {
			  createAsteroid(2);
		  }
		  break;
		case 9:
		  for(i = 0; i < 7; i++) {
			  createAsteroid(0);
		  }
          for(i = 0; i < 5; i++) {
			  createAsteroid(1);
		  }		
          for(i = 0; i < 4; i++) {
			  createAsteroid(2);
		  }
		  break;
		case 10:
		  for(i = 0; i < 8; i++) {
			  createAsteroid(0);
		  }
          for(i = 0; i < 6; i++) {
			  createAsteroid(1);
		  }		
          for(i = 0; i < 4; i++) {
			  createAsteroid(2);
		  }
		  break;
		case 11:
		  goCounter = 0;
		  gameOver = true;
		  break;
	}
	
	resetGame();
	
	levelDisplay = true;
	levelDispCount = 0;
	
	if(levelNo > 2) {
		initUfo();
	}
	
}

function resetGame() {
	deg = 0;
	xcoord=388;
    ycoord=180;
	xBulletInit = 398;
	yBulletInit = 168;
	thrust = 0;
	activeBullets = [];
	destroyedAsteroids = [];
}

function checkCollision(x, y, sizeX, sizeY)
  {
	if(!rocketExplode) {
    if (xcoord > x && xcoord < (x+sizeX) && ycoord > y && ycoord < (y+sizeY)) 
    {
	rocketExplCounter = 0;
	rocketExplode = true;
	rocketExplX = xcoord;
	rocketExplY = ycoord;
    bangSmall.play();
	var length = activeAsteroids.length;
	var prevAsteroids = activeAsteroids;
	activeAsteroids = [];
	
	for(var i = 0; i < length; i++) {
		createAsteroid(prevAsteroids[i][0]);
	}
	
	return true;
  }
	}
	
	return false;
  }
  
function checkBulletCollision(bulletX, bulletY)
  {
	
	for(i = 0; i < activeAsteroids.length; i++) {
		
	var xcoordObs = activeAsteroids[i][1];
	var ycoordObs = activeAsteroids[i][2];
	var sizeObs = activeAsteroids[i][8];
	
	// Bullet and asteroid collision
	if (bulletX > xcoordObs && bulletX < (xcoordObs+sizeObs) && bulletY > ycoordObs && bulletY < (ycoordObs+sizeObs)) 
    {
	  updateAsteroid(activeAsteroids[i], i);
      return true;
    }	
	
  }
  
  // Bullet and UFO collision
  if (bulletX > ufoXPos && bulletX < (ufoXPos+45) && bulletY > ufoYPos && bulletY < (ufoYPos+20)) {
	  ufoLife --;
	  if(ufoLife == 0) {
	    isUfo = false;
	    curScore += 200;
	  }
	  return true;
  }
  
  // Bullet and rocket collision 
  if (bulletX > xcoord && bulletX < (xcoord+24) && bulletY > ycoord && bulletY < (ycoord+40)) {
	  rocketExplCounter = 0;
	  rocketExplode = true;
	  rocketExplX = xcoord;
	  rocketExplY = ycoord;
      snd.play();
	  return true;
  }
  
  
  return false;
  
  }
  
function updateAsteroid(asteroid, index) {
	
	asteroid[9] = asteroid[9] - 1;
	
	var img = asteroid[5];
	var size = asteroid[8];
	var life = asteroid[9];

	  if(asteroid[8] == 90) {
		  if(asteroid[9] < 5){
			  if(asteroid[5] == obstacle1) {
				  asteroid[5] = obstacle1hit1;
			  }
			  if(asteroid[5] == obstacle2) {
				  asteroid[5] = obstacle2hit1;
			  }
			  if(asteroid[5] == obstacle3) {
				  asteroid[5] = obstacle3hit1;
			  }
		  }
		  if(asteroid[9] < 3){
			  if(asteroid[5] == obstacle1hit1) {
				  asteroid[5] = obstacle1hit2;
			  }
			  if(asteroid[5] == obstacle2hit1) {
				  asteroid[5] = obstacle2hit2;
			  }
			  if(asteroid[5] == obstacle3hit1) {
				  asteroid[5] = obstacle3hit2;
			  }
		  }
	  }
	  if(asteroid[8] == 60) {
		  if(asteroid[9] < 3){
			  if(img == obstacle1) {
				  asteroid[5] = obstacle1hit1;
			  }
			  if(img == obstacle2) {
				  asteroid[5] = obstacle2hit1;
			  }
			  if(img == obstacle3) {
				  asteroid[5] = obstacle3hit1;
			  }
		  }
		  if(asteroid[9] < 2){
			  if(img == obstacle1hit1) {
				  asteroid[5] = obstacle1hit2;
			  }
			  if(img == obstacle2hit1) {
				  asteroid[5] = obstacle2hit2;
			  }
			  if(img == obstacle3hit1) {
				  asteroid[5] = obstacle3hit2;
			  }
		  }
	  }
	  
	  if(life == 0) {
		  
      if(size == 35) {
		  curScore += 20;
		  bangSmall.play();
	  }
	  if(size == 60) {
		  curScore += 60;
		  bangMedium.play();
	  }
	  if(size == 90) {
		  curScore += 120;
		  bangLarge.play();
	  }
	  
	  destroyedAsteroids.push(-1, asteroid);
	  
	  activeAsteroids.splice(index, 1);
	  
	  if (activeAsteroids.length == 0) {
		  newLevel(curLevel+1);
	  }
	  }
}
  

function draw() {

  setTimeout(function() {
	   
  requestAnimationFrame(draw);
  context.clearRect(0, 0, canvas.width, canvas.height); // Clears canvas
  context.drawImage(background, 0, 0, 800, 400); 
  
  if(gameOver) {
	  context.font = "40px Impact";
	  context.textAlign = "Center";
	  curScoreString = curScore.toString();
	  context.fillText("Game Over! You Scored " + curScoreString, 175, 150);
  }
  else {
	if(levelDisplay) {
		context.font = "50px Impact";
		context.fillStyle = "Red";
		context.textAlign = "Center";
		context.fillText("Level " + curLevel, 325, 200);
		levelDispCount++;
		if(levelDispCount > 50) {
			levelDisplay = false;
		}
	}
	else {
		if(rocketExplode) {
		
		rocketExplCounter++;
		if(rocketExplCounter < 15) {
		context.drawImage(rocketExplosionImg, rocketExplX+6, rocketExplY+10, 12, 20);
		}
		else if(15 <= rocketExplCounter && rocketExplCounter < 30) {
		context.drawImage(rocketExplosionImg, rocketExplX+4, rocketExplY+8, 16, 24);
		}
		else if(30 <= rocketExplCounter && rocketExplCounter < 45) {
		context.drawImage(rocketExplosionImg, rocketExplX+2, rocketExplY+5, 20, 30);
		}
		else if(45 <= rocketExplCounter && rocketExplCounter < 60) {
		context.drawImage(rocketExplosionImg, rocketExplX, rocketExplY, 24, 40);
		}
		else if(60 <= rocketExplCounter) {
			rocketExplode = false;
			gameLife--;	
			if(gameLife == 0) {
				goCounter = 0;
				gameOver = true;
			}
			else {
			resetGame();
			}
		}
	}
else {	
	for(i = 0; i < activeAsteroids.length; i++) { 
	var asteroid = activeAsteroids[i];
	//If there was a collision, do not draw asteroids until rocket has reset 
	if (animateAsteroid(asteroid)) {
		break;
	}
	else {
	context.save();
	context.translate((asteroid[1]+(asteroid[8]/2)), (asteroid[2]+(asteroid[8]/2)));
	context.rotate(asteroid[7]*Math.PI/180);
    context.drawImage(asteroid[5], -asteroid[8]/2, -asteroid[8]/2, asteroid[8], asteroid[8]); 
	context.stroke();
	context.restore();
	}
	}
	
	for(var as = 0; as < destroyedAsteroids.length; as++) {
		var astCounter = destroyedAsteroids[as][0]++;
		if(astCounter < 20) {
			context.drawImage(stones1, destroyedAsteroids[as][1], destroyedAsteroids[as][2],
			destroyedAsteroids[as][8], destroyedAsteroids[as][8]);
		}
		else if(astCounter >= 20 && astCounter < 40) {
			context.drawImage(stones2, destroyedAsteroids[as][1], destroyedAsteroids[as][2],
			destroyedAsteroids[as][8], destroyedAsteroids[as][8]);
		}
		else {
			destroyedAsteroids.splice(as, 1);
		}
	}
	
	//UFO should not appear when there are less than 4 asteroids; it is too easy to destroy otherwise!
	if(activeAsteroids.length < 4 && ufoCounter > 579) {
		isUfo = false;
	}
	
	if(isUfo) {
		ufoCounter++;
		if(ufoCounter > 300) {
			saucerSmall.play();
			ufoXPos += modUfo;
			checkCollision(ufoXPos-20, ufoYPos-20, 45, 20);
			var ufoImg;
			switch(ufoLife) {
				case 3:
				ufoImg = ufo;
				break;
				case 2:
				ufoImg = ufohit2;
				break;
				case 1:
				ufoImg = ufohit1;
				break;
			}
			context.drawImage(ufoImg, ufoXPos, ufoYPos, 45, 20);
			context.stroke();
			
			if(ufoCounter == ufoBullet1 || ufoCounter == ufoBullet2 || 
			ufoCounter == ufoBullet3 || ufoCounter == ufoBullet4 ||
			ufoCounter == ufoBullet5 || ufoCounter == ufoBullet6) {
				activeBullets.push([-1, 180, ufoXPos, ufoYPos, ufoXPos+20, ufoYPos-22, 22, 10]);
			}
		
			if(ufoCounter > 580) {
				initUfo();
			}
		}
	}
	
if (left && !right) {
rotateImg("left");
}

if(right){
rotateImg("right");
}

if (up){
	
if(!slowThrust && !midThrust) {
thrust += 0.2;
}
if(thrust > 6) {
	thrust = 6;
}
if(thrust < 0) {
	thrust = 0;
}
moveImg();

}

//Wrap-around for rocket 

if(xcoord > 790) {
	if(ycoord > 300) {
		ycoord = 50;
		yBulletInit = 38;
	}
	if(ycoord < 50) {
		ycoord = 300;
		yBulletInit = 288;
	}
	xcoord = -40;
	xBulletInit = -30;
}
if(xcoord < -40) {
	if(ycoord > 300) {
		ycoord = 50;
		yBulletInit = 38;
	}
	if(ycoord < 50) {
		ycoord = 300;
		yBulletInit = 288;
	}
	xcoord = 790;
	xBulletInit = 800;
}
if(ycoord > 390) {
	if(xcoord > 650) {
		xcoord = 100;
		xBulletInit = 110;
	}
	if(xcoord < 100) {
		xcoord = 650;
		xBulletInit = 660;
	}
	ycoord = -40;
	yBulletInit = -52;
}
if(ycoord < -40) {
	if(xcoord > 650) {
		xcoord = 100;
		xBulletInit = 110;
	}
	if(xcoord < 100) {
		xcoord = 650;
		xBulletInit = 660;
	}
	ycoord = 390;
	yBulletInit = 378;
}


if (lowerThrust) {
	thrust -= 0.1;
	moveImg();
	if(thrust <= 0) {
		lowerThrust = false;
	}
}

if (slowThrust) {
	thrust -= 0.1;
	if(thrust <= 2.5) {
		slowThrust = false;
		thrustDeg = deg; 
	}
}

	var rocket = document.getElementById("rocket");
	var obstacle = document.getElementById("obstacle1");
    context.fillStyle = "Red"; // Sets fill style to red	
	 
	
	
	shootBullet();
	
	//For drawing a flame behind the rocket when it is accelerating
	if(up) {
	  context.save();
	  context.translate(xcoord+12,ycoord+20);
	  context.rotate(0);
	  context.rotate((deg+180)*Math.PI/180);
	  context.drawImage(flame,-5,-55, 10, 40);
	  context.stroke();
	  context.restore();
	}
	
	//Drawing the rocket itself
	context.save();
	context.translate(xcoord+12,ycoord+20);
	context.rotate(0);
	context.rotate(deg*Math.PI/180);
	context.drawImage(rocket,-12,-20, 24, 40);
	context.stroke();
	context.restore();
	
	//Displaying the score
	context.save();
	context.font = "30px Impact";
	context.textAlign = "Center";
	curScoreString = curScore.toString();
	context.fillText(curScoreString, 700, 50);
	context.restore();

	//Displaying the life hearts
	for(var l = 0; l < gameLife; l++) {
		context.drawImage(heart, lifePosX+(60*l), lifePosY, 50, 75);
	}

  }}}}, 1000/60);
  }
  
  function gameIntro() {
	  if(video.ended || space) { 
	    video.pause();
	    newLevel(curLevel);
        draw();
	    return false; 
	  }
	  
	  context.drawImage(video, 0, 0, 800, 400);
	  
	  context.font = "30px Impact";
	  context.fillStyle = "Red";
	  context.textAlign = "Center";
	  context.fillText("Press the space bar to skip", 230, 380);
	  
	  setTimeout(gameIntro, 20);
  }
  
  gameIntro();


function rotateImg(dir) {
	var rocket = document.getElementById("rocket");
	
	if(dir == "left") {
		deg-=10;
		if(deg <= -360) {
			deg = 0;
		}
	}
	else {
		deg+=10;
		if(deg >= 360) {
			deg = 0;
		}
	}
}

function moveImg() {
	var rocket = document.getElementById("rocket");
	xcoord += thrust * Math.cos((thrustDeg-90)*Math.PI/180);
    ycoord += thrust * Math.sin((thrustDeg-90)*Math.PI/180);
	xBulletInit += thrust * Math.cos((thrustDeg-90)*Math.PI/180);
	yBulletInit += thrust * Math.sin((thrustDeg-90)*Math.PI/180);
}

function shootBullet() {
	var bullet = document.getElementById("bullet");
	
	for(j = 0; j < activeBullets.length; j++) {
		
	activeBullets[j][0] = activeBullets[j][0] + 1;
	bulletIncrement = activeBullets[j][0];
	bulletDeg = activeBullets[j][1];
	curxCoord = activeBullets[j][2];
	curyCoord = activeBullets[j][3];
	curxBulletInit = activeBullets[j][4];
	curyBulletInit = activeBullets[j][5];
	var rotX = activeBullets[j][6];
	var rotY = activeBullets[j][7];
	
	var bulletxCoord = (curxBulletInit + (bulletIncrement * (10 * Math.cos((-90)*Math.PI/180))));
    var bulletyCoord = (curyBulletInit + (bulletIncrement * (10 * Math.sin((-90)*Math.PI/180))));    
	      
	context.save();
    context.translate(curxCoord+rotX, curyCoord+rotY);
	context.rotate(bulletDeg*Math.PI/180);
	context.drawImage(bullet, bulletxCoord-curxCoord-rotX, bulletyCoord-curyCoord-rotY, 4, 12);	
	context.restore();
	
	var wasCollision = checkBulletCollision(
	                     calcBulletPos(true, curxCoord+rotX, curyCoord+rotY, (bulletIncrement+3) * 10, bulletDeg),
	                     calcBulletPos(false, curxCoord+rotX, curyCoord+rotY, (bulletIncrement+3) * 10, bulletDeg));
	
	if(wasCollision || bulletIncrement > 48) {
		activeBullets.splice(j, 1);
		j--;
	}
	
	}
	
}

function calcBulletPos(returnX, startX, startY, length, bulletDeg) {
	
	endX = startX + (length * Math.cos((bulletDeg-90)*Math.PI/180));
	endY = startY + (length * Math.sin((bulletDeg-90)*Math.PI/180));
	
	if(returnX) {
		return endX;
	}
 	else {
		return endY;
	}
}

function initUfo() {
	isUfo = true;
	ufoCounter = 0;
	ufoXPos = -50;
	ufoLife = 3;
	ufoBullet1 = getRndInteger(310, 355);
	ufoBullet2 = getRndInteger(360, 400);
	ufoBullet3 = getRndInteger(405, 445);
	ufoBullet4 = getRndInteger(450, 490);
	ufoBullet5 = getRndInteger(495, 535);
	ufoBullet6 = getRndInteger(540, 580);
	
}



}