window.onload = () => {
	const roomNameSpan = document.getElementById("RoomName");

	let game = {};

	// ---- Enter Room
	const socket = io();

	const { PlayerName, RoomName } = Qs.parse(location.search, {
		ignoreQueryPrefix: true,
	});

	socket.emit("JoinRoom", { username: PlayerName, room: RoomName });
	roomNameSpan.innerHTML = RoomName;

	socket.on("status", s => {
		console.log(s);
		game = s;
		updateUI();
	});

	socket.on("UsersRoom", roomInfo => { });


	// ---- Game UI
	const boardBtn = document.querySelectorAll("body main div.board button");
	const PlayerNameX = document.getElementById("PlayerNameX");
	const PlayerNameO = document.getElementById("PlayerNameO");
	const ScoreXSpan = document.getElementById("ScoreXSpan");
	const ScoreOSpan = document.getElementById("ScoreOSpan");

	for (let i = 0; i < boardBtn.length; i++) {
		boardBtn[i].addEventListener("click", () => {
			socket.emit("PlayerMove", i);
		});
	}

	document.getElementById("Reset").addEventListener("click", () => {
		start();
		socket.emit("Reset");
	});
	document.getElementById("NewBoard").addEventListener("click", () => {
		start();
		socket.emit("NewBoard");
	});

	start();
	function start() {
		for (let i = 0; i < boardBtn.length; i++) {
			boardBtn[i].innerHTML = "";
			boardBtn[i].style.backgroundColor = "#252525";
			boardBtn[i].disabled = false;
		}
	}

	function updateUI() {
		ScoreXSpan.innerHTML = game.score.X;
		ScoreOSpan.innerHTML = game.score.O;

		PlayerNameX.innerHTML = "Prayer";
		PlayerNameO.innerHTML = "Prayer";

		printBoardUI();
	}

	function printBoardUI() {
		if (!game.state) return;

		for (let i = 0; i < game.state.length; i++) {
			const cell = game.state[i];

			boardBtn[i].innerHTML = cell;

			if (cell) boardBtn[i].disabled = true;

			if ("X" === cell) boardBtn[i].style.backgroundColor = "red";
			else if ("O" === cell) boardBtn[i].style.backgroundColor = "blue";
			else boardBtn[i].style.backgroundColor = "#252525";
		}
	}
}
