const Board = function () {

};

Board.prototype.movesPlayer = function (player, dieAmount) {
  for (i = 0; i < dieAmount; i++) {
   player.position += 1;
   if (player.position === 25) {
     player.position = 0;
   };
 };
 return
};

module.exports = Board;
