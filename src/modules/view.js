export class View {
	constructor(element, width, height, coloms, rows) {
		this.element = element;
		this.width = width;
		this.height = height;

		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.context = this.canvas.getContext('2d');

		this.blockWidth = this.width / coloms;
		this.blockHeight = this.height / rows;

		this.element.appendChild(this.canvas);
	}

	getPieceColor(index) {
		const blockColors = {
			'1': 'red',
			'2': 'green',
			'3': 'purple',
			'4': 'yellow',
			'5': 'blue',
			'6': 'cyan',
			'7': 'pink'
		};
		return blockColors[index];
	}

	render(playfield) {
		this.clearRect();
		this.renderPlayfield(playfield);
	}

	renderPlayfield({playfield}) {
		for (let i = 0; i < playfield.length; i++) {
			for (let j = 0; j < playfield[i].length; j++) {
				const block = playfield[i][j];

				if (block) {
					this.renderBlock(
						j * this.blockWidth,
						i * this.blockHeight,
						this.blockWidth,
						this.blockHeight,
						this.getPieceColor(block)
					);
				}
			}
		}
	}

	renderBlock(j, i, width, height, color) {
		this.context.fillStyle = color;
		this.context.strokeStyle = 'black';
		this.context.lineWidth = 2;
		this.context.fillRect(j, i, width, height);
		this.context.strokeRect(j, i, width, height);
	}
	clearRect() {
		this.context.clearRect(0, 0, this.width, this.height);
	}
}
