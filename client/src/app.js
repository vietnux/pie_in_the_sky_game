const Board = require('./models/board.js');
const Game = require('./models/game.js');
const Player = require('./models/player.js');
const Card = require('./models/card.js');
const BoardView = require('./views/board_view.js');
const QuestionView = require('./views/card_question_view.js');

document.addEventListener('DOMContentLoaded', () => {

const card = new Card()
card.bindEvents();

// const container = document.querySelector('#card-details');
// const quizView = new QuizView(container, form);
// quizView.bindEvents();

const player1 = new Player("player1");
const player2 = new Player("player2")
const game = new Game(player1, player2)

const boardView = new BoardView(game);
boardView.bindEvents();

const board = new Board();
board.movesPlayer(player1, 7);



const questionView = new QuestionView();
questionView.bindEvents();

// TODO: Remove this debug line...
card.showQuestion(5);
});
