import { Tetris } from "./tetris";
import { View } from "./view";

let ticker = 0,
	isPlaying = false;

const htmlElements = {
	element: document.querySelector(".main"),
	soundIcon: document.querySelector(".sound-icon")
};

const tetris = new Tetris();
const view = new View(htmlElements.element, 520, 680, 10, 20);

const soundTrack = new Audio("https://ia800504.us.archive.org/33/items/TetrisThemeMusic/Tetris.mp3");

startGame();

function startGame() {
	view.renderStartScreen();

	sound();

	document.addEventListener("keydown", () => {
		if (event.keyCode === 13) {
			document.addEventListener("keydown", keydown);

			ticker = setInterval(() => {
				if (tetris.isOver) {
					clearInterval(ticker);
					document.removeEventListener("keydown", keydown);
					view.renderGameOver(tetris.getState());
				} else {
					tetris.movePieceDown();
					view.renderGame(tetris.getState());
				}
			}, 500);
		}
	});
}

function sound() {
	htmlElements.soundIcon.addEventListener("click", function() {
		if (isPlaying) {
			this.innerText = "Sound:OFF";
			soundTrack.pause();
			isPlaying = false;
		} else {
			this.innerText = "Sound: ON";
			soundTrack.volume = 0.5;
			soundTrack.loop = true;
			soundTrack.play();
			isPlaying = true;
		}
	});
}

function keydown() {
	switch (event.keyCode) {
		case 38: //up
			tetris.rotatePiece();
			view.renderGame(tetris.getState());
			break;
		case 37: //left
			tetris.movePieceLeft();
			view.renderGame(tetris.getState());
			break;
		case 39: //right
			tetris.movePieceRight();
			view.renderGame(tetris.getState());
			break;
		case 40: //down
			tetris.movePieceDown();
			view.renderGame(tetris.getState());
			break;
		case 27: //down
			view.renderPauseScreen();
			clearInterval(ticker);
			break;
	}
}
