import getPieces from "./pieces.js";
export class Tetris {
	playfield = this.createPlayfield();
	currentPiece = this.createNewBlock();
	nextPiece = this.createNewBlock();
	score = 0;
	level = 0;
	lines = 0;

	getState() {
		const playfield = this.createPlayfield();
		for (let i = 0; i < this.playfield.length; i++) {
			playfield[i] = [];
			for (let j = 0; j < this.playfield[i].length; j++) {
				playfield[i][j] = this.playfield[i][j];
			}
		}

		for (let i = 0; i < this.currentPiece.block.length; i++) {
			for (let j = 0; j < this.currentPiece.block[i].length; j++) {
				if (this.currentPiece.block[i][j]) {
					playfield[this.currentPiece.y + i][this.currentPiece.x + j] = this.currentPiece.block[i][j];
				}
			}
		}

		return {
			playfield,
			score: this.score,
			level: this.level,
			lines: this.lines
		};
	}

	clearLines() {
		const deleteLines = [];
		const colums = 10;
		const rows = 20;
		for (let i = rows - 1; i >= 0; i--) {
			let numbers = 0;
			for (let j = 0; j < colums; j++) {
				if (this.playfield[i][j]) {
					numbers++;
				}
			}

			if (numbers === 0) {
				break;
			} else if (numbers < colums) {
				continue;
			} else if (numbers === colums) {
				deleteLines.unshift(i);
			}
		}
		for (let index of deleteLines) {
			this.playfield.splice(index, 1);
			this.playfield.unshift(new Array(colums).fill(0));
			this.lines++;
			this.lines < 10 ? (this.score += 40) : (this.score += 80);
			this.level = Math.floor(this.lines * 0.1 + 1);
		}
		deleteLines.length === 2
			? (this.score += 100)
			: deleteLines.length === 3
			? (this.score += 200)
			: deleteLines.length === 4
			? (this.score += 500)
			: this.score;
	}

	createPlayfield() {
		return new Array(20).fill(0).map(() => new Array(10).fill(0));
	}

	createNewBlock() {
		const index = Math.floor(Math.random() * 7);
		const piece = getPieces(index);

		piece.x = Math.floor(+this.playfield[0].length / 2 - piece.block[0].length / 2);
		piece.y = 0;
		return piece;
	}

	getNextBlock() {
		this.currentPiece = this.nextPiece;
		this.nextPiece = this.createNewBlock();
	}

	movePieceDown() {
		this.currentPiece.y += 1;
		if (this.isBlockOutOfBounds()) {
			this.currentPiece.y -= 1;
			this.pointPiece();
			this.clearLines();
			this.getNextBlock();
		}
	}

	movePieceLeft() {
		this.currentPiece.x -= 1;
		if (this.isBlockOutOfBounds()) {
			this.currentPiece.x += 1;
		}
	}

	movePieceRight() {
		this.currentPiece.x += 1;
		if (this.isBlockOutOfBounds()) {
			this.currentPiece.x -= 1;
		}
	}

	isBlockOutOfBounds() {
		const { x: blockX, y: blockY, block } = this.currentPiece;
		for (let y = 0; y < block.length; y++) {
			for (let x = 0; x < block[y].length; x++) {
				if (
					block[y][x] &&
					(this.playfield[blockY + y] === undefined ||
						this.playfield[blockY + y][blockX + x] === undefined ||
						this.playfield[blockY + y][blockX + x])
				) {
					return true;
				}
			}
		}
		return false;
	}
	pointPiece() {
		const { x: blockX, y: blockY, block } = this.currentPiece;
		for (let y = 0; y < block.length; y++) {
			for (let x = 0; x < block[y].length; x++) {
				if (block[y][x]) {
					this.playfield[blockY + y][blockX + x] = block[y][x];
				}
			}
		}
	}

	rotatePiece() {
		const { block } = this.currentPiece;
		const length = block.length;

		let tempAppay = [];
		for (let i = 0; i < length; i++) {
			tempAppay[i] = new Array().fill(0);
		}

		for (let i = 0; i < length; i++) {
			for (let j = 0; j < length; j++) {
				tempAppay[j][i] = block[length - 1 - i][j];
			}
		}
		this.currentPiece.block = tempAppay;
		if (this.isBlockOutOfBounds()) {
			this.currentPiece.block = block;
		}
	}
}
