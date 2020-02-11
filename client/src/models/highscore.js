const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const HighScore = function(url) {
  this.url = url;
  this.currentEntries = null;
};

HighScore.prototype.bindEvents = function() {
  this.getNames();
  this.getWinner();
};

HighScore.prototype.getNames = function() {
  const request = new Request(this.url);
  request.get().then((entries) => {
    this.currentEntries = entries;
    PubSub.publish('HighScore:allscores', this.currentEntries);
  });
};

HighScore.prototype.getWinner = function() {
  PubSub.subscribe('Game:end-game', (event) => {
    const winner = event.detail.currentPlayer.name;
    if (this.currentEntries.find((entry) => entry.name === winner)) {
      this.updatePlayer(winner);
    } else {
      this.postPlayer(winner);
    }
  });
};

HighScore.prototype.postPlayer = function(player) {
  const request = new Request(this.url);
  const entry = {
    name: `${player}`,
    wins: 1,
  };
  request
    .post(entry)
    .then(() => {
      this.getNames();
    })
    .catch(console.error);
};

HighScore.prototype.updatePlayer = function(player) {
  const winner = this.currentEntries.filter((entry) => entry.name === player);
  const updatedWins = (winner[0].wins += 1);
  const body = {
    wins: updatedWins,
  };
  const request = new Request(this.url);
  request.put(winner[0]._id, body).then(() => {
    this.getNames();
  });
};

module.exports = HighScore;
