const createAndAppend = require('../helpers/create_append');
const PubSub = require('../helpers/pub_sub.js');
const BoardMap = require('../helpers/board_map.js');
const Player = require('../models/player.js');

const BoardView = function (game) {
  this.game = game;
}

BoardView.prototype.bindEvents = function () {
  const dieButton = document.querySelector('#dieButton');
// click event listener on die roll button, disabled post-click to prevent multiple rolls per turn
  dieButton.addEventListener('click', () => {
    this.game.currentPlayer.rollDie();
    dieButton.disabled = true;
  });

// Player 1 and 2 board pieces assigned colours from player objects
// Same for Player 3 and 4 if they exist
  this.player1Piece = document.querySelector('#p1-piece');
  this.player1Piece.style.backgroundColor = this.game.player1.colour;
  this.player2Piece = document.querySelector('#p2-piece');
  this.player2Piece.style.backgroundColor = this.game.player2.colour;
  this.player3Piece = document.querySelector('#p3-piece');
  if (this.game.player3) this.player3Piece.style.backgroundColor = this.game.player3.colour;
  this.player4Piece = document.querySelector('#p4-piece');
  if (this.game.player4) this.player4Piece.style.backgroundColor = this.game.player4.colour;

  this.printNumber();

// Destination board square passed in (eg. "b7"), and assigned to currentPlayer.position
// Absolute positioning coordinates of destination square retrieved from BoardMap by using
// the destination board square as the key - absolute left and absolute top values retrieved
// Absolute positions applied to board piece, and adjusted depending on currentPlayer to position
// in the corner of the square to avoid overlapping with other player's board pieces
  PubSub.subscribe('Board:player-move', (evt) => {

    this.game.currentPlayer.position = evt.detail;
    if (this.game.currentPlayer === this.game.player1) {
      this.player1Piece.style.left = BoardMap[evt.detail]['left']+4 + 'px';
      this.player1Piece.style.top = BoardMap[evt.detail]['top']+4 + 'px';
    } else if (this.game.currentPlayer === this.game.player2)  {
      this.player2Piece.style.left = BoardMap[evt.detail]['left']+42 + 'px';
      this.player2Piece.style.top = BoardMap[evt.detail]['top']+42 + 'px';
    } else if (this.game.currentPlayer === this.game.player3) {
      this.player3Piece.style.left = BoardMap[evt.detail]['left']+42 + 'px';
      this.player3Piece.style.top = BoardMap[evt.detail]['top']+4 + 'px';
    } else {
      this.player4Piece.style.left = BoardMap[evt.detail]['left']+4 + 'px';
      this.player4Piece.style.top = BoardMap[evt.detail]['top']+42 + 'px';
    };
    const category = document.querySelector(`#${evt.detail}`).classList.value;
    PubSub.publish('BoardView:category', category);

  });

};

// Die roll number output to display box
BoardView.prototype.printNumber = function () {
  PubSub.subscribe('Player:rollnumber', (event) => {
    const number = event.detail;
    const roller = document.querySelector('#diePlace');
    roller.innerHTML = number;
  });
};

module.exports = BoardView;
