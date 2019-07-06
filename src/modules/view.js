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

	render(playfield) {
		this.clearRect();
		for (let i = 0; i < playfield.length; i++) {
			const rows = playfield[i];
			for (let j = 0; j < rows.length; j++) {
				const block = rows[j];

				if (block) {
					this.context.fillStyle = 'green';
					this.context.strokeStyle = 'blue';
					this.context.lineWidth = 2;
					this.context.fillRect(
						j * this.blockWidth,
						i * this.blockHeight,
						this.blockWidth,
						this.blockHeight
					);
				}
			}
		}
	}
	clearRect() {
		this.context.clearRect(0, 0, this.width, this.height);
	}
}
