const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const randomizeArray = require('../helpers/randomize_array.js');

const Card = function() {
  this.baseUrl = 'https://opentdb.com/api.php?amount=25&category=';
  this.currentQuestion = 0;

  this.categories = [{
    "name": "movies",
    "categoryId": 11,
    "currentCard": 0,
    "cards": null,
  }, {
    "name": "science",
    "categoryId": 17,
    "currentCard": 0,
    "cards": null,
  }, {
    "name": "sports",
    "categoryId": 21,
    "currentCard": 0,
    "cards": null,
  }, {
    "name": "history",
    "categoryId": 23,
    "currentCard": 0,
    "cards": null,
  }, {
    "name": "music",
    "categoryId": 12,
    "currentCard": 0,
    "cards": null,
  }, {
    "name": "books",
    "categoryId": 10,
    "currentCard": 0,
    "cards": null,
  }];
};

Card.prototype.bindEvents = function() {
  this.showQuestion();
  PubSub.subscribe('QuestionView:answer-selected', (event) => {
    const selectedIndex = event.detail;
    this.answerSelected(selectedIndex);
  });
};

Card.prototype.loadCategoryQuestions = function (category) {
  const quizUrl = `${this.baseUrl}${category[0]['categoryId']}&type=multiple`;
  const request = new Request(quizUrl);

  request.get()
  .then((cards) => {
    category[0]['cards'] = cards.results.splice(0, 25)
    this.sortQuestion(category[0])
  });
};


Card.prototype.showQuestion = function () {
  PubSub.subscribe('BoardView:category', (evt) => {
    console.log(evt.detail);
    let categoryName = evt.detail;
    let currentCategory = this.categories.filter(category => category.name.match(categoryName));
    const question = currentCategory[0]['cards'];

    if (!question) {
      this.loadCategoryQuestions(currentCategory)
    }
    else {
      this.sortQuestion(currentCategory[0])
    };
  });
};

Card.prototype.sortQuestion = function (category) {
  const cardQuestion = category['cards'].pop()
  const allAnswers = cardQuestion.incorrect_answers;
  allAnswers.push(cardQuestion.correct_answer);
  this.currentQuestion = { question: cardQuestion.question,
    correctAnswer: cardQuestion.correct_answer,
    allAnswers: randomizeArray(allAnswers)
  };
  PubSub.publish('Card:question-data', this.currentQuestion);
};

Card.prototype.answerSelected = function (selectedIndex) {
  console.log(this.currentQuestion.allAnswers);
  const correctAnswer = this.currentQuestion.correctAnswer;
  const selectedAnswer = this.currentQuestion.allAnswers[selectedIndex];
  PubSub.publish('Card:is-correct', selectedAnswer === correctAnswer);
};

module.exports = Card;
