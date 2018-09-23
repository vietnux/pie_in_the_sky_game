const PubSub = require('../helpers/pub_sub.js');

const Board = function () {
};

Board.prototype.movesPlayer = function (player, dieAmount) {
  for (i = 0; i < dieAmount; i++) {
   player.position += 1;
   if (player.position === 24) {
     player.position = 0;
   };
   PubSub.publish('Board:move-player', player);
   player.endTurnPosition = player.position;
 };
 PubSub.publish('Board:final-position', player.endTurnPosition)
};


module.exports = Board;
