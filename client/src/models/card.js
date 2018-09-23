const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const randomizeArray = require('../helpers/randomize_array.js');

const Card = function() {
  this.baseUrl = 'https://opentdb.com/api.php?amount=25&category=';
  this.currentQuestion = null;

  this.categories = [{
    "name": "movies",
    "categoryId": 11,
    "currentCard": 0,
    "cards": []
  }, {
    "name": "science",
    "categoryId": 17,
    "currentCard": 0,
    "cards": []
  }, {
    "name": "sports",
    "categoryId": 21,
    "currentCard": 0,
    "cards": []
  }, {
    "name": "history",
    "categoryId": 23,
    "currentCard": 0,
    "cards": []
  }, {
    "name": "music",
    "categoryId": 12,
    "currentCard": 0,
    "cards": []
  }, {
    "name": "books",
    "categoryId": 10,
    "currentCard": 0,
    "cards": []
  }];
};

Card.prototype.bindEvents = function() {
  // PubSub.subscribe('Game:ShowQuestionFromCategory', (event) => {
  //   const categoryIndex = event.detail;
    this.showQuestion();
  // });

  PubSub.subscribe('QuestionView:answer-selected', (event) => {
    const selectedIndex = event.detail;
    this.answerSelected(selectedIndex);
  });
};

Card.prototype.loadCategoryQuestions = function (category) {
  const quizUrl = `${this.baseUrl}${category.categoryId}&type=multiple`;
  const questions = category.cards;
  const request = new Request(quizUrl);
  questions.length = 0;
  category.currentCard = 0;

  return request.get()
    .then((cards) => {
      cards.results.forEach((cardQuestion) => {
        const allAnswers = cardQuestion.incorrect_answers;
        allAnswers.push(cardQuestion.correct_answer);

        questions.push({
          question: cardQuestion.question,
          correctAnswer: cardQuestion.correct_answer,
          allAnswers: randomizeArray(allAnswers)
        });
      });
      console.log(category);
    });
};

Card.prototype.showQuestion = function () {
  console.log('showQuestion loaded');
  PubSub.subscribe('BoardView:category', (evt) => {
    const categoryName = evt.detail;
    const category = this.categories[categoryName];
    const question = category.cards[category.currentCard];
    category.currentCard++;

    if (!question) {
      this.loadCategoryQuestions(category)
      .then(() => this.showQuestion(categoryName));
      return;
    }

    this.currentQuestion = question;
    PubSub.publish('Card:question-data', {
      question: question.question,
      answers: question.allAnswers
    });
  });
};

Card.prototype.answerSelected = function (selectedIndex) {
  const correctAnswer = this.currentQuestion.correctAnswer;
  const selectedAnswer = this.currentQuestion.allAnswers[selectedIndex];
  PubSub.publish('Card:is-correct', selectedAnswer === correctAnswer);
};

module.exports = Card;
