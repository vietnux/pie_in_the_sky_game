const Timer = function (time) {
  this.timeLeft = time;
  // this.section = section;
};


Timer.prototype.countdown = function () {
  //change time into minutes and seconds
  let mins = this.timeLeft / 60;
  let seconds = this.timeLeft % 60;
  while (this.timeLeft > 0) {
  this.timeLeft --
  console.log(this.timeLeft);
  mins = Math.floor(this.timeLeft / 60);
  seconds = this.timeLeft % 60;
  console.log(mins);
  console.log(seconds);
}

  //create function which paused for one seconds and removes one from seconds
  //pass it to the dom
};
module.exports = Timer;
