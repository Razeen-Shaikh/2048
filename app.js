document.addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector(".grid");
	const scoreDisplay = document.getElementById("score");
	const result = document.getElementById("result");
	const width = 4;
	let squares = [];
	let score = 0;

	// create a playing board
	const createBoard = () => {
		for (let i = 0; i < width * width; i++) {
			square = document.createElement("div");
			square.innerHTML = 0;
			grid.appendChild(square);
			squares.push(square);
		}
		generate();
		generate();
	};

	// check if there are no zeroes
	const checkForGameOver = () => {
		let zeros = 0;
		for (let i = 0; i < squares.length; i++) {
			if (parseInt(squares[i].innerHTML) === 0) {
				zeros++;
			}
		}
		if (zeros === 0) {
			result.innerHTML = "You Lose!";
			document.removeEventListener("keyup", control);
		}
	};

	// generate a number randomly
	const generate = () => {
		let randomNumber = Math.floor(Math.random() * squares.length);
		if (squares[randomNumber].innerHTML == 0) {
			squares[randomNumber].innerHTML = 2;
			checkForGameOver();
		} else {
			generate();
		}
	};

	createBoard();

	// swipe right
	const swipeRight = () => {
		for (let i = 0; i < 16; i++) {
			if (i % 4 === 0) {
				let totalOne = squares[i].innerHTML;
				let totalTwo = squares[i + 1].innerHTML;
				let totalThree = squares[i + 2].innerHTML;
				let totalFour = squares[i + 3].innerHTML;
				let row = [
					parseInt(totalOne),
					parseInt(totalTwo),
					parseInt(totalThree),
					parseInt(totalFour),
				];
				let filteredRow = row.filter((num) => num);
				let missing = 4 - filteredRow.length;
				let zeros = Array(missing).fill(0);
				let newRow = zeros.concat(filteredRow);

				squares[i].innerHTML = newRow[0];
				squares[i + 1].innerHTML = newRow[1];
				squares[i + 2].innerHTML = newRow[2];
				squares[i + 3].innerHTML = newRow[3];
			}
		}
	};

	// swipe left
	const swipeleft = () => {
		for (let i = 0; i < 16; i++) {
			if (i % 4 === 0) {
				let totalOne = squares[i].innerHTML;
				let totalTwo = squares[i + 1].innerHTML;
				let totalThree = squares[i + 2].innerHTML;
				let totalFour = squares[i + 3].innerHTML;
				let row = [
					parseInt(totalOne),
					parseInt(totalTwo),
					parseInt(totalThree),
					parseInt(totalFour),
				];
				let filteredRow = row.filter((num) => num);
				let missing = 4 - filteredRow.length;
				let zeros = Array(missing).fill(0);
				let newRow = filteredRow.concat(zeros);

				squares[i].innerHTML = newRow[0];
				squares[i + 1].innerHTML = newRow[1];
				squares[i + 2].innerHTML = newRow[2];
				squares[i + 3].innerHTML = newRow[3];
			}
		}
	};

	// swipe down
	const swipeDown = () => {
		for (let i = 0; i < 4; i++) {
			let totalOne = squares[i].innerHTML;
			let totalTwo = squares[i + width].innerHTML;
			let totalThree = squares[i + 2 * width].innerHTML;
			let totalFour = squares[i + 3 * width].innerHTML;
			let column = [
				parseInt(totalOne),
				parseInt(totalTwo),
				parseInt(totalThree),
				parseInt(totalFour),
			];

			let filteredColumn = column.filter((num) => num);
			let missing = 4 - filteredColumn.length;
			let zeros = Array(missing).fill(0);
			let newColumn = zeros.concat(filteredColumn);

			squares[i].innerHTML = newColumn[0];
			squares[i + width].innerHTML = newColumn[1];
			squares[i + width * 2].innerHTML = newColumn[2];
			squares[i + width * 3].innerHTML = newColumn[3];
		}
	};

	// swipe up
	const swipeUp = () => {
		for (let i = 0; i < 4; i++) {
			let totalOne = squares[i].innerHTML;
			let totalTwo = squares[i + width].innerHTML;
			let totalThree = squares[i + 2 * width].innerHTML;
			let totalFour = squares[i + 3 * width].innerHTML;
			let column = [
				parseInt(totalOne),
				parseInt(totalTwo),
				parseInt(totalThree),
				parseInt(totalFour),
			];

			let filteredColumn = column.filter((num) => num);
			let missing = 4 - filteredColumn.length;
			let zeros = Array(missing).fill(0);
			let newColumn = filteredColumn.concat(zeros);

			squares[i].innerHTML = newColumn[0];
			squares[i + width].innerHTML = newColumn[1];
			squares[i + width * 2].innerHTML = newColumn[2];
			squares[i + width * 3].innerHTML = newColumn[3];
		}
	};

	const combineRow = () => {
		for (let i = 0; i < 15; i++) {
			if (squares[i].innerHTML === squares[i + 1].innerHTML) {
				let combineTotal =
					parseInt(squares[i].innerHTML) +
					parseInt(squares[i + 1].innerHTML);
				squares[i].innerHTML = combineTotal;
				squares[i + 1].innerHTML = 0;
				score += combineTotal;
				scoreDisplay.innerHTML = score;
			}
		}
		checkForWin();
	};

	const combineColumn = () => {
		for (let i = 0; i < 12; i++) {
			if (squares[i].innerHTML === squares[i + width].innerHTML) {
				let combineTotal =
					parseInt(squares[i].innerHTML) +
					parseInt(squares[i + width].innerHTML);
				squares[i].innerHTML = combineTotal;
				squares[i + width].innerHTML = 0;
				score += combineTotal;
				scoreDisplay.innerHTML = score;
			}
		}
		checkForWin();
	};

	// assign keycases
	const control = (e) => {
		if (e.keyCode === 39) {
			keyRight();
		} else if (e.keyCode === 37) {
			keyLeft();
		} else if (e.keyCode === 38) {
			keyUp();
		} else if (e.keyCode === 40) {
			keyDown();
		}
	};

	const keyRight = () => {
		swipeRight();
		combineRow();
		swipeRight();
		generate();
	};

	const keyLeft = () => {
		swipeleft();
		combineRow();
		swipeleft();
		generate();
	};

	const keyUp = () => {
		swipeUp();
		combineColumn();
		swipeUp();
		generate();
	};

	const keyDown = () => {
		swipeDown();
		combineColumn();
		swipeDown();
		generate();
	};

	document.addEventListener("keyup", control);

	// check for the number 2048 in the squares to win
	const checkForWin = () => {
		for (let i = 0; i < squares.length; i++) {
			if (squares[i].innerHTML == 2048) {
				result.innerHTML = "You win!";
				document.removeEventListener("keyup", control);
			}
		}
	};
});
