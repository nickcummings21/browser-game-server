const uuid = require("uuid").v1;

const Board = require("./Board");
const ExcavationPiece = require("./ExcavationPiece");

class Game {
  constructor() {
    this.id = uuid();
    this.pieces = [1, 2, 3, 4, 5, 6, 7, 8];
    this.board = new Board();
  }

  excavate(coords) {
    this.board.excavate(coords);
    return this.getGameState();
  }

  getGameState() {
    return {
      id: this.id,
      board: this.board.board,
      boardWidth: this.board.width,
      boardHeight: this.board.height,
      nextPiece: this.getNextPiece()
    };
  }

  getNextPiece() {
    return this.pieces[this.pieces.length - 1];
  }
}

module.exports = Game;
