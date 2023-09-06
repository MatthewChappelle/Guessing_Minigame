var startBtn = document.getElementById('start-btn')
var nextBtn = document.getElementById('next-btn')
var questionContainerEl = document.getElementById('question-container')
var questionEl = document.getElementById('question')
var answerButtonsEl = document.getElementById('answers')
var ansBtn = document.getElementById('btn')
tempBtn = document.getElementsByClassName('tempBtn')
let shuffledQuestions, currentQuestionIndex

startBtn.addEventListener('click', startQuiz)
nextBtn.addEventListener('click', () => {
  currentQuestionIndex++
  nextQuestion() 
})
// SubmitBtn.addEventListener()

function startQuiz() {
  startBtn.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerEl.classList.remove('hide')
  nextQuestion()
}

function nextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

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
    startBtn.innerText = 'Restart Quiz!'
    startBtn.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

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