import {Tetris} from './tetris.js';
import {View} from './view.js';
const element = document.querySelector('.main');
const tetris = new Tetris();
window.tetris = tetris;

const view = new View(element, 320, 640, 10, 20);
window.view = view;
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
