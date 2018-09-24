const assert = require('assert');
const Player = require('../player.js');

describe("Player", function () {

beforeEach(function () {
  player = new Player ('Mike');
})

  it("should have a position", function () {
    const actual = player.position;
    assert.strictEqual(actual, 0);
  });

  it("should have a score", function () {
    const actual = player.score;
    assert.strictEqual(actual, 0);
  });


});
