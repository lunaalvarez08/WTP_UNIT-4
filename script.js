// ======= VARIABLES =======
const addRowBtn = document.getElementById('add-row');
const tableBody = document.querySelector('.evidence-table tbody');
const questionButtons = document.querySelectorAll('.question-selector button');
const teamSelect = document.getElementById('team-member');

// ======= ADD ROW FUNCTION =======
addRowBtn.addEventListener('click', () => {
  const newRow = document.createElement('tr');
  // Default question is Q1
  newRow.dataset.question = 'Q1';
  newRow.innerHTML = `
    <td contenteditable="true">New evidence</td>
    <td>
      <select>
        <option value="primary">Primary Source</option>
        <option value="secondary">Secondary Source</option>
        <option value="court">Court Case</option>
        <option value="stat">Statistics/Data</option>
        <option value="expert">Expert Opinion</option>
        <option value="current">Current Event</option>
        <option value="other">Other</option>
      </select>
    </td>
    <td contenteditable="true">Explanation</td>
    <td><button class="delete-row">Delete</button></td>
  `;
  tableBody.appendChild(newRow);
});

// ======= DELETE ROW FUNCTION =======
tableBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-row')) {
    e.target.closest('tr').remove();
  }
});

// ======= FILTER BY QUESTION =======
questionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedQuestion = button.dataset.question;
    const allRows = tableBody.querySelectorAll('tr');
    allRows.forEach(row => {
      row.style.display = row.dataset.question === selectedQuestion ? '' : 'none';
    });
  });
});

// ======= OPTIONAL: FILTER BY TEAM MEMBER (future enhancement) =======
teamSelect.addEventListener('change', () => {
  const member = teamSelect.value;
  // You can add logic here to filter rows per member
});
