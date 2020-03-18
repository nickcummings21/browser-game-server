const express = require("express");
const path = require("path");
const socket = require("socket.io");

const scarabya = require("./scarabya/server/main");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/api/scarabya/rules", (req, res) => {
  res.json({ gameTitle: 'Scarabya', rules: []});
});

app.get("/api/scarabya/new-game", (req, res) => {
  const game = scarabya.newGame();
  console.log("SCARABYA", game);
  res.json(game.getGameState());
});

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(PORT, () => console.log("SERVER STARTED ON PORT", PORT));
const io = socket(server);

const sockets = {};
io.on("connection", socket => {
  console.log("CONNECTED", socket.id);
  sockets[socket.id] = socket;
  
  let game = {};
  socket.on("new-game", () => {
    game = scarabya.newGame(socket.id);
    socket.emit("start-game", game.getGameState());
  });
  socket.on("join-game", id => {
    game = scarabya.joinGame(socket.id, id);
    socket.emit("start-game", game.getGameState());
  });

  socket.on("excavate", data => {
    console.log("EXCAVATE", data);
    const gameState = game.excavate(data);
    const players = scarabya.getPlayers(game.id);
    for (playerId of players) {
      sockets[playerId].emit("update-game-state", gameState);
    }
  });
});

