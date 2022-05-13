//random number generator
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

// Ball diretion randomiser
function ballDirection(){
	if(getRandomInt(0,1) == 1){
		return 5
	}
	else {
		return -5
	}
}

// Function for drawing (rectangular) objects on screen
function drawRect(Rect){
	ctx.beginPath();
	ctx.fillStyle = Rect.color;
	ctx.fillRect(Rect.x, Rect.y, Rect.width, Rect.height);
}
