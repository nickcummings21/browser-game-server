const Game = require("./models/Game");

const games = {};
const playersByGame = {};

const newGame = socketId => {
  const game = new Game();
  games[game.id] = game;
  playersByGame[game.id] = [socketId];
  // game.excavate([{x: 2, y: 4}, {x: 1, y: 4},{x: 3, y: 4}]);
  return game;
};

const joinGame = (socketId, gameId) => {
  if (games[gameId] == undefined) {
    return null;
  }
  playersByGame[gameId].push(socketId);
  return games[gameId];
}

const getPlayers = gameId => {
  return playersByGame[gameId];
}

module.exports.newGame = newGame;
module.exports.joinGame = joinGame;
module.exports.getPlayers = getPlayers;
