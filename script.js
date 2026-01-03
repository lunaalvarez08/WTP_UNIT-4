// ADD ROW FUNCTIONALITY
const addRowBtn = document.getElementById('add-row');
const tableBody = document.querySelector('.evidence-table tbody');
let currentQuestion = 'Q1'; // default question

// Update currentQuestion when a question button is clicked
const questionButtons = document.querySelectorAll('.question-selector button');
questionButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentQuestion = button.getAttribute('data-question');
    // Show only rows for the selected question
    tableBody.querySelectorAll('tr').forEach(row => {
      row.style.display = row.getAttribute('data-question') === currentQuestion ? '' : 'none';
    });
  });
});

addRowBtn.addEventListener('click', () => {
  const newRow = document.createElement('tr');
  newRow.setAttribute('data-question', currentQuestion); // match current question

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
    <td contenteditable="true">Reasoning</td>
    <td><button class="delete-row">Delete</button></td>
  `;

  tableBody.appendChild(newRow);
  attachDeleteEvent(newRow);

  // Focus the first cell automatically
  newRow.querySelector('td').focus();
});

// DELETE ROW FUNCTIONALITY
function attachDeleteEvent(row) {
  const deleteBtn = row.querySelector('.delete-row');
  deleteBtn.addEventListener('click', () => {
    row.remove();
  });
}

// INITIAL DELETE BUTTONS
document.querySelectorAll('.delete-row').forEach(button => {
  button.addEventListener('click', (e) => {
    e.target.closest('tr').remove();
  });
});
