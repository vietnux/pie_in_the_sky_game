const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const QuestionModel = require('./question_model.js');
const randomizeArray = require('../helpers/randomize_array.js');

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

Card.prototype.bindEvents = function() {
  PubSub.subscribe('<TODO:ShowCardFromCategory>', (event) => {
    const categoryId = event.detail;
    this.showQuestion(categoryId);
  });

  PubSub.subscribe('<TODO:AnswerSelected>', (event) => {
    const selectedAnswer = event.detail;
    this.answerSelected(selectedAnswer);
  });
};

Card.prototype.getData = function() {
  this.categories.forEach((category) => {
    this.loadCategoryQuestions(category);
  });
  console.log(this.categories);
};

Card.prototype.loadCategoryQuestions = function (category) {
  const quizUrl = `${this.baseUrl}${category.categoryId}&type=multiple`;
  const questions = category.cards;
  const request = new Request(quizUrl);
  request.get()
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
    });

  category.currentCard = 0;
};

Card.prototype.showQuestion = function (categoryId) {
  // TODO: Get the selected category
  // TODO: Get the card at the 'currentCard' index of the cards list for that category
  // TODO: If the card is null........ Get a new list of questions for this category?
  // TODO: Assuming if we get here we have a card
  // TODO: Publish the question and answers (not correct answer?)
  PubSub.publish('Card:question-data', {
    question: 'xxx', answers: ['asdf', '234']
  });
};

Card.prototype.answerSelected = function (selectedAnswer) {
  // TODO: Check the current question to see if selected answer is correct
  // TODO: Publish whether question is correct or not
  // TODO: Clear current visible question?? (When should it clear? Timer)
  PubSub.publish('', true);
};

module.exports = Card;
