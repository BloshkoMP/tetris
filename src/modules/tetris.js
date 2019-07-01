export class Tetris {
	playfield = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];

	currentPiece = {
		x: 0,
		y: 0,
		block: [[0, 1, 0], [1, 1, 1], [0, 0, 0]]
	};

	movePieceDown() {
		this.currentPiece.y += 1;
		if (this.isBlockOutOfBounds()) {
			this.currentPiece.y -= 1;
			this.pointPiece();
		}
	}

	movePieceLeft() {
		this.currentPiece.x -= 1;
		if (this.isBlockOutOfBounds()) {
			this.currentPiece.x += 1;
			this.pointPiece();
		}
	}

	movePieceRight() {
		this.currentPiece.x += 1;
		if (this.isBlockOutOfBounds()) {
			this.currentPiece.x -= 1;
			this.pointPiece();
		}
	}

	isBlockOutOfBounds() {
		const { x: blockX, y: blockY, block } = this.currentPiece;
		for (let y = 0; y < block.length; y++) {
			for (let x = 0; x < block[y].length; x++) {
				if (
					block[y][x] &&
					(this.playfield[blockY + y] === undefined || this.playfield[blockY + y][blockX + x] === undefined)
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
}
