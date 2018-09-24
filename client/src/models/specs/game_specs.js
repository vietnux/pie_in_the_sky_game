const assert = require('assert');
const Player = require('../player.js');
const Board = require('../board.js');
const Game = require('../game.js');

describe("Game", function () {

beforeEach(function () {
  player1 = new Player ('Mike');
  player2 = new Player ('Michelle');
  game = new Game( player1, player2);
  board = new Board;
})

  // it("can start game and play first turn", function () {
  //   game.startGame()
  //   const actual = (0 < player1.position && player1.position < 7)
  //   assert.strictEqual(actual, true);
  // })

  // it("can switch player turns", function () {
  //   game.startGame();
  //    game.endTurn();
  //    const actual = game.currentPlayer
  //    assert.strictEqual(actual, player2)
  //
  // })


});
