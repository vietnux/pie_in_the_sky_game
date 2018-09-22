const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
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
  PubSub.subscribe('Game:ShowQuestionFromCategory', (event) => {
    const categoryIndex = event.detail;
    this.showQuestion(categoryIndex);
  });

  PubSub.subscribe('QuestionView:answer-selected', (event) => {
    const selectedAnswer = event.detail;
    this.answerSelected(selectedAnswer);
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

Card.prototype.showQuestion = function (categoryIndex) {
  const category = this.categories[categoryIndex];
  const question = category.cards[category.currentCard];
  category.currentCard++;

  if (!question) {
    this.loadCategoryQuestions(category)
      .then(() => this.showQuestion(categoryIndex));
    return;
  }

  PubSub.publish('Card:question-data', {
    question: question.question,
    answers: question.allAnswers
  });
};

Card.prototype.answerSelected = function (selectedAnswer) {
  // TODO: Check the current question to see if selected answer is correct
  // TODO: Publish whether question is correct or not
  PubSub.publish('Card:is-correct', true);
};

module.exports = Card;
