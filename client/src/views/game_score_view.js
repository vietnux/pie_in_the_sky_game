const createAndAppend = require('../helpers/create_append');
const PubSub = require('../helpers/pub_sub.js');

const GameScoreView = function (game) {
  this.game = game;
}

GameScoreView.prototype.bindEvents = function () {
  const player1ScoreDisplay = document.querySelector('#player1-score-display');
  player1ScoreDisplay.textContent = `${this.game.player1.name} score: ${this.game.player1.score}`;
  const player2ScoreDisplay = document.querySelector('#player2-score-display');
  player2ScoreDisplay.textContent = `${this.game.player2.name} score: ${this.game.player2.score}`;
};

//TODO subscribe to score change - tie in with player view to identify current player

module.exports = GameScoreView;
