const scoreCounter = document.querySelector(".score-counter");
const grid = document.querySelector(".grid");
const endGameScreen = document.querySelector(".end-game-screen");
const endGameText = document.querySelector(".end-game-text");

const totalCells = 100;
const totalBombs = 3;
const maxScore = 5;
const bombsList = [];

let score = 0;

function updateScore() {
  score++;
  scoreCounter.innerHTML = score.toString().padStart(5, "0");

  if (score === maxScore) {
    endGame(false);
  }
}

for (let i = 1; i <= totalCells; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  cell.addEventListener("click", function () {
    if (bombsList.includes(i)) {
      cell.classList.add("cell-bomb");
      endGame();
    }

    cell.classList.add("cell-clicked");
    updateScore();
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
