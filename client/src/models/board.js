const PubSub = require('../helpers/pub_sub.js');

const Board = function () {
};

Board.prototype.bindEvents = function () {

  PubSub.subscribe('Game:player-choose-move', (evt) => {
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
    highlightedSquare.style.border = "3px white";
    highlightedSquare.style.borderStyle = "dashed solid";
    highlightedSquare.style.color = "white";
    highlightedSquare.onclick = function () {
      clearHighlightedSquares();
      PubSub.publish('Board:player-move', this.id);
    };
  };
};


clearHighlightedSquares = function () {
  for (square of document.querySelectorAll('.highlighted-move')) {
    square.classList.remove('highlighted-move');
    square.style.border = "1px solid gray";
    square.style.color = "black";
    square.onclick = null;
  };
};


module.exports = Board;
