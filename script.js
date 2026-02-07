const quotes = [
  "Knowledge will forever govern ignorance. — James Madison",
  "The Constitution is not a mere lawyers’ document. It is a vehicle of life. — Justice Louis Brandeis",
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
