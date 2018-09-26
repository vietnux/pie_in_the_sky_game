const PubSub = require('../helpers/pub_sub.js');

const Player = function (name, player) {
  this.icon = null;
  this.name = name;

  this.score = [0, 0, 0, 0, 0, 0];
  this.position = 'a1';
  this.player = player;
};

Player.prototype.rollDie = function () {
  const randomNumber = Math.floor(Math.random() * 6 + 1 );
  PubSub.publish('Player:rollnumber', randomNumber);
};

module.exports = Player;
