alert("Specialist Engine Loaded");

// ===== UI Logic for the Specialist Engine =====
let currentQuestions = [];
let streak = 0;

// Tab Switching Logic
function switchTab(tab) {
    const views = ['play', 'arch', 'bank', 'active'];
    views.forEach(t => {
        const view = document.getElementById('view-' + t);
        const tabBtn = document.getElementById('tab-' + t);
        if (view) view.classList.add('hidden');
        if (tabBtn) tabBtn.classList.remove('active');
    });
    const targetView = document.getElementById('view-' + tab);
    if (targetView) targetView.classList.remove('hidden');
    const targetTab = document.getElementById('tab-' + tab);
    if (targetTab) targetTab.classList.add('active');
}

// Launching the actual drill from the drop downs
function startSpecialistQuiz() {
    const mem = document.getElementById('playMember').value;
    const top = document.getElementById('playTopic').value;
    
    // Check the master bank (which should be in your HTML script)
    if (window.masterQuestionBank && window.masterQuestionBank[mem] && window.masterQuestionBank[mem][top]) {
        currentQuestions = window.masterQuestionBank[mem][top];
    } else {
        alert("Evidence for " + mem + " " + top + " not found. Check your bank assembly.");
        return;
    }

    if (currentQuestions.length === 0) {
        alert("This specialist currently has zero scenarios for this question.");
        return;
    }

    streak = 0;
    // Human style label (No dashes)
    document.getElementById('memberLabel').innerText = mem + " Specialist Drill " + top;
    switchTab('active');
    renderQuestion();
}

// Displaying the concrete evidence
function renderQuestion() {
    const q = currentQuestions[Math.floor(Math.random() * currentQuestions.length)];
    document.getElementById('qText').innerText = q.scenario;
    document.getElementById('streakLabel').innerText = "STREAK " + streak;
    
    const grid = document.getElementById('options');
    grid.innerHTML = '';

    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt, q.correct, btn);
        grid.appendChild(btn);
    });
}

// Answer Logic
function checkAnswer(selected, correct, btn) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(b => b.disabled = true);

    if (selected === correct) {
        btn.classList.add('correct');
        streak++;
        setTimeout(renderQuestion, 1000);
    } else {
        btn.classList.add('wrong');
        buttons.forEach(b => {
            if (b.innerText === correct) b.classList.add('correct');
        });
        streak = 0;
        setTimeout(renderQuestion, 2500);
    }
}
