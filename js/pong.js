// canvas setup

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const height = canvas.clientHeight; 
const width = canvas.clientWidth; 

const speed = .005 * height; 

if(width > height){
	const hor = true; 
}
if(height > width){
	var hor = false;
}
console.log(hor);
// set canvas height and width to the vp if not already set
function resizeCanvasToDisplaySize(canvas, width, height){
	if (canvas.width !== width || canvas.height !== height){
		canvas.width = width;
		canvas.height = height;
		return true;
	}
	return false;
}

//Random number generator
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

// function to create paddle 
//function constructPaddle(x){
//	return {
//		x: x,
//		y: (height/2) - (.16 * height),
//		width: .0083 * width,
//		height: .16 * height,
//		ve: speed,
//		//color: "#c7cccb",
//		color:"#048a81",
//		dormant: false,
//	}
//	
//}

function constructPaddle(x){
	if(width > height){
	return {
		x: x * width,
		y: (height/2) - (.16 * height),
		width: .0083 * width,
		height: .16 * height,
		ve: speed,
		//color: "#c7cccb",
		color:"#048a81",
		dormant: false,
	}	
	}
	else if(height > width){
		return{
		x: (width/2) - (.16 * width),
		y: x * height,
		height: .0083 * height,
		width: .16 * width,
		ve: speed,
		//color: "#c7cccb",
		color:"#048a81",
		dormant: false,
		}
	}
	
}

// Ball diretion randomiser
function ballDirection(speed){
	if(getRandomInt(0,1) == 1){
		return speed
	}
	else {
		return -1 * speed 
	}
}
// Function for drawing (rectangular) objects on screen
function drawRect(Rect){
	ctx.beginPath();
	ctx.fillStyle = Rect.color;
	ctx.fillRect(Rect.x, Rect.y, Rect.width, Rect.height);
}


// moves ball, if the ball and reduces speed by 1/2 if the ball has not yet bounced off a paddle to make sure that the paddle hits the ball

function moveBall(){

	Ball.y += Ball.ve_y;
	Ball.x += Ball.ve_x

	// bounce ball if it collides with the roof or floor
	if(width >= height){
	if (Ball.y >= height - Ball.height){
		Ball.ve_y = Ball.ve_y * -1;

	}
	if (Ball.y <= 0){
		Ball.ve_y = Ball.ve_y * -1 ;
	}
}
	else if(height > width){
		if(Ball.x >= width - Ball.width){
			Ball.ve_x = Ball.ve_x * -1;
		}
		else if(Ball.x <= 0){
			Ball.ve_x = Ball.ve_x * -1;
		}
	}

}
// check if paddle is coliding with the roof or floor and stop it from going through
function paddleBoundsCollisionCorrection(paddle){
	if(width >= height){
	if(paddle.y > height - paddle.height){
		paddle.y = height - paddle.height;
	}
	if(paddle.y < 0){
		paddle.y = 0;

	}
	}
	else if(height > width){
		if (paddle.x > width - paddle.width){
			paddle.x = width - paddle.width;
		}
		if(paddle.x < 0){
			paddle.x = 0;
		}
	}
	
}

// collision detection between paddle and ball that also makes the paddle dormant while taking the other paddle out of dormancy
function BallPaddleBouncer(paddle, otherPaddle){
	if (Ball.x < paddle.x + paddle.width  && Ball.x + Ball.width  > paddle.x && Ball.y < paddle.y + paddle.height && Ball.y + Ball.height > paddle.y){
		if(width >= height){
			Ball.ve_x = Ball.ve_x * -1;
			
		}
		else if(height >= width){
			Ball.ve_y = Ball.ve_y * -1;

		}
		paddle.dormant = true;
		otherPaddle.dormant = false;
		Ball.initial = false;
			
	}
}



// Paddle AI
function paddleAI(paddle){
	if(width > height){
	if (Ball.y  >= paddle.y + (1/2 * paddle.height) && paddle.dormant === false) {
		paddle.y = paddle.y + paddle.ve;
			
	}

	else if (Ball.y <= paddle.y + (1/2 * paddle.height) && paddle.dormant === false){
		paddle.y = paddle.y - paddle.ve;
	}
}
	if(height > width){
	if (Ball.x  >= paddle.x + (1/2 * paddle.width) && paddle.dormant === false) {
		paddle.x = paddle.x + paddle.ve;
			
	}

	else if (Ball.x <= paddle.x + (1/2 * paddle.width) && paddle.dormant === false){
		paddle.x = paddle.x - paddle.ve;
	}

	}
}
function drawText(){
	ctx.fillStyle = "#048a81";
	const fontSize = .0338 * width;
	ctx.font = "300 " + fontSize + "px Ubuntu";
	ctx.textAlign = "center";
	ctx.fillText("Zain Jadoon. Idiot By Day,", width/4, canvas.height/3);		
	ctx.fillText("Programmer By Night.", 2/9 * width, 2/5 * canvas.height);		
}


resizeCanvasToDisplaySize(canvas, width, height)

// Declaring objects for Ball and paddles to store data
const Paddle_1 = constructPaddle(.982 );
const Paddle_2 = constructPaddle(.008 );

const Ball = {
	// positionin.16 * heightg
	x: getRandomInt(.44 * width , .75 * width),
	//y: .5 * height,
	y: getRandomInt(1/4 * height ,  3/4 * height),
    width: .0156 * Math.max(width, height),
	height:.0156 * Math.max(width, height),
	ve_x: ballDirection(speed),
	ve_y: ballDirection(speed),
	color: "#EE6352",
	initial: true
}

// Loop


function main(){
	ctx.clearRect(0,0, width, height); // Clears screen for new frame
	
	if (Ball.x <= .2 * width){
		Paddle_1.dormant = false;
	}
	if(Ball.x >=.8 * width){
		Paddle_2.dormant = false;
	}
	// draw Objects 
	drawRect(Ball);
	drawRect(Paddle_1);
	drawRect(Paddle_2);
	
	//move objects 
	 moveBall();
	 paddleAI(Paddle_1);
	 paddleAI(Paddle_2);	

	 // Ball Collisions with the roof and paddles
	 paddleBoundsCollisionCorrection(Paddle_1);
	 paddleBoundsCollisionCorrection(Paddle_2);

	 BallPaddleBouncer(Paddle_1, Paddle_2);
	 BallPaddleBouncer(Paddle_2, Paddle_1);

	 //drawText();
	 requestAnimationFrame(main); // asks for functioncall when it is time for re-paint
}
Ball.initial = true;

main();// runs main function

console.log(height);
console.log(width);
