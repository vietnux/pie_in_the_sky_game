const PubSub = require('../helpers/pub_sub.js');

const Board = function () {
};

// Subscribe to move options - passed an array of possible board squares based on die roll number
Board.prototype.bindEvents = function () {
  PubSub.subscribe('Game:player-choose-move', (evt) => {
    this.highlightSquares(evt.detail);
  });

};

// Make board pieces visible (hidden by default), based on number of players passed in
// Called from Game.startGame()
Board.prototype.setBoardPieces = function (number_of_players) {
  document.querySelector('#p1-piece').style.display = 'block';
  document.querySelector('#p2-piece').style.display = 'block';
  if (number_of_players>3) document.querySelector('#p4-piece').style.display = 'block';
  if (number_of_players>2) document.querySelector('#p3-piece').style.display = 'block';
};

// Array of possible destination squares passed in (eg. ["a4", "b7", "c1"])
Board.prototype.highlightSquares = function (squares) {
  for (move_option of squares) {
    const highlightedSquare = document.querySelector(`#${move_option}`);
    // highlightedSquare.classList.add('highlighted-move'); - doesn't seem to work?
    highlightedSquare.style.border = "3px white";
    highlightedSquare.style.borderStyle = "dashed solid";
    highlightedSquare.style.color = "white";
// Add click event listener to squares - onclick used instead of addEventListener to make removal easier
    highlightedSquare.onclick = function () {
// Destination square chosen - styling removed from highlighted squares and event listeners removed
      clearHighlightedSquares();
// Id of chosen square published to board view (eg. "a3"), to make board move
      PubSub.publish('Board:player-move', this.id);
    };
  };
};


clearHighlightedSquares = function () {
  for (square of document.querySelectorAll('.highlighted-move')) {
    // square.classList.remove('highlighted-move'); - doesn't seem to work?
    square.style.border = "1px solid gray";
    square.style.color = "black";
// Remove event listener from square - very difficult to remove if addEventListener used instead of onclick!
    square.onclick = null;
  };
};


module.exports = Board;
