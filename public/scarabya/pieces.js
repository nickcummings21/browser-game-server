const pieceOps = {
  flipXY: piece => {
    const oldPiece = deepCopy(piece);

    for (let i = 0; i < piece.length; i++) {
      for (let j = 0; j < piece[i].length; j++) {
        piece[i][j] = oldPiece[j][i];
      }
    }
    printPiece(piece);
    return piece;
  },
  flipX: piece => {
    const oldPiece = deepCopy(piece);

    for (let i = 0; i < piece.length; i++) {
      piece[i][0] = oldPiece[i][4];
      piece[i][1] = oldPiece[i][3];
      piece[i][3] = oldPiece[i][1];
      piece[i][4] = oldPiece[i][0];
    }
    printPiece(piece);
    return piece;
  },
  flipY: piece => {
    const oldPiece = deepCopy(piece);

    for (let i = 0; i < piece[0].length; i++) {
      piece[0][i] = oldPiece[4][i];
      piece[1][i] = oldPiece[3][i];
      piece[3][i] = oldPiece[1][i];
      piece[4][i] = oldPiece[0][i];
    }
    printPiece(piece);
    return piece;
  },
  rotateR: piece => {
    const oldPiece = deepCopy(piece);

    for (let i = 0; i < piece.length; i++) {
      piece[i][0] = oldPiece[4][i];
      piece[i][1] = oldPiece[3][i];
      piece[i][2] = oldPiece[2][i];
      piece[i][3] = oldPiece[1][i];
      piece[i][4] = oldPiece[0][i];
    }
    printPiece(piece);
    return piece;
  },
  rotateL: piece => {
    const oldPiece = deepCopy(piece);

    for (let i = 0; i < piece.length; i++) {
      let j = 4 - i;
      piece[i][0] = oldPiece[0][j];
      piece[i][1] = oldPiece[1][j];
      piece[i][2] = oldPiece[2][j];
      piece[i][3] = oldPiece[3][j];
      piece[i][4] = oldPiece[4][j];
    }
    printPiece(piece);
    return piece;
  }
};

const deepCopy = obj => JSON.parse(JSON.stringify(obj));
const printPiece = piece => {
  let temp = "";
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[i].length; j++) {
      temp = temp + piece[i][j] + " ";
    }
    temp += "\n";
  }
  console.log(temp);
};

const pieces = {
  0: [
    [0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0],
    [0, 0, 3, 3, 0],
    [0, 0, 3, 3, 0],
    [0, 0, 0, 0, 0]
  ], // the fatty

  1: [
    [0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0],
    [0, 3, 3, 3, 0],
    [0, 0, 3, 0, 0],
    [0, 0, 0, 0, 0]
  ], // the cross

  2: [
    [0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0],
    [0, 3, 3, 3, 0],
    [0, 0, 3, 0, 0],
    [0, 0, 0, 0, 0]
  ], // the funky

  3: [
    [0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0],
    [0, 3, 3, 0, 0],
    [0, 0, 3, 0, 0],
    [0, 0, 3, 0, 0]
  ], // the worm

  4: [
    [0, 0, 0, 0, 0],
    [0, 3, 3, 0, 0],
    [0, 0, 3, 0, 0],
    [0, 0, 3, 0, 0],
    [0, 0, 3, 0, 0]
  ], // the "L"

  5: [
    [0, 0, 3, 0, 0],
    [0, 0, 3, 0, 0],
    [0, 0, 3, 0, 0],
    [0, 0, 3, 0, 0],
    [0, 0, 3, 0, 0]
  ], // the line

  6: [
    [0, 0, 0, 0, 0],
    [0, 3, 3, 0, 0],
    [0, 3, 0, 0, 0],
    [0, 3, 3, 0, 0],
    [0, 0, 0, 0, 0]
  ], // the "C"

  7: [
    [0, 0, 0, 0, 0],
    [0, 0, 3, 3, 0],
    [0, 0, 3, 0, 0],
    [0, 3, 3, 0, 0],
    [0, 0, 0, 0, 0]
  ], // the "Z"

  8: [
    [0, 0, 0, 0, 0],
    [0, 0, 3, 3, 0],
    [0, 3, 3, 0, 0],
    [0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ], // the zig-zag

  9: [
    [0, 0, 0, 0, 0],
    [0, 3, 3, 3, 0],
    [0, 3, 0, 0, 0],
    [0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ], // the corner

  10: [
    [0, 0, 0, 0, 0],
    [0, 3, 3, 3, 0],
    [0, 0, 3, 0, 0],
    [0, 0, 3, 0, 0],
    [0, 0, 0, 0, 0]
  ], // the "T"

  11: [
    [0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0],
    [0, 0, 3, 3, 0],
    [0, 0, 3, 0, 0],
    [0, 0, 3, 0, 0]
  ] // the key
};
