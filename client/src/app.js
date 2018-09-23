const Board = require('./models/board.js');
const Game = require('./models/game.js');
const Player = require('./models/player.js');
const Card = require('./models/card.js');
const BoardView = require('./views/board_view.js');
const QuestionView = require('./views/card_question_view.js');

document.addEventListener('DOMContentLoaded', () => {


// const container = document.querySelector('#card-details');
// const quizView = new QuizView(container, form);
// quizView.bindEvents();
const player1 = new Player("player1");
const player2 = new Player("player2")
const game = new Game(player1, player2)
const boardView = new BoardView(game);
const questionView = new QuestionView();
boardView.bindEvents();
questionView.bindEvents();

game.startGame()


// const card = new Card()
// card.bindEvents();

// const board = new Board();
// board.movesPlayer(player1, 7);




// // TODO: Remove this debug line...
// card.showQuestion();
});
