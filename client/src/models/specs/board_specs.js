const assert = require('assert');
const Player = require('../player.js');
const Board = require('../board.js');

describe("Player", function () {

beforeEach(function () {
  player = new Player ('Mike');
  board = new Board;
})

  it("can move player", function () {
    board.movesPlayer(player, 5)
    const actual = player.position
    assert.strictEqual(actual, 5)
  })

  it("can move player past 0 ", function () {
    player.position = 21;
    board.movesPlayer(player, 5)
    const actual = player.position
    assert.strictEqual(actual, 1)
  })

});
