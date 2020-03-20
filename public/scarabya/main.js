// const SERVER_URL = "http://localhost:5000";
const SERVER_URL = "https://browser-game-server.herokuapp.com";

const socket = io(SERVER_URL);

const BLANK = 0;
const SCARAB = 1;
const ROCK = 2;
const EXCAVATED = 3;

socket.on("connect", () => {
  console.log("CONNECTED");
});

socket.on("message", message => {
  console.log("MESSAGE: ", message);
});

socket.on("start-game", game => {
  console.log("GAME:", game);
  document.getElementById("game-id").value = game.id;
  initBoard(game.boardWidth, game.boardHeight);
  updateBoard(game);
});

socket.on("update-game-state", gameState => {
  console.log("UPDATE GAME STATE:", gameState);
  updateBoard(gameState);
});

const excavate = event => {
  const coords = [
    {
      x: parseInt(event.target.dataset.x),
      y: parseInt(event.target.dataset.y)
    }
  ];
  console.log("EXCAVATE", coords);
  socket.emit("excavate", coords);
};

const updateBoard = gameState => {
  const { board, nextPiece } = gameState;
  const boardEl = document.querySelector(".board");

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const spaceValue = board[i][j];

      const spaceEl = document.querySelector("#space" + i + j);
      switch (spaceValue) {
        case BLANK:
          spaceEl.style.backgroundColor = "#aaa";
          break;
        case SCARAB:
          spaceEl.style.backgroundColor = "yellow";
          break;
        case ROCK:
          spaceEl.style.backgroundColor = "#333";
          break;
        case EXCAVATED:
          spaceEl.style.backgroundColor = "darkgreen";
          break;
      }
      boardEl.appendChild(spaceEl);
    }
  }
};

const initBoard = (boardWidth, boardHeight) => {
  const boardEl = document.querySelector(".board");
  boardEl.innerHTML = "";

  for (let i = 0; i < boardHeight; i++) {
    for (let j = 0; j < boardWidth; j++) {
      const spaceEl = document.createElement("div");
      spaceEl.id = "space" + i + j;
      spaceEl.dataset.y = i;
      spaceEl.dataset.x = j;
      spaceEl.onclick = excavate;
      spaceEl.style.backgroundColor = "#aaa";

      boardEl.appendChild(spaceEl);
    }
  }
};

const initNextPieceDisplay = () => {
  const nextPieceDisplay = document.querySelector(".next-piece-display");
  nextPieceDisplay.innerHTML = "";
  let i = 0;
  while (i < 25) {
    const space = document.createElement("div");
    space.id = "display-space" + Math.floor(i / 5) + (i % 5);
    nextPieceDisplay.appendChild(space);
    i++;
  }
};
initNextPieceDisplay();

let activePiece = -1;
const displayNextPiece = temp => {
  activePiece = (activePiece < 11) ? activePiece + 1 : 0;
  updatePieceDisplay();
}

const updatePieceDisplay = () => {
  const nextPiece = pieces[activePiece];
  for (let i = 0; i < nextPiece.length; i++) {
    for (let j = 0; j < nextPiece[i].length; j++) {
      const currSpace = document.querySelector("#display-space" + i + j);
      if (nextPiece[i][j] == 3) {
        currSpace.style.backgroundColor = "gray";
      }
      else {
        currSpace.style.backgroundColor = "white";
      }
    } 
  }
}
displayNextPiece(pieces[0]);

const newGame = () => {
  socket.emit("new-game", null);
};

const joinGame = () => {
  const gameId = document.getElementById("game-id").value;
  if (gameId === "") {
    alert("Game ID invalid.");
    return;
  }
  socket.emit("join-game", gameId);
};

const sendMessage = () => {
  const message = document.getElementById("chat-input").value;
  if (message === "") return;

  const chatMessage = document.createElement("div");
  chatMessage.classList.add("chat-message");
  chatMessage.innerHTML = message;

  const chat = document.querySelector(".chat-body");
  chat.appendChild(chatMessage);
};



