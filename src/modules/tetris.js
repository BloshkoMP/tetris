export class Tetris {
	playfield = this.createPlayfield();
	currentPiece = this.createNewBlock();
	nextPiece = this.createNewBlock();

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
		return playfield;
	}

	clearLines() {
		const lines = [];
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
				lines.unshift(i);
			}
		}
		debugger;
		for (let index of lines) {
			this.playfield.splice(index, 1);
			this.playfield.unshift(new Array(colums).fill(0));
		}
	}

	createPlayfield() {
		return new Array(20).fill(0).map(() => new Array(10).fill(0));
	}

	createNewBlock() {
		const piece = {};
		piece.index = Math.floor(Math.random() * 7);

		switch (piece.index) {
			case 0:
				piece.block = [[0, 1, 0], [1, 1, 1], [0, 0, 0]];
				break;
			case 1:
				piece.block = [[2, 2, 0], [0, 2, 2], [0, 0, 0]];
				break;
			case 2:
				piece.block = [[0, 3, 3], [3, 3, 0], [0, 0, 0]];
				break;
			case 3:
				piece.block = [[4, 0, 0], [4, 4, 4], [0, 0, 0]];
				break;
			case 4:
				piece.block = [[0, 0, 5], [5, 5, 5], [0, 0, 0]];
				break;
			case 5:
				piece.block = [[0, 0, 0, 0], [0, 6, 6, 0], [0, 6, 6, 0], [0, 0, 0, 0]];
				break;
			case 6:
				piece.block = [[0, 0, 0, 0], [7, 7, 7, 7], [0, 0, 0, 0], [0, 0, 0, 0]];
				break;
		}
		piece.x = 0;
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
