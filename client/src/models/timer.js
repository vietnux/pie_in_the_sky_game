const PubSub = require('../helpers/pub_sub.js');

const Timer = function (time) {
  this.timeLeft = time;
  this.tick = null;
};

Timer.prototype.countdown = function (section) {
    this.tick = setInterval(() => {
     this.motion(section);
   }, 1000);
}

Timer.prototype.motion = function (section) {
  if (this.timeLeft === 0) {
    this.endTimer();
  } else {
    this.timeLeft --;
  };
  PubSub.publish('Timer:currentTime', this.timeLeft)
};

Timer.prototype.endTimer = function () {
  clearInterval(this.tick)
};



module.exports = Timer;
