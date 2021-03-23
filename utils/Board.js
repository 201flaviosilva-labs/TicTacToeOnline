class Board {
	constructor() {
		this.init();
	}

	init() {
		this.playersSymbols = ["X", "O"];

		this.actualPlayer = this.playersSymbols[0];

		this.winCom = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],

			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],

			[0, 4, 8],
			[2, 4, 6]
		];

		this.score = {
			X: 0,
			O: 0,
		}

		this.newBoard();
	}

	newBoard() {
		this.state = [
			"", "", "",
			"", "", "",
			"", "", ""
		];

		for (let i = 0; i < this.state.length; i++) {
			this.state[i] = "";
		}

		this.isGameOver = false;
		this.winPlayer = null;
	}

	isEmpty() {
		return this.state.every(cell => cell === "");
	}

	isFull() {
		return this.state.every(cell => cell);
	}

	checkGameOver() {
		if (this.isEmpty()) {
			this.isGameOver = false;
			return false;
		}

		for (let i = 0; i < this.playersSymbols.length; i++) {
			this.isGameOver = this.checkComb(this.playersSymbols[i]);
			if (this.isGameOver) return true;
		}

		if (this.isFull()) {
			this.isGameOver = true;
			return true;
		}

		this.isGameOver = false;
		return false;
	}

	checkComb(player) {
		for (let i = 0; i < this.winCom.length; i++) {
			let isWin = true;
			for (let j = 0; j < this.winCom[i].length; j++) {
				const cell = this.winCom[i][j];
				isWin = this.state[cell] === player && isWin;
			}
			if (isWin) {
				this.winPlayer = player;
				this.score[player]++;
				return isWin;
			}
		}
		return false;
	}

	getAvailableMoves() {
		if (this.isGameOver) return;

		const availableMoves = [];
		this.state.map((s, i) => {
			if (!s) availableMoves.push(i);
		});
		return availableMoves;
	}

	move(position) {
		if (!this.state[position] && !this.isGameOver) {
			this.state[position] = this.actualPlayer;
			this.update();
			return true;
		}
		return false;
	}

	switchPlayer() {
		if (this.actualPlayer === this.playersSymbols[0]) this.actualPlayer = this.playersSymbols[1];
		else this.actualPlayer = this.playersSymbols[0];
	}

	update() {
		if (this.isGameOver) return;
		this.checkGameOver();
		this.switchPlayer();
	}
}

module.exports = { Board };
