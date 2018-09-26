const Game = require('./models/game.js');
const Board = require('./models/board.js');
const Player = require('./models/player.js');
const Card = require('./models/card.js');
const HighScore = require('./models/highscore.js');
const BoardView = require('./views/board_view.js');
const PlayerView = require('./views/player_view.js');
const QuestionView = require('./views/card_question_view.js');
const GameScoreView = require('./views/game_score_view.js');
const ResultsView = require('./views/results_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const startGameForm = document.querySelector("#start-screen-form");
  const startScreenDiv = document.querySelector('#start-screen');

  document.querySelector('#instructions-drop-btn').addEventListener('click', ()=> {
    document.querySelector('#instructions-dropdown').classList.toggle('hidden');
  });

  startGameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (event.target.player4.value && !event.target.player3.value) {
      document.querySelector('#form-error').textContent = "Please enter a name for Player 3.";
    } else {
    const player1 = new Player(event.target.player1.value, 'player1');
    const player2 = new Player(event.target.player2.value, 'player2');
    let player3 = null;
    let player4 = null;
    if (event.target.player3.value) {
      player3 = new Player(event.target.player3.value, 'player3');
    };
    if (event.target.player4.value) {
      player4 = new Player(event.target.player4.value, 'player4');
    };

    startScreenDiv.style.display = "none";

    const board = new Board();
    board.bindEvents();

    const game = new Game(player1, player2, player3, player4, board);
    game.startGame();

    const playerView = new PlayerView(game);
    playerView.bindEvents();

    const gameScoreView = new GameScoreView(game);
    gameScoreView.bindEvents();

    const boardView = new BoardView(game);
    boardView.bindEvents();

    const questionView = new QuestionView();
    questionView.bindEvents();

    const resultsView = new ResultsView();
    resultsView.bindEvent();

    const card = new Card(event.target[0].value)
    card.bindEvents();

    const highScoreUrl = 'http://localhost:3000/api/games'
    const highScore = new HighScore(highScoreUrl);
    highScore.getNames();

  };
  });

});
