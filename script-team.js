// ===== Team Data =====
const teamMembers = [
  { 
    name: "Luna", 
    emoji: "🦭", 
    practice: ["Q1","Q2","Q3"], 
    evidence: ["Evidence 1","Evidence 2"], 
    flashcards: ["Flash A","Flash B"], 
    quizzes: ["Quiz 1","Quiz 2"] 
  },
  { 
    name: "Sarah", 
    emoji: "🦋", 
    practice: ["Q1","Q2"], 
    evidence: ["Evidence 3"], 
    flashcards: ["Flash C"], 
    quizzes: ["Quiz 1"] 
  },
  { 
    name: "Bekim", 
    emoji: "⭐", 
    practice: ["Q2","Q3"], 
    evidence: ["Evidence 4"], 
    flashcards: ["Flash D"], 
    quizzes: ["Quiz 2","Quiz 3"] 
  },
  { 
    name: "Evan", 
    emoji: "🏈", 
    practice: ["Q1","Q3"], 
    evidence: ["Evidence 5","Evidence 6"], 
    flashcards: [], 
    quizzes: ["Quiz 3"] 
  }
];

// ===== References =====
const grid = document.getElementById("team-grid");

// ===== Create Team Cards =====
teamMembers.forEach(member => {
  const card = document.createElement("div");
  card.className = "team-card";

  card.innerHTML = `
    <div class="member-emoji">${member.emoji}</div>
    <div class="member-name">${member.name}</div>

    <div class="member-content">
      <div class="member-buttons">
        <button class="btn-navy btn-evidence">Evidence</button>
        <button class="btn-navy btn-flashcards">Flashcards</button>
        <button class="btn-navy btn-quizzes">Quizzes</button>
      </div>
      <div class="member-data"></div>
    </div>
  `;

  grid.appendChild(card);

  const contentDiv = card.querySelector(".member-data");

  // ===== Button Handlers =====
  card.querySelector(".btn-evidence").addEventListener("click", () => {
    contentDiv.innerHTML = member.evidence.length
      ? `<ul>${member.evidence.map(e => `<li>${e}</li>`).join("")}</ul>`
      : "<p>No evidence yet.</p>";
  });

  card.querySelector(".btn-flashcards").addEventListener("click", () => {
    contentDiv.innerHTML = member.flashcards.length
      ? `<ul>${member.flashcards.map(f => `<li>${f}</li>`).join("")}</ul>`
      : "<p>No flashcards yet.</p>";
  });

  card.querySelector(".btn-quizzes").addEventListener("click", () => {
    contentDiv.innerHTML = member.quizzes.length
      ? `<ul>${member.quizzes.map(q => `<li>${q}</li>`).join("")}</ul>`
      : "<p>No quizzes yet.</p>";
  });
});
