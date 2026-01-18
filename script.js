// ADD ROW FUNCTIONALITY
const addRowBtn = document.getElementById('add-row');
const tableBody = document.querySelector('.evidence-table tbody');
const teamSelector = document.getElementById('team-member');

let currentQuestion = 'Q1'; // default
let currentTeam = 'all';     // default

// Update currentQuestion when a question button is clicked
const questionButtons = document.querySelectorAll('.question-selector button');
questionButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentQuestion = button.getAttribute('data-question');
    filterRows();
  });
});

// Update currentTeam when dropdown changes
teamSelector.addEventListener('change', () => {
  currentTeam = teamSelector.value;
  filterRows();
});

// Add new row
addRowBtn.addEventListener('click', () => {
  const newRow = document.createElement('tr');
  newRow.setAttribute('data-question', currentQuestion);
  newRow.setAttribute('data-team', currentTeam);

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
  filterRows();

  // Focus first cell
  newRow.querySelector('td').focus();
});

// Delete row functionality
function attachDeleteEvent(row) {
  const deleteBtn = row.querySelector('.delete-row');
  deleteBtn.addEventListener('click', () => {
    row.remove();
  });
}

// Initial delete buttons
document.querySelectorAll('.delete-row').forEach(button => {
  button.addEventListener('click', e => {
    e.target.closest('tr').remove();
  });
});

// Filter rows by current question and team
function filterRows() {
  tableBody.querySelectorAll('tr').forEach(row => {
    const rowQuestion = row.getAttribute('data-question');
    const rowTeam = row.getAttribute('data-team') || 'all';
    const showByQuestion = rowQuestion === currentQuestion;
    const showByTeam = currentTeam === 'all' || rowTeam === currentTeam;
    row.style.display = showByQuestion && showByTeam ? '' : 'none';
  });
}

// Set default question filter on page load
filterRows();
// ========== AUTO-GROW FUNCTION ==========
function autoGrow(textarea) {
  textarea.style.height = 'auto';                  // reset height
  textarea.style.height = textarea.scrollHeight + 'px'; // grow to fit content
}

// Apply auto-grow to existing textareas
document.querySelectorAll('.auto-textarea').forEach(textarea => {
  autoGrow(textarea);
  textarea.addEventListener('input', () => autoGrow(textarea));
});

// ========== DELETE ROW FUNCTION ==========
function addDeleteListener(btn) {
  btn.addEventListener('click', () => {
    btn.closest('tr').remove();
  });
}

// Apply delete to existing rows
document.querySelectorAll('.delete-row').forEach(btn => addDeleteListener(btn));

// ========== ADD ROW FUNCTION ==========
document.getElementById('add-row').addEventListener('click', () => {
  const tbody = document.querySelector('.evidence-table tbody');

  // Get currently selected question
  const activeButton = document.querySelector('.question-selector button.active');
  const selectedQuestion = activeButton ? activeButton.getAttribute('data-question') : 'Q1';

  // Get currently selected team member
  const selectedMember = document.getElementById('team-member').value || 'all';

  // Create new row
  const row = document.createElement('tr');
  row.setAttribute('data-question', selectedQuestion);
  row.setAttribute('data-member', selectedMember);

  row.innerHTML = `
    <td><textarea class="auto-textarea" placeholder="Type evidence here..."></textarea></td>
    <td>
      <select>
        <option value="primary">Primary Source</option>
        <option value="secondary">Secondary Source</option>
      </select>
    </td>
    <td><textarea class="auto-textarea" placeholder="Explain why it relates..."></textarea></td>
    <td><button class="delete-row">Delete</button></td>
  `;

  tbody.appendChild(row);

  // Apply auto-grow to new textareas
  row.querySelectorAll('.auto-textarea').forEach(textarea => {
    textarea.addEventListener('input', () => autoGrow(textarea));
    autoGrow(textarea);
  });

  // Apply delete button
  addDeleteListener(row.querySelector('.delete-row'));
});
