const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const QuestionModel = require('./question_model.js');

const Card = function() {
  this.baseUrl = 'https://opentdb.com/api.php?amount=25&category=';

  this.categories = [{
    "name": "Movies",
    "categoryId": 11,
    "currentCard": 0,
    "cards": []
  }, {
    "name": "Science",
    "categoryId": 17,
    "currentCard": 0,
    "cards": []
  }, {
    "name": "Sports",
    "categoryId": 21,
    "currentCard": 0,
    "cards": []
  }, {
    "name": "History",
    "categoryId": 23,
    "currentCard": 0,
    "cards": []
  }, {
    "name": "Music",
    "categoryId": 12,
    "currentCard": 0,
    "cards": []
  }, {
    "name": "Books",
    "categoryId": 10,
    "currentCard": 0,
    "cards": []
  }];

};

Card.prototype.getData = function() {
  this.categories.forEach( (category) => {
    const quizUrl = `${this.baseUrl}${category.categoryId}&type=multiple`;
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
