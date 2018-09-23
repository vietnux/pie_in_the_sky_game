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
    this.loadCategoryQuestions()
    this.showQuestion();


  PubSub.subscribe('QuestionView:answer-selected', (event) => {
    const selectedIndex = event.detail;
    this.answerSelected(selectedIndex);
  });
};

Card.prototype.loadCategoryQuestions = function () {
  this.categories.forEach( function (category) {
    const card = new Card();
    const quizUrl = `${card.baseUrl}${category.categoryId}&type=multiple`
    const request = new Request(quizUrl)
    request.get()
    .then((cards) => {
       category.cards = cards.results;
    })
  })
};

Card.prototype.loadCurrentQuestions = function (category) {


  // this.categories.forEach(
  // //
  //   questions.length = 0;
  //   category.currentCard = 0;
  //
  // )

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
    this.categories.map (function (category) {
      if  (category.name.match(categoryName)) {
        const thisCategory = category
        console.log(thisCategory);
      }
    })
    // const category = this.categories[categoryName];
    // console.log(category);
    // const question = category.cards[category.currentCard];
    // category.currentCard++;

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
