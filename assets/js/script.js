var startBtn = document.getElementById('start-btn');
var submitBtn = document.getElementById('submit-btn');
var nextBtn = document.getElementById('next-btn');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answers');
var ansBtn = document.getElementById('btn');
var tempBtn = document.getElementsByClassName('tempBtn');
var usernameForm = document.getElementById('username-form');
var usernameInput = document.getElementById('username-input');
var scoreSave = document.getElementById('score-save');
var results = document.getElementById('results');
var timer = document.getElementById('timer');
let shuffledQuestions, currentQuestionIndex;
var currentScore = 0;
var timeRemaining = 60;
let originalTime = timeRemaining;
var time;

// starts timer
function startTimer() {
  timeRemaining;
  time = setInterval(() => {
    timeRemaining--;
    timer.innerHTML = timeRemaining + " seconds left";
    if (timeRemaining == 0) {
      clearInterval(time);
      alert("Time's Up!")
      gameOver();
    }
  }, 1000)
}

// shows finals score
function pauseTimer() {
  clearInterval(time)
  timer.innerHTML = currentScore + " /4";
}

// resets for next quiz
function resetTimer() {
  clearInterval(time);
  timeRemaining = originalTime;
  startTimer();
}

// starts quiz
startBtn.addEventListener('click', startQuiz);

// opens form for user entry
submitBtn.addEventListener('click', openForm);

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  nextQuestion();
  console.log(currentScore);
});


function startQuiz() {
  currentScore = 0
  usernameForm.classList.add('hide');
  startBtn.classList.add('hide');
  submitBtn.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  //randomizes questions
  currentQuestionIndex = 0;
  questionContainerEl.classList.remove('hide');
  resetTimer();
  nextQuestion();
};

// shuffles and displays next fresh question
function nextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
};


//reuses buttons, but changes text and correct answers
function showQuestion(question) {
  questionEl.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('tempBtn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    };
    button.addEventListener('click', selectAnswer);
    answerButtonsEl.appendChild(button);
  });
}
//resets right and wrong colors
function resetState() {
  clearStatusClass(document.body);
  nextBtn.classList.add('hide');
  while (answerButtonsEl.firstChild) {
    answerButtonsEl.removeChild(answerButtonsEl.firstChild);
  };
};

// stops quiz
function gameOver() {
  startBtn.classList.remove('hide');
  submitBtn.classList.remove('hide');
  startBtn.innerText = 'Restart Quiz!';
  pauseTimer();
}

// when answer is chosen display correct or incorrect and end if last question
function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct;

  setStatusClass(document.body, correct);

  Array.from(answerButtonsEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });

  document.querySelectorAll('.tempBtn').forEach(btn => {
    btn.disabled = true;
  });;

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextBtn.classList.remove('hide');
  } else {
    //only happens after all questions have been cycled through
    gameOver();
  };

  //increment current scoreboard
  if (selectedBtn.classList.contains('correct')) {
    currentScore++;
  };

  if (selectedBtn.classList.contains('wrong')) {
    timeRemaining = timeRemaining - 10;
  }
}


function openForm() {
  usernameForm.classList.remove('hide');
};

//saves final score to local storage
scoreSave.addEventListener("click", function (event) {
  event.preventDefault();
  // create user object from user input submission
  let userName = usernameInput.value;
  let score = currentScore + "/4";
  let timeLeft = timeRemaining + "/60 sec";


  //make new key for each submission and sort by highest score
  let key = Date.now();

  let highscore = { userName, score, timeLeft };
  // set new values to local storage 
  localStorage.setItem(key, JSON.stringify(highscore));
  usernameForm.classList.add('hide');
  submitBtn.classList.add('hide');
  console.log(highscore)
});


//changes right/wrong colors
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  };
};

//resets right and wrong colors
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
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
  },
  {
    question: "What does MERN stand for?",
    answers: [
      { text: "MongoDB Express React Node", correct: true },
      { text: "Multiple Entery Reactive Nesting", correct: false },
      { text: "Mongoose Enlighten REST Node", correct: false },
      { text: "Moving Every Reception Now", correct: false }
    ]
  },
  {
    question: "What is React?",
    answers: [
      { text: "A method of coding (build first fix later)", correct: false },
      { text: "Learning by studying only what you don't know", correct: false },
      { text: "A language that learns with AI", correct: false },
      { text: "A JavaScript Library specifically for UI", correct: true }
    ]
  }
];