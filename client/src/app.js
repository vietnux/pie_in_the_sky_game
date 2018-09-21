const Board = require('./models/board.js');
const Game = require('./models/game.js');
const Player = require('./models/player.js');
const Card = require('./models/card.js');
const BoardView = require('./views/board_view.js');

document.addEventListener('DOMContentLoaded', () => {

// const cards = new Card('')
// cards.getData();
// cards.bindEvents();

const player1 = new Player("player1");

const boardView = new BoardView();
boardView.bindEvents();

const board = new Board();
board.movesPlayer(player1,3);

});
