const Board = require('./models/board.js');
const Game = require('./models/game.js');
const Player = require('./models/player.js');
const Card = require('./models/card.js');
const BoardView = require('./views/board_view.js');

document.addEventListener('DOMContentLoaded', () => {

const startGameForm = document.querySelector("#start-screen-form");
const startScreenDiv = document.querySelector('#start-screen');
startGameForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const player1 = new Player(evt.target.player1.value);
  const player2 = new Player(evt.target.player2.value);
  const newGame = new Game(player1, player2);
  startScreenDiv.style.display = "none";

  const card = new Card('')
  card.getData();

  // const container = document.querySelector('#card-details');
  // const quizView = new QuizView(container, form);
  // quizView.bindEvents();

  // const player1 = new Player("player1");

  const boardView = new BoardView();
  boardView.bindEvents();

  const board = new Board();
  board.movesPlayer(player1,3);


});


});
