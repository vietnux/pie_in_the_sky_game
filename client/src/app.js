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
// Page load - splash screen and form assigned to constants
  const startGameForm = document.querySelector("#start-screen-form");
  const startScreenDiv = document.querySelector('#start-screen');

// Click event listener on 'How to play' dropdown - toggles if clicked on again
  document.querySelector('#instructions-drop-btn').addEventListener('click', ()=> {
    document.querySelector('#instructions-dropdown').classList.toggle('hidden');
  });

// Event listener on form submit, prevents form submission/page refresh on event
  startGameForm.addEventListener('submit', (event) => {
    event.preventDefault();

// HTML 5 required attribute on Player 1 and Player 2 form inputs, no JS validation required on them
// Form validation - check if Player 4 has been entered and Player 3 has not
    if (event.target.player4.value && !event.target.player3.value) {
      document.querySelector('#form-error').textContent = "Please enter a name for Player 3.";
    } else {

// Player 1 and 2 always required - instantiated with name from form, an ID (p1/p2),
//  and then assigned colour for pie and board piece
    const player1 = new Player(event.target.player1.value, 'p1');
    player1.colour = "darkblue";
    const player2 = new Player(event.target.player2.value, 'p2');
    player2.colour = "black";

// Player 3 and 4 declared here, as would not be accessible if declared in if block
    let player3 = null;
    let player4 = null;

// Checks for form input submission on Players 3 and 4, and assigned/'coloured' as above if they do
    if (event.target.player3.value) {
      player3 = new Player(event.target.player3.value, 'p3');
      player3.colour = "darkgreen";
    };
    if (event.target.player4.value) {
      player4 = new Player(event.target.player4.value, 'p4');
      player4.colour = "darkred";
    };

// Class assigned to apply CSS effects
    startScreenDiv.classList.add('end');

// Board instantiated and bound to 'Game:player-choose-move' channel
    const board = new Board();
    board.bindEvents();

// Game instantiated - players 3 and 4 may be null
// Constructor assigns players 1-4 and board, then checks number of players and creates
// 'players' object, with each player id assigned as the key to the next player
// If 2 players, player2.id is the key to player1, or if 3 players, player3.id is the key to player1...
// currentPlayer, currentCategory and timer also declared in constructor
    const game = new Game(player1, player2, player3, player4, board);

// Game started, which sets the required number of board pieces according to number of players
// currentPlayer set to player 1, and timer started. playTurn called
    game.startGame();

// Player view instantiated and passed the game object, which makes currentPlayer accessible to it
// Bound to 'Game:current-player-change' channel to listen for change of player, and
// 'Timer:currentTime' channel to display timer info
    const playerView = new PlayerView(game);
    playerView.bindEvents();

// Game score view instantiated and passed the game object, which makes all player objects accessible
// and generates 'pie' score graphic alongside their names
// Bound to 'Game:score-change' and 'Game:current-player-change' channels to receive updates
    const gameScoreView = new GameScoreView(game);
    gameScoreView.bindEvents();

// Board view instantiated and passed the game object, which makes all player objects accessible
// Assigns colours to board pieces from colour property on player objects
// Adds click listener on die roll button, and binds to 'Player:rollnumber' channel to receive die roll number
    const boardView = new BoardView(game);
    boardView.bindEvents();

// Question view instantiated and bound to 'Card:question-data' channel to receive quiz questions form API
// Question and multiple choice answers loaded into view, with event listeners added to each answer
    const questionView = new QuestionView();
    questionView.bindEvents();

// Result view instantiated and bound to 'Game:end-game' channel to display 'end game' screen when the game
// is won, and 'HighScore:allscores' to display high scores retrieved from DB query
    const resultsView = new ResultsView();
    resultsView.bindEvent();

// Card instantiated with difficulty level retrieved from form input
// API call made to retrieve question sets for each category
// Bound to 'BoardView:category' channel which displays a question when a player lands on a square
    const card = new Card(event.target[0].value)
    card.bindEvents();

// Highscores set up and bound to 'Game:end-game' channel, to publish high scores to the Result view
    const highScoreUrl = 'http://localhost:3000/api/games'
    const highScore = new HighScore(highScoreUrl);
    highScore.bindEvents();



  };
  });

});
