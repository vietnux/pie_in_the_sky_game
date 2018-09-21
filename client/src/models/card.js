const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const Card = function () {
  this.film = 11;
  this.science = 17;
  this.sport = 21;
  this.history = 23;
  this.art = 25;
  this.books = 10;

  this.filmQuestions = [];
  this.scienceQuestions = [];
  this.sportQuestions = [];
  this.historyQuestions = [];
  this.artQuestions = [];
  this.booksQuestions = [];
}

Card.prototype.getData = function () {}
  Request.get(`https://opentdb.com/api.php?amount=25&category=${this.film}&type=multiple`)
  .then( (categoryArray) => {
    categoryArray.results.forEach( (categoryQuestion, index) => {
      const question
    })
  })
};



module.exports = Card;
