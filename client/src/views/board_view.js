const createAndAppend = require('../helpers/create_append');
const PubSub = require('../helpers/pub_sub.js');
const BoardMap = require('../helpers/board_map.js');
const Player = require('../models/player.js');

const BoardView = function (game) {
  this.game = game;
  this.player1Piece = null;
  this.player2Piece = null;
}

BoardView.prototype.bindEvents = function () {
  // const start = document.querySelector('#space0');
  const dieButton = document.querySelector('#dieButton');

  dieButton.addEventListener('click', () => {
    this.game.currentPlayer.rollDie();
    // player.rollDie();
    // dieButton.disabled = true;
  });

  this.player1Piece = document.querySelector('#p1-piece');
  this.player2Piece = document.querySelector('#p2-piece');
  // this.movePlayer();
  this.printNumber();

      PubSub.subscribe('Board:player-move', (evt) => {

        this.game.currentPlayer.position = evt.detail;
        let activePiece = null;
        if (this.game.currentPlayer === this.game.player1) {
          this.player1Piece.style.left = BoardMap[evt.detail]['left']+5 + 'px';
          this.player1Piece.style.top = BoardMap[evt.detail]['top']+5 + 'px';
        } else {
          this.player2Piece.style.left = BoardMap[evt.detail]['left']+35 + 'px';
          this.player2Piece.style.top = BoardMap[evt.detail]['top']+35 + 'px';
        }
        const category = document.querySelector(`#${evt.detail}`).classList.value;
        // console.log(category);
        PubSub.publish('BoardView:category', category);

      });

};


    //   const player = evt.detail;
    //   const pieceName = evt.detail.name;
    //   const position = `#space${evt.detail.position}`
    //   const start = `#space${evt.detail.endTurnPosition}`;
    //   const place = document.querySelector(start);
    //   const piece = document.querySelector(`#${pieceName}`);
    //   place.removeChild(piece)
    //   document.querySelector(position).appendChild(piece);
    //   document.querySelector(position);
    // });
    // PubSub.subscribe('Board:final-position', (evt) => {
    //   const position = `#space${evt.detail}`;
    //   const square = document.querySelector(position);
    //   const category =  square.classList.value;
    //   PubSub.publish('BoardView:category', category);
    // });

// };

//die in board view
BoardView.prototype.printNumber = function () {
  PubSub.subscribe('Player:rollnumber', (event) => {
    const number = event.detail;
    const roller = document.querySelector('#diePlace');
    roller.innerHTML = number;
  });
};

module.exports = BoardView;
