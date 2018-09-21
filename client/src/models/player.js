const Player = function (name) {
  this.icon = null;
  this.name = name;
  this.score = 0;
  this.position = 0;
};

Player.prototype.rollDie = function () {
  return Math.floor(Math.random() * 6 + 1 )
};


module.exports = Player;
