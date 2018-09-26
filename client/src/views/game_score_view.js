const createAndAppend = require('../helpers/create_append');
const PubSub = require('../helpers/pub_sub.js');

const GameScoreView = function (game) {
  this.game = game;
}

GameScoreView.prototype.bindEvents = function () {
  this.updateScores();
  PubSub.subscribe('Game:score-change', () => {
    this.updateScores();
  });
};

GameScoreView.prototype.updateScores = function () {
  for (player in this.game.players) {
    const scoreDisplay = document.querySelector(`#${this.game.players[player].player}-score-display`);
    scoreDisplay.textContent = this.game.players[player].name;
    console.log('has score', scoreDisplay);
    if (this.game.players[player] === this.game.currentPlayer) {
      scoreDisplay.classList.add('blinkPlayer');
    }
    else {
      scoreDisplay.classList.remove('blinkPlayer');
    }
    this.renderScore(this.game.players[player].score, scoreDisplay);
    this.changeBlinkingPlayer();
  }
  // const player1ScoreDisplay = document.querySelector('#player1-score-display');
  // player1ScoreDisplay.textContent = `${this.game.player1.name} score: `;
  // const player2ScoreDisplay = document.querySelector('#player2-score-display');
  // player2ScoreDisplay.textContent = `${this.game.player2.name} score: `;
  // const player3ScoreDisplay = document.querySelector('#player3-score-display');
  // player3ScoreDisplay.textContent = `${this.game.player3.name} score: `;
  // const player4ScoreDisplay = document.querySelector('#player4-score-display');
  // player4ScoreDisplay.textContent = `${this.game.player4.name} score: `;
  // this.renderScore(this.game.player1.score, player1ScoreDisplay);
  // this.renderScore(this.game.player2.score, player2ScoreDisplay);
  // this.renderScore(this.game.player3.score, player3ScoreDisplay);
  // this.renderScore(this.game.player4.score, player4ScoreDisplay);
};

GameScoreView.prototype.changeBlinkingPlayer = function () {
  PubSub.subscribe('Game:current-player-change', (event) => {
    for (player in this.game.players) {
      const scoreDisplay = document.querySelector(`#${this.game.players[player].player}-score-display`);
      scoreDisplay.textContent = this.game.players[player].name;
      if (this.game.players[player] === event.detail) {
        scoreDisplay.classList.add('blinkPlayer');
      }
      else {
        scoreDisplay.classList.remove('blinkPlayer');
      }
      this.renderScore(this.game.players[player].score, scoreDisplay);
    };
  });
};


GameScoreView.prototype.renderScore = function (scores, container) {
  const scalerContainer = createAndAppend('div', 'scaler-container', null, null, container);
  const scaler = createAndAppend('div', 'scaler', null, null, scalerContainer);
  const list = createAndAppend('ul', 'segments', null, null, scaler);


  scores.forEach((value, index) => {
    const segment = createAndAppend('li', 'segment', null, null, list);
    segment.style.webkitTransform = `rotate(${index * 60}deg) skewY(-30deg)`;
    if (value === 0) {
      segment.style.visibility = 'hidden';
    }
  });
};

module.exports = GameScoreView;
