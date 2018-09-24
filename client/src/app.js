const Game = require('./models/game.js');
const Board = require('./models/board.js');
const Player = require('./models/player.js');
const Card = require('./models/card.js');
const GameScoreView = require('./views/game_score_view.js');
const BoardView = require('./views/board_view.js');
const PlayerView = require('./views/player_view.js');
const QuestionView = require('./views/card_question_view.js');

document.addEventListener('DOMContentLoaded', () => {

const player1 = new Player("player1");
const player2 = new Player("player2");

const board = new Board();

const game = new Game(player1, player2, board);
game.startGame()
console.log('game is started', game);

const boardView = new BoardView(game);
boardView.bindEvents();

const playerView = new PlayerView(game);
playerView.bindEvents();

const questionView = new QuestionView();
questionView.bindEvents();

const gameScoreView = new GameScoreView(game);
gameScoreView.bindEvents();

const card = new Card()
card.bindEvents();

});
