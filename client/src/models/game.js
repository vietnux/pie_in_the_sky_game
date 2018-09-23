const PubSub = require('../helpers/pub_sub.js');
const Board = require('./board.js');
const Player = require('./player.js');
const Card = require('./card.js');

const Game = function (player1, player2) {
  this.player1 = player1;
  this.player2 = player2;
  this.currentPlayer = null;
  this.currentCategory = null;
};

Game.prototype.startGame = function () {
  this.currentPlayer = this.player1;
  const board = new Board();
  this.playTurn(board);
  PubSub.subscribe(`Card:is-correct`, (event => {
    const isCorrect = event.detail;
    console.log(isCorrect);
  }))
};

Game.prototype.playTurn = function (board) {
  const card = new Card();
  card.bindEvents();
  const dieRoll = this.currentPlayer.rollDie();
  board.movesPlayer(this.currentPlayer, dieRoll);
  // card.asksQuestion(category) ? this.playTurn : this.endTurn

};

Game.prototype.checkFunction = function () {
  PubSub.subscribe(`Card:is-correct`, (event => {
    const isCorrect = event.detail;
    console.log(isCorrect);
  }))
};

Game.prototype.endTurn = function () {
  this.currentPlayer = this.player1;
  if (this.currentPlayer.name === this.player1.name) {
    this.currentPlayer = this.player2;
  }
  else {
    this.currentPlayer = player1
  }
};


module.exports = Game;
