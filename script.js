const questionBox = document.getElementById("question");
const optionsList = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreBox = document.getElementById("score-box");

let currentIndex = 0;
let score = 0;

// ✅ JavaScript Related Questions
const questions = [
  {
    question: "What does 'DOM' stand for in JavaScript?",
    correct_answer: "Document Object Model",
    incorrect_answers: ["Data Object Management", "Document Orientation Mode", "Desktop Object Method"]
  },
  {
    question: "Which company developed JavaScript?",
    correct_answer: "Netscape",
    incorrect_answers: ["Microsoft", "Sun Microsystems", "Oracle"]
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    correct_answer: "Float",
    incorrect_answers: ["Boolean", "Undefined", "String"]
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    correct_answer: "const",
    incorrect_answers: ["var", "let", "constant"]
  },
  {
    question: "Which method converts a JSON string into a JavaScript object?",
    correct_answer: "JSON.parse()",
    incorrect_answers: ["JSON.stringify()", "JSON.convert()", "JSON.toObject()"]
  },
  {
    question: "What is the output of 'typeof NaN' in JavaScript?",
    correct_answer: "number",
    incorrect_answers: ["NaN", "undefined", "object"]
  },
  {
    question: "How can you create an array in JavaScript?",
    correct_answer: "let arr = [1, 2, 3];",
    incorrect_answers: ["let arr = 1, 2, 3;", "let arr = {1, 2, 3};", "let arr = (1, 2, 3);"]
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    correct_answer: "//",
    incorrect_answers: ["<!--", "#", "/*"]
  },
  {
    question: "What does 'this' keyword refer to in JavaScript (in global context)?",
    correct_answer: "The global object",
    incorrect_answers: ["The current function", "The previous object", "Undefined"]
  },
  {
    question: "Which loop is guaranteed to execute at least once?",
    correct_answer: "do...while",
    incorrect_answers: ["for", "while", "foreach"]
  }
];

// Decode HTML entities (not mandatory here, but kept for flexibility)
function decode(text) {
  const el = document.createElement("textarea");
  el.innerHTML = text;
  return el.value;
}

// Display current question
function displayQuestion() {
  const q = questions[currentIndex];
  questionBox.textContent = decode(q.question);
  const answers = [...q.incorrect_answers, q.correct_answer];
  optionsList.innerHTML = "";
  nextBtn.disabled = true;

  shuffleArray(answers);

  answers.forEach(answer => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = decode(answer);
    btn.onclick = () => checkAnswer(btn, decode(answer) === decode(q.correct_answer));
    li.appendChild(btn);
    optionsList.appendChild(li);
  });
}

// Shuffle options
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Check selected answer
function checkAnswer(button, isCorrect) {
  const allButtons = optionsList.querySelectorAll("button");

  allButtons.forEach(btn => {
    btn.disabled = true;
    if (decode(btn.textContent) === decode(questions[currentIndex].correct_answer)) {
      btn.classList.add("correct");
    }
  });

  if (!isCorrect) {
    button.classList.add("wrong");
  }

  if (isCorrect) score++;
  nextBtn.disabled = false;
}

// Show final score
function showScore() {
  questionBox.classList.add("hidden");
  optionsList.classList.add("hidden");
  nextBtn.classList.add("hidden");
  scoreBox.classList.remove("hidden");
  scoreBox.textContent = `Your Score: ${score} out of ${questions.length}`;
}

// Handle next question
nextBtn.onclick = () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    displayQuestion();
  } else {
    showScore();
  }
};

// Start quiz
displayQuestion();
