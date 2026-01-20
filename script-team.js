// ===== Team Data =====
const teamMembers = [
  { name: "Luna", emoji: "🦭", practice: ["Q1","Q2","Q3"], evidence: ["Evidence 1","Evidence 2"], flashcards: ["Flash A","Flash B"], quizzes: ["Quiz 1","Quiz 2"] },
  { name: "Sarah", emoji: "🦋", practice: ["Q1","Q2"], evidence: ["Evidence 3"], flashcards: ["Flash C"], quizzes: ["Quiz 1"] },
  { name: "Bekim", emoji: "⭐", practice: ["Q2","Q3"], evidence: ["Evidence 4"], flashcards: ["Flash D"], quizzes: ["Quiz 2","Quiz 3"] },
  { name: "Evan", emoji: "🏈", practice: ["Q1","Q3"], evidence: ["Evidence 5","Evidence 6"], flashcards: [], quizzes: ["Quiz 3"] }
];

// ===== References =====
const grid = document.getElementById("team-grid");
const panel = document.getElementById("member-panel");
const closePanel = document.getElementById("close-panel");
const panelEmoji = document.getElementById("panel-emoji");
const panelName = document.getElementById("panel-name");
const tabContent = document.getElementById("tab-content");
const tabButtons = document.querySelectorAll(".tab-btn");

// ===== Create Team Cards =====
teamMembers.forEach(member => {
  const card = document.createElement("div");
  card.className = "team-card";
  card.innerHTML = `
    <div class="member-emoji">${member.emoji}</div>
    <div class="member-name">${member.name}</div>
  `;
  grid.appendChild(card);

  // Click card → open panel
  card.addEventListener("click", () => {
    panel.classList.remove("hidden");
    panelEmoji.textContent = member.emoji;
    panelName.textContent = member.name;
    // Default tab: Practice
    loadTab(member, "practice");
    highlightTab("practice");
  });
});

// ===== Close panel =====
closePanel.addEventListener("click", () => {
  panel.classList.add("hidden");
  tabContent.innerHTML = "";
});

// ===== Load Tab Content =====
function loadTab(member, tab) {
  let html = "";
  if(tab === "practice") {
    html = `<p>Select Practice Set:</p><ul>${member.practice.map(p => `<li>${p}</li>`).join("")}</ul>`;
  } else if(tab === "evidence") {
    html = `<p>Evidence Charts:</p><ul>${member.evidence.map(e => `<li>${e}</li>`).join("")}</ul>`;
  } else if(tab === "flashcards") {
    html = `<p>Flashcards:</p><ul>${member.flashcards.map(f => `<li>${f}</li>`).join("")}</ul>`;
  } else if(tab === "quizzes") {
    html = `<p>Quizzes:</p><ul>${member.quizzes.map(q => `<li>${q}</li>`).join("")}</ul>`;
  }
  tabContent.innerHTML = html;
}

// ===== Tab button click =====
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const memberName = panelName.textContent;
    const member = teamMembers.find(m => m.name === memberName);
    loadTab(member, btn.dataset.tab);
    highlightTab(btn.dataset.tab);
  });
});

// ===== Highlight Active Tab =====
function highlightTab(tab) {
  tabButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.tab === tab));
}
