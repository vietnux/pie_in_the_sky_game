const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const HighScore = function (url) {
  this.url = url;
  this.currentNames = null;
};

HighScore.prototype.getNames = function () {
  const request = new Request(this.url);
  request.get()
  .then((entries) => {
     const allNames = entries.map(entry => entry.name);
     this.currentNames = allNames;
  })
  this.getWinner();
};

HighScore.prototype.getWinner = function () {
  PubSub.subscribe('Game:end-game', (event) => {
    const winner = event.detail.currentPlayer.name
    console.log(winner);
  })
};

module.exports = HighScore;
