const PubSub = require('../helpers/pub_sub.js');
const createAndAppend = require('../helpers/create_append.js');

const QuestionView = function() {
  this.element = document.querySelector('#question-card');;
};

QuestionView.prototype.bindEvents = function () {
  PubSub.subscribe('Card:question-data', (event) => {
    const questionData = event.detail;
    this.render(questionData);
  });

  PubSub.subscribe(`Card:is-correct`, (event => {
    const isCorrect = event.detail;
    console.log('are you correct? ' + isCorrect);
    // TODO: What to do with this info? Maybe just the board cares about it?
  }))
};

QuestionView.prototype.render = function (questionData) {
  this.element.innerHTML = '';

  const question = createAndAppend('div', null, null, this.element);
  question.innerHTML = questionData.question;

  const answers = createAndAppend('ul', null, null, this.element);
  questionData.answers.forEach((answer, index) => {
    const item = createAndAppend('li', null, null, answers);
    const radio = createAndAppend('input', null, null, item);
    radio.id = `answer-${index}`
    radio.type = 'radio';
    radio.name = 'answer';
    radio.value = index;

    const label = createAndAppend('label', null, null, item);
    label.htmlFor = radio.id;
    label.innerHTML = answer;

    radio.addEventListener('change', (event) => {
      PubSub.publish('QuestionView:answer-selected', event.target.value);
    });
  });
};

module.exports = QuestionView;
