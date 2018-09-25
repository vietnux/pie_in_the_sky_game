const Game = require('./models/game.js');
const Board = require('./models/board.js');
const Player = require('./models/player.js');
const Card = require('./models/card.js');
const BoardView = require('./views/board_view.js');
const PlayerView = require('./views/player_view.js');
const QuestionView = require('./views/card_question_view.js');
const GameScoreView = require('./views/game_score_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const startGameForm = document.querySelector("#start-screen-form");
  const startScreenDiv = document.querySelector('#start-screen');

  startGameForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const player1 = new Player(event.target.player1.value, 'player1');
    const player2 = new Player(event.target.player2.value, 'player2');

    const newGame = new Game(player1, player2);

    startScreenDiv.style.display = "none";

    const board = new Board();

    const game = new Game(player1, player2, board);
    game.startGame()
    console.log('game is started', game);

    const playerView = new PlayerView(game);
    playerView.bindEvents();

    const gameScoreView = new GameScoreView(game);
    gameScoreView.bindEvents();

    const boardView = new BoardView(game);
    boardView.bindEvents();

    const questionView = new QuestionView();
    questionView.bindEvents();

    const card = new Card(event.target[0].value)
    card.bindEvents();
  });

});
