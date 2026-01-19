// ===== Flashcards Data =====
const baseFlashcards = [
  { question: "What year was the U.S. Constitution ratified?", answer: "1787", hard: false },
  { question: "Which branch can declare war?", answer: "Legislative", hard: false },
  { question: "Who wrote the Federalist Papers?", answer: "Madison, Hamilton, Jay", hard: false }
];

// ===== Load saved hard cards from localStorage =====
const savedHard = JSON.parse(localStorage.getItem("hardCards")) || {};

// ===== Variables =====
let deck = [];
let index = 0;

const front = document.getElementById("card-front");
const back = document.getElementById("card-back");
const inner = document.getElementById("card-inner");
const hardBtn = document.getElementById("hard-btn");
const progress = document.getElementById("progress");

// ===== Shuffle function =====
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ===== Build Deck =====
function buildDeck() {
  deck = [];
  baseFlashcards.forEach(card => {
    card.hard = savedHard[card.question] || false;
    deck.push(card);
    if (card.hard) deck.push(card, card); // Hard cards appear more often
  });
  shuffle(deck); // Shuffle after building
}

// ===== Load Current Card =====
function loadCard() {
  inner.classList.remove("flipped");
  const card = deck[index];
  front.textContent = card.question;
  back.textContent = card.answer;
  progress.textContent = `Card ${index + 1} / ${deck.length}`;
  hardBtn.textContent = card.hard ? "★ Hard (click to unmark)" : "☆ Mark as Hard";
}

// ===== Flip Card =====
document.querySelector(".flashcard").addEventListener("click", () => {
  inner.classList.toggle("flipped");
});

// ===== Prev / Next =====
document.getElementById("next").addEventListener("click", () => {
  index = (index + 1) % deck.length;
  loadCard();
});

document.getElementById("prev").addEventListener("click", () => {
  index = (index - 1 + deck.length) % deck.length;
  loadCard();
});

// ===== Mark / Unmark Hard =====
hardBtn.addEventListener("click", () => {
  const card = deck[index];
  card.hard = !card.hard;

  if (card.hard) savedHard[card.question] = true;
  else delete savedHard[card.question];

  localStorage.setItem("hardCards", JSON.stringify(savedHard));

  buildDeck();
  index = 0; // Reset to first card
  loadCard();
});

// ===== Keyboard Controls =====
document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") document.getElementById("next").click();
  if (e.key === "ArrowLeft") document.getElementById("prev").click();
  if (e.key === " ") {
    e.preventDefault();
    inner.classList.toggle("flipped");
  }
});

// ===== Initialize =====
buildDeck();
loadCard();
