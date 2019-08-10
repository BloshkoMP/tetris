import { Tetris } from "./tetris";
import { View } from "./view";
import { scoreHistory, loadScore } from "./score-history.service";

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
	scoreHistory().then(json => {
		view.renderStartScreen(json);
		sound();
		document.addEventListener("keydown", () => gameEvent(json));
	});
}

function gameEvent(json) {
	if (event.keyCode === 13) {
		document.addEventListener("keydown", keydown);
		document.addEventListener("keydown", pause);

		ticker = setInterval(() => {
			if (tetris.isOver) {
				clearInterval(ticker);

				document.removeEventListener("keydown", keydown);
				view.renderGameOver(tetris.getState());

				loadScore(tetris.getState(), json);

				document.addEventListener("keydown", () => {
					if (event.keyCode === 13) {
						location.reload();
					}
				});
			} else {
				tetris.movePieceDown();
				view.renderGame(tetris.getState());
			}
		}, 500);
	}
}

function sound() {
	try {
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
	} catch {
		throw new Error("Somthing wrong with sound!");
	}
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
	}
}
function pause() {
	if (event.keyCode === 27) {
		view.renderPauseScreen();
		clearInterval(ticker);
		document.removeEventListener("keydown", pause);
	}
}
