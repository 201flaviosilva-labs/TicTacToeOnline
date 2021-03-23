const { Board } = require("./utils/Board");
const { userJoin, getCurrentUser, userLeave, getRoomUsers, getActivePlayers } = require("./utils/users");


const board = new Board();

let gameState = {
	state: board.state,
	actualPlayer: board.actualPlayer,
	isGameOver: board.isGameOver,
	winPlayer: board.winPlayer,
	score: board.score,
};

const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));
io.on("connection", socket => {

	// On Connects
	socket.on("JoinRoom", ({ username, room }) => {
		const user = userJoin(socket.id, username, room); // Create a new user

		socket.join(user.room);

		// Join in room
		socket.to(user.room).emit("status", gameState);
		socket.to(user.room).emit("UpdatePlayers", getActivePlayers(user.room));

		// Player Move
		socket.on("PlayerMove", i => {
			if (user.symbol === board.actualPlayer) {
				board.move(i);
				formateGameState();
				io.to(user.room).emit("status", gameState);
				io.to(user.room).emit("UpdatePlayers", getActivePlayers(user.room));
			}
		});

		// New Board
		socket.on("NewBoard", () => {
			board.newBoard();
			formateGameState();
			io.to(user.room).emit("status", gameState);
			io.to(user.room).emit("UpdatePlayers", getActivePlayers(user.room));
		});

		// Reset
		socket.on("Reset", () => {
			board.init();
			formateGameState();
			io.to(user.room).emit("status", gameState);
			io.to(user.room).emit("UpdatePlayers", getActivePlayers(user.room));
		});

		updateUsersRoom(user);
	});

	// Quando o user sair
	socket.on("disconnect", () => {
		const user = getCurrentUser(socket.id);
		if (user) {
			io.to(user.room).emit("status", gameState);
			io.to(user.room).emit("UpdatePlayers", getActivePlayers(user.room));
			userLeave(socket.id);
			updateUsersRoom(user);
		}
	});
});

// Obter Users da Sala
function updateUsersRoom(user) {
	io.to(user.room).emit("UsersRoom", {
		room: user.room,
		users: getRoomUsers(user.room),
	});
}

function formateGameState() {
	gameState = {
		state: board.state,
		actualPlayer: board.actualPlayer,
		isGameOver: board.isGameOver,
		winPlayer: board.winPlayer,
		score: board.score,
	};
}

const PORT = process.env.PORT || 3000;
server.listen(PORT);
