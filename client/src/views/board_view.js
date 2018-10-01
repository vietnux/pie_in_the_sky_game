const createAndAppend = require('../helpers/create_append');
const PubSub = require('../helpers/pub_sub.js');
const BoardMap = require('../helpers/board_map.js');
const Player = require('../models/player.js');

const BoardView = function (game) {
  this.game = game;
}

BoardView.prototype.bindEvents = function () {
  const dieButton = document.querySelector('#dieButton');

  dieButton.addEventListener('click', () => {
    this.game.currentPlayer.rollDie();
    dieButton.disabled = true;
  });

  this.player1Piece = document.querySelector('#p1-piece');
  this.player1Piece.style.backgroundColor = this.game.player1.colour;
  this.player2Piece = document.querySelector('#p2-piece');
  this.player2Piece.style.backgroundColor = this.game.player2.colour;
  this.player3Piece = document.querySelector('#p3-piece');
  if (this.game.player3) this.player3Piece.style.backgroundColor = this.game.player3.colour;
  this.player4Piece = document.querySelector('#p4-piece');
  if (this.game.player4) this.player4Piece.style.backgroundColor = this.game.player4.colour;




  this.printNumber();

      PubSub.subscribe('Board:player-move', (evt) => {

        this.game.currentPlayer.position = evt.detail;
        let activePiece = null;
        if (this.game.currentPlayer === this.game.player1) {
          this.player1Piece.style.left = BoardMap[evt.detail]['left']+0.8 + '%';
          this.player1Piece.style.top = BoardMap[evt.detail]['top']+0.8 + '%';
        } else if (this.game.currentPlayer === this.game.player2)  {
          this.player2Piece.style.left = BoardMap[evt.detail]['left']+7.4 + '%';
          this.player2Piece.style.top = BoardMap[evt.detail]['top']+7.4 + '%';
        } else if (this.game.currentPlayer === this.game.player3) {
          this.player3Piece.style.left = BoardMap[evt.detail]['left']+7.4 + '%';
          this.player3Piece.style.top = BoardMap[evt.detail]['top']+0.8 + '%';
        } else {
          this.player4Piece.style.left = BoardMap[evt.detail]['left']+0.8 + '%';
          this.player4Piece.style.top = BoardMap[evt.detail]['top']+7.4 + '%';
        };
        const category = document.querySelector(`#${evt.detail}`).classList.value;
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
