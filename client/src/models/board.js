const PubSub = require('../helpers/pub_sub.js');

const Board = function () {
};

Board.prototype.bindEvents = function () {
  // PubSub.subscribe('Game:destination-square-picked', (evt) => {
  //   console.log(evt.detail);
  //   this.clearHighlightedSquares(evt.detail[0]);
  // });

  PubSub.subscribe('Game:player-choose-move', (evt) => {
    // const boardGrid = document.querySelector('#board-grid');
    this.highlightSquares(evt.detail[0], evt.detail[1]);

  });

};

Board.prototype.setBoardPieces = function (number_of_players) {
  document.querySelector('#p1-piece').style.display = 'block';
  document.querySelector('#p2-piece').style.display = 'block';
  if (number_of_players>3) document.querySelector('#p4-piece').style.display = 'block';
  if (number_of_players>2) document.querySelector('#p3-piece').style.display = 'block';
};

Board.prototype.highlightSquares = function (squares, player) {
  for (move_option of squares) {
    const highlightedSquare = document.querySelector(`#${move_option}`);
    highlightedSquare.classList.add('highlighted-move');
    highlightedSquare.style.border = "2px dashed white";
    highlightedSquare.style.color = "white";
    highlightedSquare.onclick = function () {
      clearHighlightedSquares();
      PubSub.publish('Board:player-move', this.id);
      // this.board.movesPlayer(this.currentPlayer, moves);
    };
  };
};

// Board.prototype.pickSquare = function () {
//   this.clearHighlightedSquares(evt.detail[0]);
// };


clearHighlightedSquares = function () {
  for (square of document.querySelectorAll('.highlighted-move')) {
    square.classList.remove('highlighted-move');
    square.style.border = "1px solid gray";
    square.style.color = "black";
    square.onclick = null;
  };
};
// Board.prototype.clearHighlightedSquares = function () {
//   console.log('clear highlighted squares called');
//   for (square of document.querySelectorAll('.highlighted-move')) {
//     square.classList.remove('highlighted-move');
//     square.style.border = "1px solid gray";
//     square.removeAttribute('onclick');
//   };
// };

// Board.prototype.movesPlayer = function (player, dieAmount) {
//   for (i = 0; i < dieAmount; i++) {
//    player.position += 1;
//    if (player.position === 24) {
//      player.position = 0;
//    };
//    PubSub.publish('Board:move-player', player);
//    player.endTurnPosition = player.position;
//  };
//  PubSub.publish('Board:final-position', player.endTurnPosition)
// };


module.exports = Board;
