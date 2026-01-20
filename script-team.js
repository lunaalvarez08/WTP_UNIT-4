alert("TEAM SCRIPT LOADED");
// ===== Team Data =====
const teamMembers = [
  { name: "Luna", emoji: "🦭" },
  { name: "Sarah", emoji: "🦋" },
  { name: "Bekim", emoji: "⭐" },
  { name: "Evan", emoji: "🏈" }
];

// ===== Reference =====
const grid = document.getElementById("team-grid");

// ===== Create Team Cards =====
teamMembers.forEach(member => {
  const card = document.createElement("div");
  card.className = "team-card";

  card.innerHTML = `
    <div class="member-emoji">${member.emoji}</div>
    <div class="member-name">${member.name}</div>
  `;

  // Click → go to member page
  card.addEventListener("click", () => {
    localStorage.setItem("activeMember", JSON.stringify(member));
    window.location.href = "member.html"; // go to member page
  });

  grid.appendChild(card);
});
