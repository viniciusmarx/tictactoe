const x = document.querySelector(".x");
const o = document.querySelector(".o");
const buttons = document.querySelectorAll(".buttons-container button");
const messageContainer = document.getElementById("message");
const message = document.querySelector("#message p");

let player1 = 0;
let player2 = 0;
let plays = 0;

const getBoxes = () => {
	let boxes = [];
	let cont = 1;
	for (let i = 0; i < 3; i++) {
		boxes[i] = [];
		for (let j = 0; j < 3; j++) {
			boxes[i][j] = document.getElementById(`block-${cont}`);
			cont++;
		}
	}

	return boxes;
};

const boxes = getBoxes();

for (let i = 0; i < 3; i++) {
	for (let j = 0; j < 3; j++) {
		boxes[i][j].addEventListener("click", () => {
			let play = checkPlay(player1, player2);

			if (boxes[i][j].childNodes.length === 0) {
				let clonePlay = play.cloneNode(true);
				boxes[i][j].appendChild(clonePlay);

				if (player1 === player2) {
					player1++;
				} else {
					player2++;
				}

				checkWinCondition(boxes);
			}
		});
	}
}

buttons.forEach((button) => {
	button.addEventListener("click", () => {
		secondPlayer = button.getAttribute("id");

		buttons.forEach((b) => {
			b.style.display = "none";
		});

		setTimeout(() => {
			document.querySelector(".container").classList.remove("hide");
		}, 500);
	});
});

const checkPlay = (player1, player2) => {
	if (player1 === player2) {
		return x;
	} else {
		return o;
	}
};

const checkWinCondition = (boxes) => {
	plays++;

	for (let i = 0; i < 3; i++) {
		if (boxes[i][0].childNodes.length && boxes[i][1].childNodes.length && boxes[i][2].childNodes.length) {
			let boxChild1 = boxes[i][0].childNodes[0].className;
			let boxChild2 = boxes[i][1].childNodes[0].className;
			let boxChild3 = boxes[i][2].childNodes[0].className;
			if (boxChild1 == boxChild2 && boxChild1 == boxChild3) {
				declareWinner(boxChild1);
			}
		}

		if (boxes[0][i].childNodes.length && boxes[1][i].childNodes.length && boxes[2][i].childNodes.length) {
			let boxChild1 = boxes[0][i].childNodes[0].className;
			let boxChild2 = boxes[1][i].childNodes[0].className;
			let boxChild3 = boxes[2][i].childNodes[0].className;
			if (boxChild1 == boxChild2 && boxChild1 == boxChild3) {
				declareWinner(boxChild1);
			}
		}
	}

	if (boxes[0][0].childNodes.length && boxes[1][1].childNodes.length && boxes[2][2].childNodes.length) {
		let boxChild1 = boxes[0][0].childNodes[0].className;
		let boxChild2 = boxes[1][1].childNodes[0].className;
		let boxChild3 = boxes[2][2].childNodes[0].className;
		if (boxChild1 == boxChild2 && boxChild1 == boxChild3) {
			declareWinner(boxChild1);
		}
	}
	if (boxes[2][0].childNodes.length && boxes[1][1].childNodes.length && boxes[0][2].childNodes.length) {
		let boxChild1 = boxes[2][0].childNodes[0].className;
		let boxChild2 = boxes[1][1].childNodes[0].className;
		let boxChild3 = boxes[0][2].childNodes[0].className;
		if (boxChild1 == boxChild2 && boxChild1 == boxChild3) {
			declareWinner(boxChild1);
		}
	}

	if (plays === 9) {
		declareWinner("draw");
	}
};

const declareWinner = (winner) => {
	const scoreboardX = document.getElementById("scoreboard-1");
	const scoreboardO = document.getElementById("scoreboard-2");

	if (winner === "x") {
		scoreboardX.textContent = parseInt(scoreboardX.textContent) + 1;
		message.textContent = "Player 1 is the winner!";
	} else if (winner === "o") {
		scoreboardO.textContent = parseInt(scoreboardO.textContent) + 1;
		message.textContent = "Player 2 is the winner!";
	} else {
		message.textContent = "DRAW!";
	}

	messageContainer.classList.remove("hide");
	document.body.style.pointerEvents = "none";

	setTimeout(() => {
		messageContainer.classList.add("hide");
		boxesToRemove.forEach((box) => {
			box.parentNode.removeChild(box);
		});
		document.body.style.pointerEvents = "auto";
	}, 3000);

	player1 = 0;
	player2 = 0;
	plays = 0;

	const boxesToRemove = document.querySelectorAll(".box div");
};
