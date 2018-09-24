const Board = require('./models/board.js');
const Game = require('./models/game.js');
const Player = require('./models/player.js');
const Card = require('./models/card.js');
const BoardView = require('./views/board_view.js');
const PlayerView = require('./views/player_view.js');
const QuestionView = require('./views/card_question_view.js');
const GameScoreView = require('./views/game_score_view.js');

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
const gameScoreView = new GameScoreView(game);
boardView.bindEvents();

gameScoreView.bindEvents();

playerView.bindEvents();

questionView.bindEvents();

const card = new Card()
card.bindEvents();

game.startGame()


});
