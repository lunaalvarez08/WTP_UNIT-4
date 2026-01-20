// ===== Team Data =====
const teamMembers = [
  {
    name: "Luna",
    emoji: "🦭",
    evidence: ["Evidence 1", "Evidence 2", "Evidence 3"],
    flashcards: ["Flashcard A", "Flashcard B"],
    quizzes: ["Quiz 1", "Quiz 2"]
  },
  {
    name: "Sarah",
    emoji: "🦋",
    evidence: ["Evidence 4", "Evidence 5"],
    flashcards: ["Flashcard C"],
    quizzes: ["Quiz 1"]
  },
  {
    name: "Bekim",
    emoji: "⭐",
    evidence: ["Evidence 6"],
    flashcards: ["Flashcard D", "Flashcard E"],
    quizzes: ["Quiz 2", "Quiz 3"]
  },
  {
    name: "Evan",
    emoji: "🏈",
    evidence: ["Evidence 7", "Evidence 8", "Evidence 9", "Evidence 10"],
    flashcards: [],
    quizzes: ["Quiz 3"]
  }
];

// ===== Create Member Cards =====
const grid = document.getElementById("team-grid");

teamMembers.forEach(member => {
  const card = document.createElement("div");
  card.className = "team-card";

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <div class="member-header">
          <div class="member-emoji">${member.emoji}</div>
          <div class="member-name">${member.name}</div>
        </div>

        <div class="member-stats">
          Evidence: ${member.evidence.length} | 
          Flashcards: ${member.flashcards.length} | 
          Quizzes: ${member.quizzes.length}
        </div>

        <div class="member-buttons">
          <button class="btn-navy btn-evidence">Evidence</button>
          <button class="btn-navy btn-flashcards">Flashcards</button>
          <button class="btn-navy btn-quizzes">Quizzes</button>
        </div>
      </div>

      <div class="card-back">
        <div class="member-content"></div>
        <button class="btn-navy btn-back">← Back</button>
      </div>
    </div>
  `;

  grid.appendChild(card);

  const inner = card.querySelector(".card-inner");
  const contentDiv = card.querySelector(".member-content");

  // ===== Button Handlers =====
  card.querySelector(".btn-evidence").addEventListener("click", () => {
    contentDiv.innerHTML = member.evidence.length
      ? `<ul>${member.evidence.map(e => `<li>${e}</li>`).join("")}</ul>`
      : "<p>No evidence yet.</p>";
    inner.classList.add("flipped");
  });

  card.querySelector(".btn-flashcards").addEventListener("click", () => {
    contentDiv.innerHTML = member.flashcards.length
      ? `<ul>${member.flashcards.map(f => `<li>${f}</li>`).join("")}</ul>`
      : "<p>No flashcards yet.</p>";
    inner.classList.add("flipped");
  });

  card.querySelector(".btn-quizzes").addEventListener("click", () => {
    contentDiv.innerHTML = member.quizzes.length
      ? `<ul>${member.quizzes.map(q => `<li>${q}</li>`).join("")}</ul>`
      : "<p>No quizzes yet.</p>";
    inner.classList.add("flipped");
  });

  // ===== Back Button =====
  card.querySelector(".btn-back").addEventListener("click", () => {
    inner.classList.remove("flipped");
  });
});
