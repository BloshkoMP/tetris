export class Tetris {
	playfield = this.getNewPlayfield();
	currentPiece = {
		x: 0,
		y: 0,
		block: [[0, 1, 0], [1, 1, 1], [0, 0, 0]]
	};

	movePieceDown() {
		this.currentPiece.y += 1;
		if (this.isBlockOutOfBounds()) {
			this.currentPiece.y -= 1;
		}
	}

	getState() {
		const playfield = this.getNewPlayfield();
		for (let i = 0; i < this.playfield.length; i++) {
			playfield[i] = [];
			for (let j = 0; j < this.playfield[i].length; j++) {
				playfield[i][j] = this.playfield[i][j];
			}
		}

		for (let i = 0; i < this.currentPiece.block.length; i++) {
			for (let j = 0; j < this.currentPiece.block[i].length; j++) {
				if (this.currentPiece.block[i][j]) {
					playfield[this.currentPiece.y + i][
						this.currentPiece.x + j
					] = this.currentPiece.block[i][j];
				}
			}
		}
		return playfield;
	}

	getNewPlayfield() {
		const playfield = [];
		for (let i = 0; i < 20; i++) {
			playfield[i] = [];
			for (let j = 0; j < 10; j++) {
				playfield[i][j] = 0;
			}
		}
		return playfield;
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
		const {x: blockX, y: blockY, block} = this.currentPiece;
		for (let y = 0; y < block.length; y++) {
			for (let x = 0; x < block[y].length; x++) {
				if (
					block[y][x] &&
					(this.playfield[blockY + y] === undefined ||
						this.playfield[blockY + y][blockX + x] === undefined)
				) {
					return true;
				}
			}
		}
		return false;
	}
	pointPiece() {
		const {x: blockX, y: blockY, block} = this.currentPiece;
		for (let y = 0; y < block.length; y++) {
			for (let x = 0; x < block[y].length; x++) {
				if (block[y][x]) {
					this.playfield[blockY + y][blockX + x] = block[y][x];
				}
			}
		}
	}

	rotatePiece() {
		const {block} = this.currentPiece;
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
