const scoreCounter = document.querySelector(".score-counter");
const maxScoreCounter = document.querySelector(".max-score");
const grid = document.querySelector(".grid");
const endGameScreen = document.querySelector(".end-game-screen");
const endGameText = document.querySelector(".end-game-text");
const playAgainButton = document.querySelector(".play-again");
const healthCounter = document.querySelector(".health-counter");

const totalCells = 100;
const totalBombs = 20;
const maxScore = 10;
const bombsList = [];
let health = 3;

let score = 0;
function formatScore(displayedScore) {
  return displayedScore.toString().padStart(3, "0");
}
// initializing the score
let scoreFormat = document.createElement("span");
scoreCounter.innerHTML = formatScore(score);
maxScoreCounter.innerHTML = formatScore(maxScore);

function updateScore() {
  score++;
  scoreCounter.innerHTML = formatScore(score);
  if (score === maxScore) {
    endGame(true);
  }
  scoreCounter.style.transform = "scale(1.5)";
  setTimeout(function () {
    scoreCounter.style.transform = "scale(1)";
  }, 500);
}

for (let i = 1; i <= totalCells; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  cell.addEventListener("click", function () {
    if (bombsList.includes(i)) {
      cell.classList.add("cell-bomb");
      health--; // reduce health on click
      console.log(health);
      healthCounter.innerHTML = health.toString();
      healthCounter.style.color = "red";
      healthCounter.style.transform = "scale(1.5)";
      setTimeout(function () {
        healthCounter.style.transform = "scale(1)";
      }, 500);
      cell.classList.add("cell-clicked-bomb");
    }

    if (health === 0) {
      endGame(false);
    }

    if (!bombsList.includes(i)) {
      cell.classList.add("cell-clicked");
      updateScore();
    }
  });

  grid.appendChild(cell);
}

while (bombsList.length < totalBombs) {
  // Generate a random number between 1 and 100, inclusive
  const randomNumber = Math.floor(Math.random() * totalCells) + 1;

  if (!bombsList.includes(randomNumber)) {
    bombsList.push(randomNumber);
  }
}

function endGame(isVictory) {
  if (isVictory) {
    endGameText.innerHTML = "YOU<br>WON";
    endGameScreen.classList.add("win");
  }
  endGameScreen.classList.remove("hidden");
}

playAgainButton.addEventListener("click", function () {
  window.location.reload();
});
