var startButton = document.getElementById('start-btn');
var questionContainerEl = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonElement = document.getElementById('answer-btn')
var nextButton = document.getElementById('next-btn');


startButton.addEventListener('click', startQuiz)


function startQuiz() {
    console.log('quiz started');
    startButton.classList.add('hide');
    questionContainerEl.classList.remove('hide');
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(showQuestion);

}


function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text;
        buttoner.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct
        };
        button.addEventListener('click', selectAnswer);
        answerButtonElement.appendChild(button);
    })
}

function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    setStatusClass(docuent.body, correct);
    Array.from(answerButtonElement.childre).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
}


var questions = [
    { text: '4', correct: true },
    { text: '22', correct: false }
]