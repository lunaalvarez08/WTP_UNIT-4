alert("Quizzes Script Loaded");

// ===== Team Data =====
const teamMembers = [
  { name: "Luna", quizzes: [
      { question: "What is cellular respiration?", options: ["Energy creation", "Photosynthesis", "Protein synthesis", "None"], answer: "Energy creation" },
      { question: "Where does glycolysis occur?", options: ["Mitochondria", "Cytoplasm", "Nucleus", "ER"], answer: "Cytoplasm" }
    ] },
  { name: "Sarah", quizzes: [
      { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" }
    ] },
  { name: "Bekim", quizzes: [
      { question: "What is H2O?", options: ["Oxygen", "Water", "Hydrogen", "Salt"], answer: "Water" }
    ] },
  { name: "Evan", quizzes: [] }
];

// ===== References =====
const teamSelect = document.getElementById("team-member");
const quizSelect = document.getElementById("quiz-select");
const shuffleCheck = document.getElementById("shuffle");
const startBtn = document.getElementById("start-quiz");
const quizContainer = document.getElementById("quiz-container");
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionsDiv = document.getElementById("options");
const nextBtn = document.getElementById("next-question");
const feedback = document.getElementById("feedback");

let currentQuiz = [];
let currentQuestionIndex = 0;

// ===== Populate Team Dropdown =====
teamMembers.forEach(member => {
  const option = document.createElement("option");
  option.value = member.name.toLowerCase();
  option.textContent = member.name;
  teamSelect.appendChild(option);
});

// ===== Populate Quiz Dropdown =====
function updateQuizSelect() {
  quizSelect.innerHTML = '<option value="all">All Quizzes</option>';
  const selectedMember = teamSelect.value;
  teamMembers.forEach(member => {
    if(selectedMember === "all" || selectedMember === member.name.toLowerCase()) {
      member.quizzes.forEach((q, i) => {
        const opt = document.createElement("option");
        opt.value = `${member.name}-${i}`;
        opt.textContent = `${member.name} Quiz ${i+1}`;
        quizSelect.appendChild(opt);
      });
    }
  });
}
updateQuizSelect();
teamSelect.addEventListener("change", updateQuizSelect);

// ===== Start Quiz =====
startBtn.addEventListener("click", () => {
  const selectedMember = teamSelect.value;
  const selectedQuiz = quizSelect.value;

  currentQuiz = [];

  teamMembers.forEach(member => {
    if(selectedMember !== "all" && selectedMember !== member.name.toLowerCase()) return;

    member.quizzes.forEach((q, i) => {
      if(selectedQuiz === "all" || selectedQuiz === `${member.name}-${i}`) {
        currentQuiz.push({...q, member: member.name});
      }
    });
  });

  if(shuffleCheck.checked) {
    currentQuiz.sort(() => Math.random() - 0.5);
  }

  if(currentQuiz.length === 0) {
    alert("No questions available for selected filters.");
    return;
  }

  currentQuestionIndex = 0;
  quizContainer.style.display = "block";
  showQuestion();
});

// ===== Show Question =====
function showQuestion() {
  feedback.textContent = "";
  const q = currentQuiz[currentQuestionIndex];
  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuiz.length}`;
  questionText.textContent = q.question;

  optionsDiv.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.addEventListener("click", () => {
      if(opt === q.answer) {
        feedback.textContent = "✅ Correct!";
        feedback.style.color = "green";
      } else {
        feedback.textContent = `❌ Incorrect. Correct answer: ${q.answer}`;
        feedback.style.color = "red";
      }
    });
    optionsDiv.appendChild(btn);
  });
}

// ===== Next Question =====
nextBtn.addEventListener("click", () => {
  if(currentQuestionIndex < currentQuiz.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    alert("Quiz finished!");
    quizContainer.style.display = "none";
  }
});
