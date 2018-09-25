const PubSub = require('../helpers/pub_sub.js');

const PlayerView = function (game) {
  this.game = game;
};

PlayerView.prototype.bindEvents = function () {

  const currentPlayerDisplay = document.querySelector('#current-player');
  currentPlayerDisplay.textContent = `It's your turn ${this.game.player1.name}!`;
  PubSub.subscribe('Game:current-player-change', (evt) => {
    currentPlayerDisplay.textContent = `It's your turn ${evt.detail.name}!`;
  });
  this.setTimer();
};

PlayerView.prototype.setTimer = function () {
  PubSub.subscribe('Timer:currentTime', (evt) => {
    const timerPlace = document.querySelector('#timer');
    timerPlace.innerHTML = `You have ${evt.detail} seconds left`
  })
};

module.exports = PlayerView;
