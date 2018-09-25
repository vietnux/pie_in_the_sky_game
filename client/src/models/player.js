const PubSub = require('../helpers/pub_sub.js');

const Player = function (name) {
  this.icon = null;
  this.name = name;
  this.score = 0;
  this.position = 'a1';
  this.endTurnPosition = 0;
};

Player.prototype.rollDie = function () {
  const randomNumber = Math.floor(Math.random() * 6 + 1 );
  PubSub.publish('Player:rollnumber', randomNumber);
};


module.exports = Player;
