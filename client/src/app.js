const Game = require('./models/game.js');
const Board = require('./models/board.js');
const Player = require('./models/player.js');
const Card = require('./models/card.js');
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
    const player1 = new Player(event.target.player1.value, 'p1', 'player1');
    player1.colour = "darkblue";
    const player2 = new Player(event.target.player2.value, 'p2', 'player2');
    player2.colour = "black";
    let player3 = null;
    let player4 = null;
    if (event.target.player3.value) {
      player3 = new Player(event.target.player3.value, 'p3', 'player3');
      player3.colour = "darkgreen";
    };
    if (event.target.player4.value) {
      player4 = new Player(event.target.player4.value, 'p4', 'player4');
      player4.colour = "darkred";
    };

    // startScreenDiv.style.display = "none";
    startScreenDiv.classList.add('end');

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
  };
  });

});
