import { Tetris } from "./tetris.js";
import { View } from "./view.js";

const htmlElements = {
	element: document.querySelector(".main"),
	start: document.querySelector(".start"),
	pause: document.querySelector(".pause")
};

const tetris = new Tetris();
const view = new View(htmlElements.element, 320, 640, 10, 20);
let startGame;

htmlElements.start.addEventListener("click", function tick() {
	startGame = setTimeout(() => {
		tetris.movePieceDown();
		view.render(tetris.getState());
		tick();
	}, 500);
});

htmlElements.pause.addEventListener("click", () => {
	clearTimeout(startGame);
});

document.addEventListener("keydown", () => {
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
