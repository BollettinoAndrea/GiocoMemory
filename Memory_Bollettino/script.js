const images = [
  "picone.png", "picone.png",
  "agg.png", "agg.png",
  "bisio.png", "bisio.png",
  "checco.png", "checco.png",
  "abatantuono.png", "abatantuono.png",
  "deSica.png", "deSica.png",
  "boldi.png", "boldi.png",
  "papaleo.png", "papaleo.png"
];

const gameBoard = document.getElementById("game-board");
const gameContainer = document.getElementById("game-container");
const victoryScreen = document.getElementById("victory-screen");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  gameBoard.innerHTML = "";
  const shuffled = shuffle(images.slice());
  shuffled.forEach(imgName => {
    const card = document.createElement("div");
    card.classList.add("card");

    const inner = document.createElement("div");
    inner.classList.add("card-inner");

    const front = document.createElement("div");
    front.classList.add("card-front");
    front.textContent = "🎴";

    const back = document.createElement("div");
    back.classList.add("card-back");
    const img = document.createElement("img");
    img.src = `img/${imgName}`;
    back.appendChild(img);

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.addEventListener("click", () => flipCard(card, imgName));
    gameBoard.appendChild(card);
  });
}

function flipCard(card, imgName) {
  if (lockBoard || card.classList.contains("flipped")) return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = { card, imgName };
  } else {
    secondCard = { card, imgName };
    checkMatch();
  }
}

function checkMatch() {
  if (firstCard.imgName === secondCard.imgName) {
    matchedPairs++;
    resetCards();
    if (matchedPairs === 8) {
      setTimeout(showVictory, 1000);
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.card.classList.remove("flipped");
      secondCard.card.classList.remove("flipped");
      resetCards();
    }, 1000);
  }
}

function resetCards() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function showVictory() {
  gameContainer.style.display = "none";
  victoryScreen.style.display = "flex";
}

function restartGame() {
  matchedPairs = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  gameContainer.style.display = "block";
  victoryScreen.style.display = "none";
  createBoard();
}

createBoard();