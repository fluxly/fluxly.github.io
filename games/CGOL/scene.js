var cells = [];
var count = [];
var pageW = 1024;
var pageH = 768;
var cellRows = 36;
var cellCols = 48;
var cellW = pageW/cellCols;
var palette = [];
var randomMutation = false;
var firstGame = true;

function setup(){
	palette = [ 
		color('#000000'), color('#0e65e5'), color('#00aeef'), color('#e7198b'), color('#6400DB'), color('#00D8CB'),
		color('#96ff00'), color('#d802ca'), color('#F5EB00'), color('#fe6b10'), color('#ffffff')
	];
	sceneCanvas = createCanvas(pageW, pageH);
	sceneCanvas.parent('scene-wrapper');
	noStroke();
	rectMode(CENTER);
    newGame();
}

var playing = true;
var stepping = false;

function play() {
	console.log("play!");
	playing = true;
}

function stop() {
	playing = false;
}

function step() {
	playing = false;
	stepping = true;
}

function newGame() {
	randomMutation = false;
	if (random(0, 100) > 70) randomMutation = true;
    // Always start with a lot of rows
    if (firstGame) {
        cellRows = 100;
        firstGame = false;
        console.log('first game!');
    } else {
        cellRows = random(6, 100);
    }
	cellW = pageH / cellRows;
	cellCols = pageW / cellW;
	let threshold = random(10, 100);
	frameRate(round(random(10, 30)));
	cells = [];
	count = [];
	for (let i = 0; i < cellCols; i++) {
		cells.push([]);
		count.push([]);
	}
	for (let i = 0; i < cellRows; i++) {
		for (let j = 0; j < cellCols; j++) {
			cells[i].unshift(round(random(1, 9)));
			count[i].unshift(0);
			if (random(1, 100) > threshold) cells[i][0] = 0; 
		}
	}
}

function draw(){
	background(0);
	for (let i = 0; i < cellRows; i++) {
		for (let j = 0; j < cellCols; j++) {
			if ((playing) || stepping) {
				if (randomMutation && (random(1, 1000) > 999)) cells[i][j] = 10;
				count[i][j] = getNeighborCount(i, j);
		    }
		}
	}
	for (let i = 0; i < cellRows; i++) {
		for (let j = 0; j < cellCols; j++) {
			if ((playing) || stepping) {
				if ((cells[i][j] == 0) && (count[i][j] == 3)) cells[i][j] = round(random(1, 9));
				if ((count[i][j] < 2) || (count[i][j] > 3)) cells[i][j] = 0;

				if (cells[i][j] !== 0) {
					fill(palette[cells[i][j]]);
					circle(j*cellW, i*cellW, cellW);
				}
			} else {
				fill(palette[cells[i][j]]);
				circle(j*cellW, i*cellW, cellW);
			}
		}
	}
	if (stepping) stepping = false;
}

function getNeighborCount(row, col) {
    let count = 0; 
	if (row - 1 >= 0) {
		if (cells[row - 1][col] > 0) count++;
	}
	if (row - 1 >= 0 && col - 1 >= 0) {
		if (cells[row - 1][col - 1] > 0) count++;
	}
	if (row - 1 >= 0 && col + 1 < cellCols) {
		if (cells[row - 1][col + 1] > 0) count++;
	}
	if (col - 1 >= 0) {
		if (cells[row][col - 1] > 0) count++;
	}
	if (col + 1 < cellCols) {
		if (cells[row][col + 1] > 0) count++;
	}
	if (row + 1 < cellRows && col - 1 >= 0) {
		if (cells[row + 1][col - 1] > 0) count++;
	}
	if (row + 1 < cellRows && col + 1 <  cellCols) {
		if (cells[row + 1][col + 1] > 0) count++;
	}
	if (row + 1 < cellRows) {
		if (cells[row + 1][col] > 0) count++;
	}
    return count;
}

function touchStarted() {
	
}