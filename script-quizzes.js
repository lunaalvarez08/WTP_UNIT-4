// ===== Quiz Data =====
const baseQuestions = [
  {
    question: "What year was the U.S. Constitution ratified?",
    options: ["1776", "1787", "1791", "1800"],
    answer: "1787"
  },
  {
    question: "Which branch can declare war?",
    options: ["Executive", "Legislative", "Judicial", "States"],
    answer: "Legislative"
  },
  {
    question: "Who wrote the Federalist Papers?",
    options: ["Madison, Hamilton, Jay", "Washington", "Jefferson", "Adams"],
    answer: "Madison, Hamilton, Jay"
  }
];

// ===== Load stats from localStorage =====
let quizStats = JSON.parse(localStorage.getItem("quizStats")) || {};

// Initialize stats for each question if missing
baseQuestions.forEach(q => {
  if (!quizStats[q.question]) quizStats[q.question] = { correct: 0, incorrect: 0 };
});

// ===== Variables =====
let questions = []; // will build deck with hard weighting
let index = 0;

const questionEl = document.getElementById("quiz-question");
const optionsEl = document.getElementById("quiz-options");
const progressEl = document.getElementById("progress");
const statsEl = document.getElementById("stats");

// ===== Shuffle function =====
function shuffle(array) {
  for (let i = array.length -1; i>0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ===== Build Deck with Hard Questions Weighted =====
function buildDeck() {
  questions = [];
  baseQuestions.forEach(q => {
    // Always include at least 1 copy
    questions.push(q);

    // Add extra copies based on incorrect count to weight harder questions
    const weight = Math.min(quizStats[q.question].incorrect, 5); // cap at 5 extra copies
    for (let i = 0; i < weight; i++) {
      questions.push(q);
    }
  });

  shuffle(questions);
  index = 0;
}

// ===== Load Question =====
function loadQuestion() {
  const q = questions[index];
  questionEl.textContent = q.question;

  // Shuffle options
  const shuffledOptions = [...q.options];
  shuffle(shuffledOptions);

  optionsEl.innerHTML = "";
  shuffledOptions.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "btn-navy quiz-option";
    btn.addEventListener("click", () => handleAnswer(option));
    optionsEl.appendChild(btn);
  });

  const progressBar = document.getElementById("progress-bar");

function updateProgress() {
  progressEl.textContent = `Question ${index + 1} / ${questions.length}`;
  const percent = ((index + 1) / questions.length) * 100;
  progressBar.style.width = percent + "%";
}

// ===== Handle Answer =====
function handleAnswer(selected) {
  const q = questions[index];
  const isCorrect = selected === q.answer;

  if (isCorrect) {
    quizStats[q.question].correct += 1;
  } else {
    quizStats[q.question].incorrect += 1;
  }

  localStorage.setItem("quizStats", JSON.stringify(quizStats));

  // Visual feedback
  Array.from(optionsEl.children).forEach(btn => {
    if (btn.textContent === q.answer) btn.classList.add("btn-green");
    else if (btn.textContent === selected) btn.classList.add("btn-red");
    btn.disabled = true;
  });

  // Auto move to next question after short delay
  setTimeout(() => {
    index = (index + 1) % questions.length;
    loadQuestion();
  }, 800);
}

// ===== Update Progress / Stats =====
function updateProgress() {
  progressEl.textContent = `Question ${index + 1} / ${questions.length}`;
}

function updateStats() {
  let totalCorrect = 0, totalIncorrect = 0;
  Object.values(quizStats).forEach(s => {
    totalCorrect += s.correct;
    totalIncorrect += s.incorrect;
  });
  statsEl.textContent = `Correct: ${totalCorrect} | Incorrect: ${totalIncorrect}`;
}

// ===== Navigation Buttons =====
document.getElementById("next").addEventListener("click", () => {
  index = (index + 1) % questions.length;
  loadQuestion();
});

document.getElementById("prev").addEventListener("click", () => {
  index = (index - 1 + questions.length) % questions.length;
  loadQuestion();
});

// ===== Shuffle Questions =====
document.getElementById("shuffle-btn").addEventListener("click", () => {
  buildDeck(); // rebuild with current hard weighting
  loadQuestion();
});

// ===== Reset Quiz =====
document.getElementById("reset-btn").addEventListener("click", () => {
  quizStats = {};
  baseQuestions.forEach(q => quizStats[q.question] = { correct: 0, incorrect: 0 });
  localStorage.setItem("quizStats", JSON.stringify(quizStats));
  buildDeck();
  loadQuestion();
});

// ===== Keyboard Controls =====
document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") document.getElementById("next").click();
  if (e.key === "ArrowLeft") document.getElementById("prev").click();
});

// ===== Initialize =====
buildDeck();
loadQuestion();
