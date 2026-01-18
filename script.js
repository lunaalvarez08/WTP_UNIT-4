// ========== AUTO-GROW FUNCTION ==========
function autoGrow(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
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

// Apply delete to all existing rows
document.querySelectorAll('.delete-row').forEach(btn => addDeleteListener(btn));

// ========== FILTER FUNCTION ==========
function filterTable(question = 'all', member = 'all', type = 'all') {
  document.querySelectorAll('.evidence-table tbody tr').forEach(row => {
    const rowQuestion = row.getAttribute('data-question');
    const rowMember = row.getAttribute('data-member');
    const rowType = row.querySelector('.type-select')?.value || 'primary';

    const showQuestion = question === 'all' || rowQuestion === question;
    const showMember = member === 'all' || rowMember === member;
    const showType = type === 'all' || rowType === type;

    row.style.display = (showQuestion && showMember && showType) ? '' : 'none';
  });
}

// ========== ADD ROW FUNCTION ==========
document.getElementById('add-row').addEventListener('click', () => {
  const tbody = document.querySelector('.evidence-table tbody');
  const activeButton = document.querySelector('.question-selector button.active');
  const selectedQuestion = activeButton ? activeButton.getAttribute('data-question') : 'Q1';
  const selectedMember = document.getElementById('team-member').value || 'luna';

  const row = document.createElement('tr');
  row.setAttribute('data-question', selectedQuestion);
  row.setAttribute('data-member', selectedMember);

  row.innerHTML = `
    <td><textarea class="auto-textarea" placeholder="Type evidence here..."></textarea></td>
    <td>
      <select class="type-select">
        <option value="primary">Primary Source</option>
        <option value="secondary">Secondary Source</option>
      </select>
    </td>
    <td>
      <select class="member-select">
        <option value="luna">Luna</option>
        <option value="sarah">Sarah</option>
        <option value="bekim">Bekim</option>
        <option value="evan">Evan</option>
      </select>
    </td>
    <td><textarea class="auto-textarea" placeholder="Explain why it relates..."></textarea></td>
    <td><button class="delete-row">Delete</button></td>
  `;

  tbody.appendChild(row);

  // Set member select to current member
  row.querySelector('.member-select').value = selectedMember;

  // Auto-grow new textareas
  row.querySelectorAll('.auto-textarea').forEach(textarea => {
    textarea.addEventListener('input', () => autoGrow(textarea));
    autoGrow(textarea);
  });

  // Add delete functionality
  addDeleteListener(row.querySelector('.delete-row'));

  // Reapply filters
  const currentQuestion = activeButton ? activeButton.getAttribute('data-question') : 'all';
  const currentMember = document.getElementById('team-member').value;
  const currentType = document.getElementById('type-filter')?.value || 'all';
  filterTable(currentQuestion, currentMember, currentType);

  // Focus first cell
  row.querySelector('td').focus();
});

// ========== QUESTION FILTER ==========
document.querySelectorAll('.question-selector button').forEach(button => {
  button.addEventListener('click', () => {
    const selectedQuestion = button.getAttribute('data-question');
    const selectedMember = document.getElementById('team-member').value;
    const selectedType = document.getElementById('type-filter')?.value || 'all';

    filterTable(selectedQuestion, selectedMember, selectedType);

    // Highlight active button
    document.querySelectorAll('.question-selector button').forEach(btn => {
      btn.classList.toggle('active', btn === button);
    });
  });
});

// ========== TEAM MEMBER FILTER ==========
document.getElementById('team-member').addEventListener('change', () => {
  const selectedMember = document.getElementById('team-member').value;
  const activeButton = document.querySelector('.question-selector button.active');
  const selectedQuestion = activeButton ? activeButton.getAttribute('data-question') : 'all';
  const selectedType = document.getElementById('type-filter')?.value || 'all';
  filterTable(selectedQuestion, selectedMember, selectedType);
});

// ========== TYPE FILTER ==========
const typeFilter = document.getElementById('type-filter');
if (typeFilter) {
  typeFilter.addEventListener('change', () => {
    const selectedType = typeFilter.value;
    const selectedMember = document.getElementById('team-member').value;
    const activeButton = document.querySelector('.question-selector button.active');
    const selectedQuestion = activeButton ? activeButton.getAttribute('data-question') : 'all';
    filterTable(selectedQuestion, selectedMember, selectedType);
  });
}

// ========== INLINE MEMBER SELECT CHANGE ==========
document.addEventListener('change', e => {
  if (e.target.classList.contains('member-select')) {
    const row = e.target.closest('tr');
    row.setAttribute('data-member', e.target.value);

    const activeButton = document.querySelector('.question-selector button.active');
    const selectedQuestion = activeButton ? activeButton.getAttribute('data-question') : 'all';
    const selectedMember = document.getElementById('team-member').value;
    const selectedType = document.getElementById('type-filter')?.value || 'all';

    filterTable(selectedQuestion, selectedMember, selectedType);
  }
});

// ========== INITIAL FILTER ==========
filterTable();
