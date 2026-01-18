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
  const selectedType = document.getElementById('type-filter')?.value || 'primary';

  const row = document.createElement('tr');
  row.setAttribute('data-question', selectedQuestion);
  row.setAttribute('data-member', selectedMember);

  row.innerHTML = `
    <td><textarea class="auto-textarea" placeholder="Type evidence here..."></textarea></td>
    <td>
      <select class="type-select">
        <option value="constitution" ${selectedType === 'constitution' ? 'selected' : ''}>Constitution / Amendments</option>
        <option value="bill_of_rights" ${selectedType === 'bill_of_rights' ? 'selected' : ''}>Bill of Rights</option>
        <option value="other_amendments" ${selectedType === 'other_amendments' ? 'selected' : ''}>Other Amendments</option>
        <option value="constitutional_principles" ${selectedType === 'constitutional_principles' ? 'selected' : ''}>Constitutional Principles/Values</option>
        <option value="federalist_paper" ${selectedType === 'federalist_paper' ? 'selected' : ''}>Federalist Paper Quote</option>
        <option value="anti_federalist" ${selectedType === 'anti_federalist' ? 'selected' : ''}>Anti-Federalist Quote</option>
        <option value="founding_father" ${selectedType === 'founding_father' ? 'selected' : ''}>Founding Father Quote / Letter / Speech</option>
        <option value="historian" ${selectedType === 'historian' ? 'selected' : ''}>Historian / Political Scientist Analysis</option>
        <option value="comparative_doc" ${selectedType === 'comparative_doc' ? 'selected' : ''}>Other Historical Documents</option>
        <option value="supreme_court" ${selectedType === 'supreme_court' ? 'selected' : ''}>Supreme Court Case</option>
        <option value="state_court" ${selectedType === 'state_court' ? 'selected' : ''}>State Court Case</option>
        <option value="international_court" ${selectedType === 'international_court' ? 'selected' : ''}>International Court Case</option>
        <option value="us_current_event" ${selectedType === 'us_current_event' ? 'selected' : ''}>U.S. Current Event</option>
        <option value="state_current_event" ${selectedType === 'state_current_event' ? 'selected' : ''}>State / Local Current Event</option>
        <option value="world_current_event" ${selectedType === 'world_current_event' ? 'selected' : ''}>World Current Event</option>
        <option value="international_doc" ${selectedType === 'international_doc' ? 'selected' : ''}>International Document / Treaty</option>
        <option value="other" ${selectedType === 'other' ? 'selected' : ''}>Other</option>
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
