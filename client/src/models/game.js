const PubSub = require('../helpers/pub_sub.js');
const BoardMap = require('../helpers/board_map.js');
const Board = require('./board.js');
const Player = require('./player.js');
const Card = require('./card.js');

const Game = function (player1, player2, board) {
  this.player1 = player1;
  this.player2 = player2;
  this.board = board;
  this.currentPlayer = null;
  this.currentCategory = null;
};

Game.prototype.startGame = function () {
  this.currentPlayer = this.player1;
  this.playTurn();
  PubSub.subscribe(`Card:is-correct`, (event => {
    const result = event.detail;
    this.checkResult(result)
  }))
};

Game.prototype.playTurn = function () {
  PubSub.subscribe('Player:rollnumber', (evt) => {
  const numberRolled = 'r' + evt.detail;
  const move_options = BoardMap[this.currentPlayer.position][numberRolled];
  PubSub.publish('Game:player-choose-move', [move_options, this.currentPlayer]);
  // this.board.movesPlayer(this.currentPlayer, moves);
});

};

Game.prototype.checkResult = function (result) {
  if (result === false) {
    this.endTurn();
  }
  else {
    this.currentPlayer.score += 1;
    PubSub.publish('Game:score-change', this.currentPlayer.score);
  }
};

Game.prototype.endTurn = function () {

  if (this.currentPlayer.name === this.player1.name) {
    this.currentPlayer = this.player2;
    console.log(this.player2);
  }
  else {
    this.currentPlayer = this.player1;
  };
  PubSub.publish('Game:current-player-change', this.currentPlayer);
};


module.exports = Game;
