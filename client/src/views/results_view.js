const createAndAppend = require('../helpers/create_append');
const PubSub = require('../helpers/pub_sub.js');

const ResultsView = function () {

}

ResultsView.prototype.bindEvent = function () {
  PubSub.subscribe('Game:end-game', (event) => {
    console.log(event.detail);
    const container = document.querySelector('#end-screen');
    const messageContainer = document.querySelector('#end-message');
    container.style.display = 'flex';
    const winner = event.detail.currentPlayer.name;
    createAndAppend('h2', null, null, `${winner} won!`, messageContainer)
  })
};

module.exports = ResultsView;
