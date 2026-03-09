// ===== SPECIALIST ENGINE LOGIC =====
let currentQuestions = [];
let streak = 0;

// Tab switching to move between the Hub and the Active Drill
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

// This function runs when you click da button "Launch Drill"
function startSpecialistQuiz() {
    const mem = document.getElementById('playMember').value;
    const top = document.getElementById('playTopic').value;
    
    // Accessing the Master Bank you defined in the HTML omggggg
    if (window.masterQuestionBank && window.masterQuestionBank[mem] && window.masterQuestionBank[mem][top]) {
        currentQuestions = window.masterQuestionBank[mem][top];
    }

    if (!currentQuestions || currentQuestions.length === 0) {
        alert("The data bank for " + mem + " " + top + " is still being assembled.");
        return;
    }

    streak = 0;
    // label or whatever idkkkkkk
    document.getElementById('memberLabel').innerText = mem + " Unit 4 Specialist Drill " + top;
    switchTab('active');
    renderQuestion();
}

// Logic to pull a concrete piece of evidence and show it
function renderQuestion() {
    const randomIndex = Math.floor(Math.random() * currentQuestions.length);
    const q = currentQuestions[randomIndex];
    
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

function checkAnswer(selected, correct, btn) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(b => b.disabled = true);

    if (selected === correct) {
        btn.classList.add('correct');
        streak++;
        // Short pause before the next piece of evidence
        setTimeout(renderQuestion, 1200);
    } else {
        btn.classList.add('wrong');
        // Reveal the correct constitutional principle
        buttons.forEach(b => {
            if (b.innerText === correct) b.classList.add('correct');
        });
        streak = 0;
        setTimeout(renderQuestion, 3000);
    }
}

// Initialize the alert so you know the script is actually!!!!! connected
console.log("Specialist Engine fully operational.");
