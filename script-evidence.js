alert("Evidence script loaded");

const activeMember = JSON.parse(localStorage.getItem("activeMember"));
const isPersonal = !!activeMember;

const members = [
  { name: "Luna", id: "luna" },
  { name: "Sarah", id: "sarah" },
  { name: "Bekim", id: "bekim" },
  { name: "Evan", id: "evan" }
];

const evidenceData = [
  { member: "luna", question: "Q1", evidence: "Luna Q1 evidence", type: "primary", why: "Explanation" },
  { member: "luna", question: "Q2", evidence: "Luna Q2 evidence", type: "secondary", why: "Explanation" },
  { member: "sarah", question: "Q1", evidence: "Sarah Q1 evidence", type: "primary", why: "Explanation" },
  { member: "bekim", question: "Q3", evidence: "Bekim Q3 evidence", type: "secondary", why: "Explanation" },
  // add all your real entries here
];

const tableBody = document.querySelector(".evidence-table tbody");
const memberSelect = document.getElementById("team-member");
const typeSelect = document.getElementById("type-filter");
const questionButtons = document.querySelectorAll(".question-selector button");

// Hide member drop-down if personal
if (isPersonal && memberSelect) memberSelect.parentElement.style.display = "none";

// Current filter state
let currentQuestion = "Q1";
let currentMember = isPersonal ? activeMember.name.toLowerCase() : "all";
let currentType = "all";

// Function to render rows
function renderTable() {
  tableBody.innerHTML = "";

  const filtered = evidenceData.filter(e => 
    (currentQuestion === e.question) &&
    (currentMember === "all" || e.member === currentMember) &&
    (currentType === "all" || e.type === currentType)
  );

  filtered.forEach(e => {
    const row = document.createElement("tr");
    row.dataset.member = e.member;
    row.dataset.question = e.question;
    row.innerHTML = `
      <td><textarea class="auto-textarea">${e.evidence}</textarea></td>
      <td>
        <select class="type-select">
          <option value="primary" ${e.type==="primary"?"selected":""}>Primary Source</option>
          <option value="secondary" ${e.type==="secondary"?"selected":""}>Secondary Source</option>
        </select>
      </td>
      <td>
        <select class="member-select" ${isPersonal ? "disabled" : ""}>
          ${members.map(m => `<option value="${m.id}" ${m.id===e.member?"selected":""}>${m.name}</option>`).join("")}
        </select>
      </td>
      <td><textarea class="auto-textarea">${e.why}</textarea></td>
      <td><button class="delete-row">Delete</button></td>
    `;
    tableBody.appendChild(row);

    // Delete row
    row.querySelector(".delete-row").addEventListener("click", () => {
      const index = evidenceData.indexOf(e);
      if (index > -1) evidenceData.splice(index, 1);
      renderTable();
    });
  });
}

// Question button click
questionButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentQuestion = btn.dataset.question;
    questionButtons.forEach(b => b.classList.toggle("active", b===btn));
    renderTable();
  });
});

// Member filter change
if (memberSelect) memberSelect.addEventListener("change", e => {
  currentMember = e.target.value;
  renderTable();
});

// Type filter change
if (typeSelect) typeSelect.addEventListener("change", e => {
  currentType = e.target.value;
  renderTable();
});

// Add row
document.getElementById("add-row").addEventListener("click", () => {
  evidenceData.push({
    member: isPersonal ? activeMember.name.toLowerCase() : "luna",
    question: currentQuestion,
    evidence: "",
    type: "primary",
    why: ""
  });
  renderTable();
});

// Initial render
renderTable();
