// Quote of the Day
const quotes = [
  "Knowledge will forever govern ignorance. — James Madison",
  "The Constitution is not a mere lawyers’ document. — Justice Louis Brandeis",
  "Democracy cannot succeed unless those who express their choice are prepared to choose wisely. — Franklin D. Roosevelt",
  "Liberty lies in the rights of that person whose views you find most odious. — H. L. Mencken",
  "The price of freedom is eternal vigilance. — Thomas Jefferson",
  "Justice delayed is justice denied. — William E. Gladstone",
  "Freedom is never voluntarily given by the oppressor; it must be demanded by the oppressed. — Martin Luther King Jr.",
  "In matters of conscience, the law of the majority has no place. — Mahatma Gandhi",
  "If men were angels, no government would be necessary. — James Madison",
  "The safeguard of liberty is education. — Woodrow Wilson"
];

const quoteEl = document.getElementById("quote");
quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];

// Countdown Timer
const competitionDate = new Date("April 16, 2026 09:00:00").getTime();

function updateTimer() {
  const now = new Date().getTime();
  const distance = competitionDate - now;

  if (distance < 0) {
    document.getElementById("competition-timer").textContent = "Competition is live!";
    clearInterval(timerInterval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("competition-timer").textContent =
    `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer();
