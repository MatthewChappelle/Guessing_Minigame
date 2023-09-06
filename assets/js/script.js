var startBtn = document.getElementById('start-btn')
var submitBtn = document.getElementById('submit-btn')
var nextBtn = document.getElementById('next-btn')
var questionContainerEl = document.getElementById('question-container')
var questionEl = document.getElementById('question')
var answerButtonsEl = document.getElementById('answers')
var ansBtn = document.getElementById('btn')
var tempBtn = document.getElementsByClassName('tempBtn')
var usernameForm = document.getElementById('username-form')
var usernameInput = document.getElementById('username-input')
var scoreSave = document.getElementById('score-save')
var results = document.getElementById('results')
let shuffledQuestions, currentQuestionIndex
let currentScore = 0


startBtn.addEventListener('click', startQuiz);
submitBtn.addEventListener('click', openForm);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion() 
})


function startQuiz() {
    usernameForm.classList.add('hide');
    startBtn.classList.add('hide');
    submitBtn.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    //randomizes questions
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide')
    nextQuestion()
}

function nextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}


//reuses buttons, but changes text and correct answers
function showQuestion(question) {
  questionEl.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('tempBtn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
          }
    button.addEventListener('click', selectAnswer)
    answerButtonsEl.appendChild(button)
  })
}
//resets right and wrong colors
function resetState() {
  clearStatusClass(document.body)
  nextBtn.classList.add('hide')
  while (answerButtonsEl.firstChild) {
    answerButtonsEl.removeChild(answerButtonsEl.firstChild)
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target
  const correct = selectedBtn.dataset.correct
  
//   if correct
//   currentScore++
//       results.textContent = currentScore;
  
  setStatusClass(document.body, correct)
  Array.from(answerButtonsEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  document.querySelectorAll('.tempBtn').forEach(btn => {
    btn.disabled = true;
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextBtn.classList.remove('hide')
  } else {
    //only happens after all questions have been cycled through
    startBtn.classList.remove('hide')
    submitBtn.classList.remove('hide');
    startBtn.innerText = 'Restart Quiz!'
  }
}

function openForm() {
 usernameForm.classList.remove('hide');
}

//saves final score to local storage
scoreSave.addEventListener("click", function(event) {
    event.preventDefault();
  // create user object from user input submission

  var userName = usernameInput.value
  var score = "1"
  var user = [userName, score]
  // set new values to local storage 
  localStorage.setItem("Scoreboard", JSON.stringify(user));
usernameForm.classList.add('hide');
submitBtn.classList.add('hide');
});


//changes right/wrong colors
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

//resets right and wrong colors
function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}



// list of questions
const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Mobile Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Text Multiplex Language", correct: false },
      { text: "Hyper Text Marginal Language", correct: false }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Common Style Sheet", correct: false },
      { text: "Colored Style Sheet", correct: false },
      { text: "Computer Style Sheet", correct: false },
      { text: "Cascading Style Sheet", correct: true }
    ]
  },
  {
    question: "What does PHP stand for?",
    answers: [
      { text: "Hypertext Preprocessor", correct: true },
      { text: "Hypertext Program", correct: false },
      { text: "Hypertext Preprogram", correct: false },
      { text: "Hypertext Propogation", correct: false }
    ]
  },
  {
    question: "What does SQL stand for?",
    answers: [
      { text: "Stylish Question Language", correct: false },
      { text: "Stylesheet Query Language", correct: false },
      { text: "Statement Question Language", correct: false },
      { text: "Structured Query Language", correct: true }
    ]
  }
]

// submitScoreButton.addEventListener("click", function(event) {
//   event.preventDefault();
//   // create user object from user input submission
//   var user = {
//     userName: usernameInput.value.trim()
//   };
//   // set new values to local storage 
//   localStorage.setItem("user", JSON.stringify(user));
// });