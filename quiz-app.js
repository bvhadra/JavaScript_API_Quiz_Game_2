const quizContainer = document.getElementById('quiz-container');
const questionNumberElement = document.getElementById('question-number');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const scoreElement = document.getElementById('score');
const endGameButton = document.getElementById('end-game');
const timerElement = document.getElementById('timer-value');
const timerBar = document.getElementById('timer-progress');
const progressBar = document.getElementById('progress-value');
const categorySelect = document.getElementById('category');
const difficultySelect = document.getElementById('difficulty');
const questionContainer = document.getElementById('question-container');
const controls = document.getElementById('controls');
const answerFeedback = document.getElementById('answer-feedback');
const nextQuestionButton = document.getElementById('next-question');
const gameOverContainer = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const playAgainButton = document.getElementById('play-again');
const quitButton = document.getElementById('quit');

let currentQuestion = {};
let score = 0;
let isGameOver = false;
let previousQuestions = [];
let timer;
let timerValue = 60; // Timer duration in seconds
let questionCount = 0;
let totalQuestions = 10; // Total number of questions per round
let questions = []; // Array to store fetched questions

// Fetch categories from the Open Trivia Database API
async function fetchCategories() {
  const response = await fetch('https://opentdb.com/api_category.php');
  const data = await response.json();
  return data.trivia_categories;
}

// Populate the category select options
async function populateCategoryOptions() {
  const categories = await fetchCategories();
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
}

// Fetch questions from the Open Trivia Database API
async function fetchQuestions() {
  const categoryId = categorySelect.value;
  const difficulty = difficultySelect.value;
  const response = await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&type=multiple${categoryId ? `&category=${categoryId}` : ''}${difficulty ? `&difficulty=${difficulty}` : ''}`);
  const data = await response.json();
  return data.results;
}

// Display the question and answers
function displayQuestion(question) {
  currentQuestion = question;
  questionNumberElement.textContent = `Question ${questionCount + 1}`;
  questionElement.textContent = decodeHtml(question.question);
  answersElement.innerHTML = '';

  const answers = [...question.incorrect_answers];
  answers.push(question.correct_answer);
  answers.sort(() => Math.random() - 0.5);

  answers.forEach(answer => {
    const answerElement = document.createElement('div');
    answerElement.textContent = decodeHtml(answer);
    answerElement.classList.add('answer');
    answerElement.addEventListener('click', selectAnswer);
    answersElement.appendChild(answerElement);
  });

  nextQuestionButton.style.display = 'none';
  answerFeedback.style.display = 'none'; // Clear the feedback message
}

// Decode HTML entities
function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

// Handle answer selection
function selectAnswer(event) {
  if (isGameOver) return;

  const selectedAnswer = event.target.textContent;
  const isCorrect = selectedAnswer === decodeHtml(currentQuestion.correct_answer);

  if (isCorrect) {
    score++;
    event.target.classList.add('correct');
    answerFeedback.textContent = 'Correct Answer!';
    answerFeedback.classList.remove('incorrect');
    answerFeedback.classList.add('correct');
  } else {
    event.target.classList.add('incorrect');
    answerFeedback.textContent = `Wrong Answer! The correct answer is: ${decodeHtml(currentQuestion.correct_answer)}`;
    answerFeedback.classList.remove('correct');
    answerFeedback.classList.add('incorrect');
  }

  scoreElement.textContent = `Score: ${score}`;
  previousQuestions.push(currentQuestion);
  questionCount++;
  updateProgressBar();
  clearTimer();
  answerFeedback.style.display = 'block';
  nextQuestionButton.style.display = 'block';
}

// Fetch and display a new question
async function fetchAndDisplayQuestion() {
  if (questionCount === totalQuestions) {
    endGame();
    return;
  }

  let question;
  do {
    if (questions.length === 0) {
      questions = await fetchQuestions();
    }
    question = questions[questionCount];
  } while (previousQuestions.some(q => q.question === question.question));

  displayQuestion(question);
  startTimer();
}

// Start the timer
function startTimer() {
  timerValue = 60;
  timerElement.textContent = timerValue;
  timerBar.style.width = '100%';
  timer = setInterval(() => {
    timerValue--;
    timerElement.textContent = timerValue;
    timerBar.style.width = `${(timerValue / 60) * 100}%`;
    if (timerValue === 0) {
      clearTimer();
      selectAnswer({ target: { textContent: '' } }); // Treat as an incorrect answer
    }
  }, 1000);
}

// Clear the timer
function clearTimer() {
  clearInterval(timer);
}

// Update the progress bar
function updateProgressBar() {
  const progressValue = (questionCount / totalQuestions) * 100;
  progressBar.style.width = `${progressValue}%`;
}

// End the game
function endGame() {
  isGameOver = true;
  questionContainer.style.display = 'none';
  controls.style.display = 'none';
  gameOverContainer.style.display = 'block';
  finalScoreElement.textContent = `Your final score is: ${score}`;
  categorySelect.disabled = false;
  difficultySelect.disabled = false;
}

// Start the game
populateCategoryOptions();

// Event listeners
categorySelect.addEventListener('change', () => {
  if (categorySelect.value && difficultySelect.value) {
    categorySelect.disabled = true;
    difficultySelect.disabled = true;
    questionContainer.style.display = 'block';
    controls.style.display = 'flex';
    gameOverContainer.style.display = 'none';
    fetchAndDisplayQuestion();
  } else {
    questionContainer.style.display = 'none';
    controls.style.display = 'none';
    gameOverContainer.style.display = 'none';
  }
});

difficultySelect.addEventListener('change', () => {
  if (categorySelect.value && difficultySelect.value) {
    categorySelect.disabled = true;
    difficultySelect.disabled = true;
    questionContainer.style.display = 'block';
    controls.style.display = 'flex';
    gameOverContainer.style.display = 'none';
    fetchAndDisplayQuestion();
  } else {
    questionContainer.style.display = 'none';
    controls.style.display = 'none';
    gameOverContainer.style.display = 'none';
  }
});

// End game functionality
endGameButton.addEventListener('click', endGame);

// Next question functionality
nextQuestionButton.addEventListener('click', () => {
  answerFeedback.style.display = 'none'; // Clear the feedback message
  fetchAndDisplayQuestion();
});

// Play again functionality
playAgainButton.addEventListener('click', () => {
  location.reload();
});

// Quit functionality
quitButton.addEventListener('click', () => {
  window.close();
});
