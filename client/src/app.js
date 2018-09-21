const Board = require('./models/board.js');
const Game = require('./models/game.js');
const Player = require('./models/player.js');
const Card = require('./models/card.js');

document.addEventListener('DOMContentLoaded', () => {

const cards = new Card('')
cards.getData();
cards.bindEvents();

})
