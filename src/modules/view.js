export class View {
	constructor(element, width, height, coloms, rows) {
		this.element = element;
		this.width = width;
		this.height = height;

		this.canvas = document.createElement("canvas");
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.context = this.canvas.getContext("2d");

		this.playfieldBorderWidth = 4;
		this.playfieldX = this.playfieldBorderWidth;
		this.playfieldY = this.playfieldBorderWidth;
		this.playfieldWidth = (this.width * 2) / 3;
		this.playfieldHight = this.height;
		this.playfieldInnderWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
		this.playfieldInnderHight = this.playfieldHight - this.playfieldBorderWidth * 2;

		this.blockWidth = this.playfieldInnderWidth / coloms;
		this.blockHeight = this.playfieldInnderHight / rows;

		this.panelX = this.playfieldWidth + 10;
		this.panelY = 0;
		this.panelWidth = this.width / 3;
		this.panalHeight = this.height;

		this.element.appendChild(this.canvas);
	}

	getPieceColor(index) {
		const blockColors = {
			"1": "red",
			"2": "green",
			"3": "purple",
			"4": "yellow",
			"5": "blue",
			"6": "cyan",
			"7": "pink"
		};
		return blockColors[index];
	}

	renderGame(state) {
		this.clearRect();
		this.renderPlayfield(state);
		this.renderScore(state);
	}

	renderGameOver({ score }) {
		this.clearRect();
		this.context.fillStyle = "rgba(0,0,0,0.75)";
		this.context.fillRect(0, 0, this.width, this.height);

		this.context.fillStyle = "white";
		this.context.font = '20px "Press Start 2P"';
		this.context.textAlign = "center";
		this.context.textBaseline = "middle";
		this.context.fillText("GAME OVER", this.width / 2, this.height / 2 - 60);
		this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2);
		this.context.fillStyle = "silver";
		this.context.font = '14px "Press Start 2P"';
		this.context.fillText("Press ENTER to Start New Game", this.width / 2, this.height / 2 + 60);
	}

	renderStartScreen(scoreHestory) {
		this.clearRect();
		this.context.fillStyle = "white";
		this.context.font = '20px "Press Start 2P"';
		this.context.textAlign = "center";
		this.context.textBaseline = "middle";
		let height = 70;
		this.context.fillText("NAME SCORE LINES LVL", this.width / 2, height - 60);
		scoreHestory.sort((current, next) => (current.score < next.score ? 1 : -1));
		for (let i = 0; i < 5; i++) {
			const element = scoreHestory[i];
			if (element.name.length < 4) {
				element.name = `${element.name} `;
			}
			if (element.score < 1000) {
				element.score = `0${element.score}`;
			}
			this.context.fillText(
				`${element.name}  ${element.score}   ${element.line}   ${element.lvl}`,
				this.width / 2 - 10,
				height
			);
			height += 34;
		}
		this.context.fillStyle = "white";
		this.context.textAlign = "center";
		this.context.textBaseline = "middle";
		this.context.fillText("Press ENTER to Start", this.width / 2, this.height / 2);
		this.context.fillStyle = "silver";
		this.context.font = '14px "Press Start 2P"';
		this.context.fillText("Press ESC to Pause", this.width / 2, this.height / 2 + 60);
	}

	renderPauseScreen() {
		this.context.fillStyle = "rgba(0,0,0,0.75)";
		this.context.fillRect(0, 0, this.width, this.height);

		this.context.fillStyle = "white";
		this.context.font = '20px "Press Start 2P"';
		this.context.textAlign = "center";
		this.context.textBaseline = "middle";
		this.context.fillText("Press ENTER to Resume", this.width / 2, this.height / 2);
	}

	renderPlayfield({ playfield }) {
		for (let i = 0; i < playfield.length; i++) {
			for (let j = 0; j < playfield[i].length; j++) {
				const block = playfield[i][j];

				if (block) {
					this.renderBlock(
						this.playfieldX + j * this.blockWidth,
						this.playfieldY + i * this.blockHeight,
						this.blockWidth,
						this.blockHeight,
						this.getPieceColor(block)
					);
				}
			}
		}
		this.context.strokeStyle = "white";
		this.context.lineWidth = this.playfieldBorderWidth;
		this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHight);
	}

	renderScore({ score, level, lines, nextPiece }) {
		this.context.textAlign = "start";
		this.context.fillStyle = "white";
		this.context.font = '14px "Press Start 2P"';

		this.context.fillText(`Score: ${score}`, this.panelX, this.panelY + 24);
		this.context.fillText(`Level: ${level}`, this.panelX, this.panelY + 48);
		this.context.fillText(`Lines: ${lines}`, this.panelX, this.panelY + 72);
		this.context.fillText("Next:", this.panelX, this.panelY + 120);

		for (let i = 0; i < nextPiece.block.length; i++) {
			for (let j = 0; j < nextPiece.block[i].length; j++) {
				const isBlock = nextPiece.block[i][j];

				if (isBlock) {
					this.renderBlock(
						this.panelX + j * this.blockWidth * 0.7,
						this.panelY + 130 + i * this.blockHeight * 0.7,
						this.blockWidth * 0.7,
						this.blockHeight * 0.7,
						this.getPieceColor(isBlock)
					);
				}
			}
		}
	}

	renderBlock(j, i, width, height, color) {
		this.context.fillStyle = color;
		this.context.strokeStyle = "black";
		this.context.lineWidth = 2;
		this.context.fillRect(j, i, width, height);
		this.context.strokeRect(j, i, width, height);
	}

	clearRect() {
		this.context.clearRect(0, 0, this.width, this.height);
	}
}
