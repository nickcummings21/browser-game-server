const rand = require("random-int");

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 10;

const BLANK = 0;
const SCARAB = 1;
const ROCK = 2;
const EXCAVATED = 3;

class Board {
  constructor() {
    this.board = [];
    this.blankBoard = [];
    this.width = BOARD_WIDTH;
    this.height = BOARD_HEIGHT;
    this.generateBoard();
  }

  generateBoard() {
    for (let i = 0; i < BOARD_HEIGHT; i++) {
      this.board.push([]);
      for (let j = 0; j < BOARD_WIDTH; j++) {
        const temp = rand(100);
        if (temp < 8) {
          this.board[i].push(ROCK);
        } else if (temp < 40) {
          this.board[i].push(SCARAB);
        } else {
          this.board[i].push(BLANK);
        }
      }
    }
    this.blankBoard = JSON.parse(JSON.stringify(this.board));
  }

  excavate(coords) {
    for (let i = 0; i < coords.length; i++) {
      const currValue = this.board[coords[i].y][coords[i].x];
      const origValue = this.blankBoard[coords[i].y][coords[i].x];
      this.board[coords[i].y][coords[i].x] =
        currValue == origValue && origValue != ROCK ? EXCAVATED : origValue;
    }
  }
}

module.exports = Board;
