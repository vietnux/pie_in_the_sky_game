const PubSub = require('../helpers/pub_sub.js');

const BoardView = function() {
  this.playerPiece = document.querySelector('#player-piece');
  this.playerPosition = 0;
};

BoardView.prototype.bindEvents = function () {
  this.setupBoard();
  PubSub.subscribe('Board:move-player', (evt) => {
    const moveDetails = evt.detail;
    this.forward(moveDetails);
  });
};

BoardView.prototype.setupBoard = function () {
  this.playerPiece.style.top = 0;
  this.playerPiece.style.left = 0;
};

BoardView.prototype.moveDown = function () {
    currentPositionY = this.playerPiece.style.top.slice(0, -2)
    currentPositionY = parseInt(currentPositionY);
    if (currentPositionY < 300) {
      currentPositionY += 50;
    }
    this.playerPiece.style.top = currentPositionY + 'px';
  };
BoardView.prototype.moveUp = function () {
    currentPositionY = this.playerPiece.style.top.slice(0, -2)
    currentPositionY = parseInt(currentPositionY);
    if (currentPositionY > 0) {
      currentPositionY -= 50;
    }
    this.playerPiece.style.top = currentPositionY + 'px';
  };
BoardView.prototype.moveLeft = function () {
    currentPositionX = this.playerPiece.style.left.slice(0, -2)
    currentPositionX = parseInt(currentPositionX);
    if (currentPositionX > 0) {
      currentPositionX -= 50;
    }
    this.playerPiece.style.left = currentPositionX + 'px';
  };
BoardView.prototype.moveRight = function () {
    currentPositionX = this.playerPiece.style.left.slice(0, -2);
    currentPositionX = parseInt(currentPositionX);
    if (currentPositionX < 300) {
      currentPositionX += 50;
    }
    this.playerPiece.style.left = currentPositionX + 'px';
  };

BoardView.prototype.forward = function (number_of_squares) {
let moves = number_of_squares;
while (moves>0) {
  while (this.playerPosition<6) {
    this.moveRight();
    this.playerPosition++;
    moves--;
    if (moves <= 0) break;
  };
  while (this.playerPosition>5 && this.playerPosition<12) {
    if (moves <= 0) break;
    this.moveDown();
    this.playerPosition++;
    moves--;
  };
  while (this.playerPosition>11 && this.playerPosition<18) {
    if (moves <= 0) break;
    this.moveLeft();
    this.playerPosition++;
    moves--;
  };
  while (this.playerPosition>17 && this.playerPosition<24) {
    if (moves <= 0) break;
    this.moveUp();
    this.playerPosition++;
    moves--;
    if (this.playerPosition === 24) {
      this.playerPosition = 0;
    }
  };
};
}

BoardView.prototype.backward = function (number_of_squares) {
let moves = number_of_squares;
while (moves>0) {
while (this.playerPosition>17 && this.playerPosition<24) {
  if (moves <= 0) break;
  this.moveDown();
  this.playerPosition--;
  moves--;
};
while (this.playerPosition>11 && this.playerPosition<18) {
  if (moves <= 0) break;
  this.moveRight();
  this.playerPosition--;
  moves--;
};
while (this.playerPosition>5 && this.playerPosition<12) {
  if (moves <= 0) break;
  this.moveUp();
  this.playerPosition--;
  moves--;
};
while (this.playerPosition<6) {
  if (moves <= 0) break;
  this.moveLeft();
  this.playerPosition--;
  moves--;
  if (this.playerPosition === -1) {
    this.playerPosition = 23;
  }
};
};
}

module.exports = BoardView;
