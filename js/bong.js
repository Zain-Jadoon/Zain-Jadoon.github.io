// canvas setup

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// getting client width and height 
const height = canvas.clientHeight; // 995
const width = canvas.clientWidth; // 1920
let speed = .005 * height; 

// FUNCTIONS (other than loop)
function resizeCanvasToDisplaySize(canvas, width, height){
	if (canvas.width !== width || canvas.height !== height){
		canvas.width = width;
		canvas.height = height;
		return true;
	}
	return false;
}


//random number generator
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
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

// Declaring objects for Ball and paddles to store data

resizeCanvasToDisplaySize(canvas, width, height)
const Ball = {
	// positionin.16 * heightg
	x: getRandomInt(.44 * width , .75 * width),
	//y: .5 * height,
	y: getRandomInt(1/4 * height ,  3/4 * height),
    width: .0156 * Math.max(width, height),
	height:.0156 * Math.max(width, height),
	ve_x: ballDirection(speed * 3/4),
	ve_y: ballDirection(speed),
	color: "#01ace9",
	initial: true
}




const Paddle_1 = {
	x: .982 * width,
	y: (height / 2) - (.16 * height),
	width: .0083 * width,
	height: .16 * height,
	ve: speed,
	color:"#c7cccb",
	dormant: false
}

const Paddle_2 = {
	x: .008 * width,
	y: (height / 2) - (.16 * height),
	width: .0083 * width,
	height: .16 * height,
	ve: speed, 
	color:"#c7cccb",
	dormant: false
}



// Loop
function update(){
	ctx.clearRect(0,0, width, height); // Clears screen for new frame

	// draw Objects 
	drawRect(Ball);
	drawRect(Paddle_1);
	drawRect(Paddle_2);

	//change pos
	
	//requestAnimationFrame(update);
	// animate ball
	//
	if (Ball.initial === true){
		Ball.y -=  (1/2 * Ball.ve_y);
		Ball.x += (1/2 * Ball.ve_x);
		Ball.initial = false;
	
	}else{
		Ball.y -=Ball.ve_y;
		Ball.x +=Ball.ve_x
	}
		
	// Colition Between Roof & Floor
	if (Ball.y >= height - Ball.height){
		Ball.ve_y = Ball.ve_y * -1;

	}
	if (Ball.y <= 0){
		Ball.ve_y = Ball.ve_y * -1 ;
	}


	// colition detection (paddle 1) 
	if (Ball.x < Paddle_1.x + Paddle_1.width  && Ball.x + Ball.width  > Paddle_1.x && Ball.y < Paddle_1.y + Paddle_1.height && Ball.y + Ball.height > Paddle_1.y){
			Ball.ve_x = Ball.ve_x * -1;
			Paddle_1.dormant = true;
			Paddle_2.dormant = false;
			
	}
	
	// coltion detection (paddle 2)
	else if (Ball.x < Paddle_2.x + Paddle_2.width  && Ball.x + Ball.width  > Paddle_2.x && Ball.y < Paddle_2.y + Paddle_2.height && Ball.y + Ball.height > Paddle_2.y){
			Ball.ve_x = Ball.ve_x * -1;
			Paddle_2.dormant = true;
			Paddle_1.dormant = false;
	}


		//Paddle AI	
	//
	//
	  
		if (Ball.y  >= Paddle_1.y + (1/2 * Paddle_1.height) && Paddle_1.dormant === false) {
			Paddle_1.y = Paddle_1.y + Paddle_1.ve;
			
		}

		else if (Ball.y <= Paddle_1.y + (1/2 * Paddle_1.height)  && Paddle_1.dormant === false ){
			Paddle_1.y = Paddle_1.y - Paddle_1.ve;
		}


		if (Ball.y  >= Paddle_2.y + (1/2 * Paddle_1.height) && Paddle_2.dormant === false){
			Paddle_2.y = Paddle_2.y + Paddle_2.ve
		}
		else if (Ball.y <= Paddle_2.y + (1/2 * Paddle_1.height) && Paddle_2.dormant === false ){
			Paddle_2.y = Paddle_2.y - Paddle_2.ve
		}
		
		// make sure paddle does not phase through the canvas
		if (Paddle_1.y > height - Paddle_1.height){
			Paddle_1.y = height - Paddle_1.height;
		}
		if (Paddle_2.y > height - Paddle_2.height){
			Paddle_2.y = height - Paddle_2.height
		}
	
	ctx.fillStyle = "#01ace9";
	let fontSize = .0338 * width;
	ctx.font = "300 " + fontSize + "px Ubuntu";
	ctx.textAlign = "center";
	ctx.fillText("Zain Jadoon. Idiot By Day,", width/4, canvas.height/3);		
	ctx.fillText("Programmer By Night.", 2/9 * width, 2/5 * canvas.height);		


	
		
	requestAnimationFrame(update); // asks for functioncall when it is time for re-paint

	
}
update();// runs update function
console.log(height);
console.log(width);

initial = true;
