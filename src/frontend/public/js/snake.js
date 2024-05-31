let blockSize = 25;
let total_row = 35; //total row number 
let total_col = 70; //total column number 
let board;
let context;
let score = 0
let highscore = 0
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// Set the total number of rows and columns
let speedX = 0; //speed of snake in x coordinate.
let speedY = 0; //speed of snake in Y coordinate.

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;

window.onload = function () {
	// Set board height and width
	board = document.getElementById("board");
	board.height = total_row * blockSize;
	board.width = total_col * blockSize;
	context = board.getContext("2d");

	placeFood();
	document.addEventListener("keyup", changeDirection); //for movements
	// Set snake speed
	setInterval(update, 1000 / 10);
}

function update() {
	if (gameOver) {
		return;
	}

	// Background of a Game
	context.fillStyle = "green";
	context.fillRect(0, 0, board.width, board.height);

	// Set food color and position
	context.fillStyle = "red";
	context.fillRect(foodX, foodY, blockSize, blockSize);

	if (snakeX == foodX && snakeY == foodY) {
		snakeBody.push([foodX, foodY]);
		placeFood();
        score+=1
	}
    if(score <0){
        highscore+=1
    }
    else{
        if(score > highscore){
            highscore = score
        }
    }
	// body of snake will grow
	for (let i = snakeBody.length - 1; i > 0; i--) {
		// it will store previous part of snake to the current part
		snakeBody[i] = snakeBody[i - 1];
	}
	if (snakeBody.length) {
		snakeBody[0] = [snakeX, snakeY];
	}

    context.fillStyle = 'white'; //Score display
    context.font = '2rem Exo2';
    context.fillText('Puntaje: '+score, 800, 30)

    context.fillStyle = 'black'
    context.font = '2rem Exo2'
    context.fillText('Puntacion mas alta: '+highscore, 1400,50)

	context.fillStyle = "blue";
	snakeX += speedX * blockSize; //updating Snake position in X coordinate.
	snakeY += speedY * blockSize; //updating Snake position in Y coordinate.
	context.fillRect(snakeX, snakeY, blockSize, blockSize);
	for (let i = 0; i < snakeBody.length; i++) {
		context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
	}

	if (snakeX < 0 
		|| snakeX > total_col * blockSize 
		|| snakeY < 0 
		|| snakeY > total_row * blockSize) { 
		
		// Out of bound condition
		gameOver = true;
        showGameOverAlert()
        
	}

	for (let i = 0; i < snakeBody.length; i++) {
		if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { 
			
			// Snake eats own body
			gameOver = true;
            showGameOverAlert()
            
		}
	}
}

// Movement of the Snake - We are using addEventListener
function changeDirection(e) {
	if (e.code == "KeyW" && speedY != 1) { 
		// If up arrow key pressed with this condition...
		// snake will not move in the opposite direction
		speedX = 0;
		speedY = -1;
	}
	else if (e.code == "KeyS" && speedY != -1) {
		//If down arrow key pressed
		speedX = 0;
		speedY = 1;
	}
	else if (e.code == "KeyA" && speedX != 1) {
		//If left arrow key pressed
		speedX = -1;
		speedY = 0;
	}
	else if (e.code == "KeyD" && speedX != -1) { 
		//If Right arrow key pressed
		speedX = 1;
		speedY = 0;
	}
}

// Randomly place food
function placeFood() {

	// in x coordinates.
	foodX = Math.floor(Math.random() * total_col) * blockSize; 
	
	//in y coordinates.
	foodY = Math.floor(Math.random() * total_row) * blockSize; 
}
function showGameOverAlert() {
    Swal.fire({
        title: 'Game Over',
        text: '',
        background: '#000',
        customClass: {
            title: 'custom-swal-text',
            confirmButton: 'custom-swal-button'
        },
        color: '#0f0',
        confirmButtonText: 'Restart',
        allowOutsideClick: false
    }).then(() => {
        restartGame();
    });
}

function restartGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    speedX = 0;
    speedY = 0;
    score = 0;
    snakeBody = [];
    gameOver = false;
    placeFood();
}