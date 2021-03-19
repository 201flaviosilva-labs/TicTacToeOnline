// Player Name
const playerNameInput = document.getElementById("PlayerName");
playerNameInput.addEventListener("keypress", () => { updateLocalStorage(); });
playerNameInput.addEventListener("change", () => { updateLocalStorage(); });

const playerText = localStorage.getItem("PlayerName") || "";
playerNameInput.value = playerText;
playerNameInput.innerHTML = playerText;

function updateLocalStorage() {
	localStorage.setItem("PlayerName", playerNameInput.value);
}


// Room Name
const roomName = document.getElementById("RoomName");

const randomNumber = (min = 0, max = 10) => Math.floor(Math.random() * (max - min + 1) + min);
const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

let randomRoom = "";
const numMax = randomNumber(5, 10);
for (let i = 0; i < numMax; i++) {
	randomRoom += abc[randomNumber(0, abc.length - 1)];
}
randomRoom += randomNumber(0, 1000);

roomName.value = randomRoom;
roomName.innerHTML = randomRoom;
