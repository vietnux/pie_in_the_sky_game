const assert = require('assert');
const Timer = require('../timer.js');

describe("Timer", function () {

beforeEach(function () {
  timer = new Timer (120);
})

  it("should have seconds", function () {
    const actual = timer.countdown()
    assert.strictEqual(actual, 0);
  });



});
