const createAndAppend = require('../helpers/create_append');
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
    let time = evt.detail
    let mins = Math.floor(evt.detail / 60);
    let seconds = evt.detail % 60;
    timerPlace.innerHTML = `You have ${mins} minutes and ${seconds} seconds left`
  })
};

module.exports = PlayerView;
