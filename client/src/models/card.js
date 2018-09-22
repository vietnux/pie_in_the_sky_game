const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const QuestionModel = require('./question_model.js');

const Card = function() {
  this.baseUrl = 'https://opentdb.com/api.php?amount=25&category=';

  this.categories = [{
    "movies": 11,
    "cards": []
  }, {
    "science": 17,
    "cards": []
  }, {
    "sport": 21,
    "cards": []
  }, {
    "history": 23,
    "cards": []
  }, {
    "music": 12,
    "cards": []
  }, {
    "books": 10,
    "cards": []
  }];

};

Card.prototype.getData = function() {
  this.categories.forEach( (category) => {
    const quizUrl = `${this.baseUrl}${category[Object.keys(category)[0]]}&type=multiple`;
    const questions = category.cards;
    const request = new Request(quizUrl);
    request.get()
    .then((cards) => {
      cards.results.forEach((cardQuestion, index) => {
        const question = new QuestionModel(index, cardQuestion);
        question.bindEvents();
        questions.push(question);
      });
      // PubSub.publish('QuizModel:quiz-loaded', questions.length);
    })
  })
  console.log(this.categories);
}

module.exports = Card;
