const createAndAppend = require('../helpers/create_append');
const PubSub = require('../helpers/pub_sub.js');

const BoardView = function (game) {
  this.game = game;
  this.player1Piece = null;
  this.player2Piece = null;
}

BoardView.prototype.bindEvents = function () {
  const start = document.querySelector('#space0');
  const dieButton = document.querySelector('#dieButton');

  dieButton.addEventListener('click', () => {
    this.game.currentPlayer.rollDie();
    dieButton.disabled = true;
  })
  this.player1Piece = createAndAppend('div', 'playerPiece', `${this.game.player1.player}`, '', start)
  this.player2Piece = createAndAppend('div', 'playerPiece', `${this.game.player2.player}`, '', start)
  this.movePlayer();
  this.printNumber();
};

BoardView.prototype.movePlayer = function () {
  PubSub.subscribe('Board:move-player', (event) => {
    const player = event.detail;
    const pieceName = event.detail.player;
    const position = `#space${event.detail.position}`
    const start = `#space${event.detail.endTurnPosition}`;
    const place = document.querySelector(start);
    const piece = document.querySelector(`#${pieceName}`);
    place.removeChild(piece)
    document.querySelector(position).appendChild(piece);
    document.querySelector(position);
  });
  PubSub.subscribe('Board:final-position', (event) => {
    const position = `#space${event.detail}`;
    const square = document.querySelector(position);
    const category =  square.classList.value;
    PubSub.publish('BoardView:category', category);
  });
};

//die in board view
BoardView.prototype.printNumber = function () {
  PubSub.subscribe('Player:rollnumber', (event) => {
    const number = event.detail;
    const roller = document.querySelector('#diePlace');
    roller.innerHTML = number;
  });
};

module.exports = BoardView;
