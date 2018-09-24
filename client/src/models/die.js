
const Die = function () {
  sides: 6
};

Die.prototype.roll = function () {
  const randomNumber = Math.floor(Math.random() * this.sides) + 1;
  return randomNumber;
};






//Prints dice roll to the page

function printNumber(number) {
  var placeholder = document.getElementById('placeholder');
  placeholder.innerHTML = number;
}

var button = document.getElementById('button');

button.onclick = function() {
  var result = dice.roll();
  printNumber(result);
};
