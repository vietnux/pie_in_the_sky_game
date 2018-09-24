const Board = require('./models/board.js');
const Game = require('./models/game.js');
const Player = require('./models/player.js');
const Card = require('./models/card.js');
const BoardView = require('./views/board_view.js');
const PlayerView = require('./views/player_view.js');
const QuestionView = require('./views/card_question_view.js');

document.addEventListener('DOMContentLoaded', () => {


// const container = document.querySelector('#card-details');
// const quizView = new QuizView(container, form);
// quizView.bindEvents();
const player1 = new Player("player1");
const player2 = new Player("player2");
const board = new Board();
const game = new Game(player1, player2, board);
const boardView = new BoardView(game);
const playerView = new PlayerView(game);
const questionView = new QuestionView();
boardView.bindEvents();
playerView.bindEvents();
questionView.bindEvents();

const card = new Card()
card.bindEvents();

game.startGame()



// const board = new Board();
// board.movesPlayer(player1, 7);




// // TODO: Remove this debug line...
// card.showQuestion();
});
