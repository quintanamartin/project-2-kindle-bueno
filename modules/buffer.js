export default class Buffer {
	constructor({ size, init }) {
		this._buffer = new Array(size).fill(init);
		this._nextIndex = 0;
		this._size = size;
		this._init = init;
	}

	add(element) {
		this._buffer[this._nextIndex] = element;
		this._nextIndex = (this._nextIndex + 1) % 5;
	}

	show() {
		//because if its empty it returns and the 5index array ''
		const elements = this._buffer.filter(element => element !== this._init);

		if (!elements) {
			console.log('No recent searches');
		} else {
			console.log(...elements);
		}
	}

	clear() {
		this._buffer = new Array(this.size).fill(this._init);
		this._nextIndex = 0;
	}
}
