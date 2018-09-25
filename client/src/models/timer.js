const PubSub = require('../helpers/pub_sub.js');

const Timer = function (time) {
  this.timeLeft = time;
  this.tick = null;
};


Timer.prototype.countdown = function (section) {
  //change time into minutes and seconds if timer is over a minute
  // let mins = this.timeLeft / 60;
  // let seconds = this.timeLeft % 60;

    //bind this.motion to retain this in scope
    this.tick = setInterval(() => {
     this.motion(section);
   }, 1000);


  //if timer is over one minute
  // mins = Math.floor(this.timeLeft / 60);
  // seconds = this.timeLeft % 60;
}

Timer.prototype.motion = function (section) {
  if (this.timeLeft === 0) {
    this.endTimer();
}
else {
  this.timeLeft --;
};
PubSub.publish('Timer:currentTime', this.timeLeft)
};

Timer.prototype.endTimer = function () {
  clearInterval(this.tick)
};

module.exports = Timer;
