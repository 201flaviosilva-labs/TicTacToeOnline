const users = [];

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };


  if (users.length < 2) {
    user.symbol = users.length === 0 ? "X" : "O";
  }

  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

// Get players room actives
function getActivePlayers(room) {
  return getRoomUsers(room).filter(user => user.symbol !== undefined);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  getActivePlayers,
};
