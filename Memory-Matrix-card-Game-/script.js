const cards = document.querySelectorAll(".card");
const confettiContainer = document.getElementById("confetti-container");
const playAgainBtn = document.getElementById("play-again");
playAgainBtn.addEventListener("click", () => window.location.reload());

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let matchesFound = 0;
const totalPairs = 8;

// Add an event listener to each card
cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
}
shuffle();

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add("flipped");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    secondCard = this;
  }

  checkForMatch();
}
function checkForMatch() {
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;
  isMatch ? disableCards() : unflipCards();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}
function disableCards() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  matchesFound++;

  if (matchesFound === totalPairs) showConfetti();

  resetBoard();
}
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
function startConfetti() {
  function createConfettiPiece() {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    // Random size
    const sizeClass = ["small", "medium", "large"][
      Math.floor(Math.random() * 3)
    ];
    confetti.classList.add(sizeClass);

    // Random shape - add 'circle' only if needed
    if (Math.random() > 0.5) {
      confetti.classList.add("circle");
    }

    // Random color
    const confettiColors = [
      "#FFC107",
      "#2196F3",
      "#FF5722",
      "#4CAF50",
      "#E91E63",
    ];
    confetti.style.backgroundColor =
      confettiColors[Math.floor(Math.random() * confettiColors.length)];

    // Random horizontal position
    confetti.style.left = `${Math.random() * 100}vw`;

    // Random animation delay
    confetti.style.animationDelay = `${Math.random() * 2}s`;

    confettiContainer.appendChild(confetti);

    // Remove confetti after animation ends
    confetti.addEventListener("animationend", () => confetti.remove());
  }

  // Generate multiple confetti pieces
  for (let i = 0; i < 1000; i++) {
    createConfettiPiece();
  }
}

// Show confetti on win
function showConfetti() {
  startConfetti(); // Call the confetti animation
  playAgainBtn.style.display = "block"; // Show the play again button
  document.getElementById("congratulations").style.display = "block"; // Show the congratulations message
}
