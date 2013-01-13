/**
 * Playing Asteroids while learning JavaScript object model.
 */

/** sho
 * Shim layer, polyfill, for requestAnimationFrame with setTimeout fallback.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */ 
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();



/**
 * Shim layer, polyfill, for cancelAnimationFrame with setTimeout fallback.
 */
window.cancelRequestAnimFrame = (function(){
  return  window.cancelRequestAnimationFrame || 
          window.webkitCancelRequestAnimationFrame || 
          window.mozCancelRequestAnimationFrame    || 
          window.oCancelRequestAnimationFrame      || 
          window.msCancelRequestAnimationFrame     || 
          window.clearTimeout;
})();


//the goal and hits for the score
var goal = new Vector(750, 70); 
var hits=0; 
var bgSound = new Audio("sound/water.wav");
var wingSound = new Audio("sound/vingar.wav");
var timer = setInterval(secondCounter,1000);
var seconds = 60;

 // dragon image
	var dragonReady = false;
	var dragonImage = new Image();
	
	dragonImage.onload = function () {
	dragonReady = true;
	};
	dragonImage.src = "img/dragonfly.png";

	
	


/**
 * Trace the keys pressed
 * http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html
 */
window.Key = {
  pressed: {},

  LEFT:   37,
  UP:     38,
  RIGHT:  39,
  DOWN:   40,
  SPACE:  32,
  A:      65,
  S:      83,
  D:      68,
  W:      87,
  
  isDown: function(keyCode, keyCode1) {
    return this.pressed[keyCode] || this.pressed[keyCode1];
  },
  
  onKeydown: function(event) {
    this.pressed[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this.pressed[event.keyCode];
  }
};
window.addEventListener('keyup',   function(event) { Key.onKeyup(event); },   false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);



/**
 * All objects are Vectors
 */
function Vector(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Vector.prototype = {
  muls:  function (scalar) { return new Vector( this.x * scalar, this.y * scalar); }, // Multiply with scalar
  imuls: function (scalar) { this.x *= scalar; this.y *= scalar; return this; },      // Multiply itself with scalar
  adds:  function (scalar) { return new Vector( this.x + scalar, this.y + scalar); }, // Multiply with scalar
  iadd:  function (vector) { this.x += vector.x; this.y += vector.y; return this; }   // Add itself with Vector
}



/**
 * The forces around us.
 */
function Forces() {
  this.all = {};
}

Forces.prototype = {

  createAcceleration: function(vector) {
    return function(velocity, td) {
      velocity.iadd(vector.muls(td));
    }
  },

  createDamping: function(damping) {
    return function(velocity, td) {
      velocity.imuls(damping);
    }
  },

  createWind: function(vector) {
    return function(velocity, td) {
      velocity.iadd(vector.adds(td));
    }
  },  

  addAcceleration:  function(name, vector)  { this.all[name] = this.createAcceleration(vector); },
  addDamping:       function(name, damping) { this.all[name] = this.createDamping(damping); },
  addWind:          function(name, vector)  { this.all[name] = this.createWind(vector); },

  update: function(object, td) {
    for(var force in this.all) {
      if (this.all.hasOwnProperty(force)) {
        this.all[force](object, td);
      }
    }
  }

}

window.Forces = new Forces();
window.Forces.addAcceleration('gravity', new Vector(0, 9.82));
window.Forces.addDamping('drag', 0.97);
window.Forces.addWind('wind', new Vector(0.5, 0));



/**
 * A Player as an object.
 */
function Player(width, height, position, velocity, speed, direction, accelerateForce, breakForce, dampForce) {
  this.height     = height    || 32;
  this.width      = width     || 32;
  this.position   = position  || new Vector();
  this.velocity   = velocity  || new Vector();
  this.speed      = speed     || new Vector();
  this.direction  = direction || 0;
  this.accelerateForce  = accelerateForce || Forces.createAcceleration(new Vector(80, 80));
  this.breakForce       = breakForce      || Forces.createDamping(0.97);
  this.dampForce        = dampForce       || Forces.createDamping(0.999);
}

Player.prototype = {

  draw: function(ct) {
    var x = this.width/2, y = this.height/2;

    ct.save();
    ct.translate(this.position.x, this.position.y);
    ct.rotate(this.direction+Math.PI/2)
    
    ct.drawImage(dragonImage,x,y);


  
    ct.stroke();
    ct.restore();
    
     time = document.getElementById('time'); 
        
        
        if(seconds<1){
        		//h1 text
			document.getElementById("head_text").innerHTML="Game over! You got <span id='score2'>0</span> points!";
			document.getElementById("head_text").style.color= "red";
			//h2 text
			text = document.getElementById("under_text2");
			
			//If you get more then 4 points
			if(hits > 14){
				text.innerHTML ="Good job!";
			}
			//if you got less points
			else{
				text.innerHTML="It didn't go too well, did it?";
			}
			//Link shows
			document.getElementById("link").style.visibility="visible";
			
			//timer stays at 0 instead of continue ticking down
			time.innerHTML = 0;
			
			//show score
			scorey = document.getElementById('score2'); 
			scorey.innerHTML = hits; 
			
        }
        else{
        		//h1 text
        		document.getElementById("head_text").innerHTML="Dragonfly! Score: <span id='score1'>0</span>";
        		//h2 text
        		document.getElementById("under_text2").innerHTML="Didn't you know that dragonflies loves pink squares? Well they do! -- Move the dragonfly with the arrows and make him eat.";
        		//Link is hidden
        		document.getElementById("link").style.visibility="hidden";
        		//time is ticking down
        		time.innerHTML = seconds;
        		//get score
        		score = document.getElementById('score1');
        		
        		
        	

			       // if player hits goal
			if (
				this.position.x > goal.x -34
				&& this.position.x < goal.x+34 
				&& this.position.y> goal.y -25
				&& this.position.y < goal.y+25
			) {
				var Sound = new Audio("sound/eat.wav");
				    Sound.play();
				    
				//You get a point
				score.innerHTML = hits++;
				
				//The food changed to a random possition
				goal.x = Math.floor(((Math.random()*width)-10)+1); 
				goal.y = Math.floor(((Math.random()*height)-10)+1);
			}
			
			 else{
				 score.innerHTML= hits;
			 }
			    
			  
			    //The food
			    ct.beginPath(); 
			    ct.moveTo(goal.x, goal.y); 
			    ct.fillStyle="#eba9a9"; 
			    ct.fillRect(goal.x,goal.y,10,10);
			    
			    
			    ct.stroke();
			    ct.restore();
			    
			    
	}//end of else
  },


  moveForward: function() {
    this.dampForce(this.speed, td);
    this.position.x += this.speed.x * Math.cos(this.direction) * td;
    this.position.y += this.speed.y * Math.sin(this.direction) * td;
    this.position.iadd(this.velocity.muls(td));
  },

  rotateLeft:  function() { this.direction -= Math.PI/30; },
  rotateRight: function() { this.direction += Math.PI/30; },

  throttle: function(td)  { this.accelerateForce(this.speed, td); },
  breaks:   function(td)  { this.breakForce(this.speed, td); this.breakForce(this.velocity, td); },

  update: function(td, width, height) {
    if (Key.isDown(Key.UP, Key.W))     this.throttle(td);
    if (Key.isDown(Key.LEFT, Key.A))   this.rotateLeft();
    if (Key.isDown(Key.DOWN, Key.S))   this.breaks(td);
    if (Key.isDown(Key.RIGHT, Key.D))  this.rotateRight();
    Forces.update(this.velocity, td);
    this.moveForward(td);
    this.stayInArea(width, height);
  },

  stayInArea: function(width, height) {
    if(this.position.y < -this.height-50)  this.position.y = height+50;
    if(this.position.y > height+50)        this.position.y = -this.height-50;
    if(this.position.x > width+67)         this.position.x = -this.width-67;
    if(this.position.x < -this.width-67)   this.position.x = width+67;
  }
}



/**
 * Asteroids, the Game
 */
window.Asteroids = (function(){
  var canvas, ct, ctx, dragon, lastGameTick;
  
	 
	
	
	
   var init = function(canvas) {
    canvas = document.getElementById(canvas);
    ct = canvas.getContext('2d'); 
    width = canvas.width,
    height = canvas.height,
    dragon = new Player(dragonImage.width-67, dragonImage.height-50, new Vector(width/2, height/2));

    console.log('Init the game');
  };
  
	

  var update = function(td) {
    dragon.update(td, width, height);
  };

  var render = function() {
    ct.clearRect(0,0,width,height);
    dragon.draw(ct);
  };

  var gameLoop = function() {
    var now = Date.now();
    td = (now - (lastGameTick || now)) / 1000; // Timediff since last frame / gametick
    lastGameTick = now;
    requestAnimFrame(gameLoop);
    update(td);
    render();
  };

  return {
    'init': init,
    'gameLoop': gameLoop
  }
  
})();



//tiden går ner
function secondCounter(){
	
	seconds--
};







// On ready
$(function(){
  'use strict';

        
  Asteroids.init('canvas1');
  Asteroids.gameLoop();
  bgSound.play();
  bgSound.loop = true;
  wingSound.play();
  wingSound.loop = true;
  
  console.log('Ready to play.');  
});
