import {Tetris} from './tetris.js';
import {View} from './view.js';

const element = document.querySelector('.main');
const start = document.querySelector('.start');
const pause = document.querySelector('.pause');

const tetris = new Tetris();
const view = new View(element, 320, 640, 10, 20);
let startGame;

start.addEventListener('click', function() {
	startGame = setInterval(() => {
		tetris.movePieceDown();
		view.render(tetris.getState());
	}, 500);
});

pause.addEventListener('click', function() {
	clearInterval(startGame);
});

document.addEventListener('keydown', () => {
	switch (event.keyCode) {
		case 38: //up
			tetris.rotatePiece();
			view.render(tetris.getState());
			break;
		case 37: //left
			tetris.movePieceLeft();
			view.render(tetris.getState());
			break;
		case 39: //right
			tetris.movePieceRight();
			view.render(tetris.getState());
			break;
		case 40: //down
			tetris.movePieceDown();
			view.render(tetris.getState());
			break;
	}
});
