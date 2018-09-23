const PubSub = require('../helpers/pub_sub.js');

const PlayerView = function (game) {
  this.game = game;
};

PlayerView.prototype.bindEvents = function () {

  const currentPlayerDisplay = document.querySelector('#current-player');
  currentPlayerDisplay.textContent = `${this.game.player1.name}:`;
  PubSub.subscribe('Game:die-roll', (evt) => {
    const dieRollDisplay = document.querySelector('#die-roll-display');
    dieRollDisplay.textContent = `...rolled a ${evt.detail}`;
  });
  PubSub.subscribe('Game:current-player-change', (evt) => {
    currentPlayerDisplay.textContent = `${evt.detail.name}:`;
  });
};

module.exports = PlayerView;
