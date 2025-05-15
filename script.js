const choices = ["🪨", "📄", "✂️"];
const reactions = {
  win: ["Nice move!", "You're crushing it!", "Too easy for you 😎"],
  lose: ["Oops!", "Bot got lucky 😈", "Better luck next time!"],
  tie: ["It's a tie!", "Again? Same brain? 🤖"]
};

const cheekyBotComments = {
  win: ["You're on fire! 🔥", "Can't beat you today!", "Champion vibes! 🏆"],
  lose: ["I'll get you next time!", "Lucky shot!", "Don't give up!"],
  tie: ["Even Stevens!", "Close call!", "Try again!"]
};

let playerScore = 0;
let botScore = 0;
let streak = 0;
let playerName = "Player1";
let musicPlaying = false;

const playerNameInput = document.getElementById("playerName");
const startBtn = document.getElementById("startBtn");
const gameSection = document.querySelector(".game-section");
const moveButtons = document.querySelectorAll(".move-btn");
const playerDisplay = document.getElementById("playerChoice");
const botDisplay = document.getElementById("botChoice");
const resultMsg = document.getElementById("resultMessage");
const botReaction = document.getElementById("botReaction");
const playAgainBtn = document.getElementById("playAgainBtn");
const scoreBoard = document.getElementById("scoreBoard");
const streakMsg = document.getElementById("streakMessage");
const themeBtn = document.getElementById("themeBtn");
const musicBtn = document.getElementById("musicBtn");
const resetBtn = document.getElementById("resetBtn");

// Sounds
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");
const tieSound = document.getElementById("tieSound");

// Start game and show game area
startBtn.addEventListener("click", () => {
  const name = playerNameInput.value.trim();
  playerName = name.length > 0 ? name : "Player1";
  document.querySelector("header p").textContent = `Hello, ${playerName}! Choose your move below!`;
  document.querySelector(".profile-section").style.display = "none";
  gameSection.style.display = "block";
  updateScoreBoard();
});

// Play move
moveButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    playAgainBtn.style.display = "none";
    play(parseInt(btn.dataset.move));
  });
});

playAgainBtn.addEventListener("click", () => {
  resetGame();
});

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

musicBtn.addEventListener("click", () => {
  musicPlaying = !musicPlaying;
  if (musicPlaying) {
    musicBtn.textContent = "🔇 Music";
    // Here you could add background music play logic if you want.
  } else {
    musicBtn.textContent = "🎵 Music";
    // Here you could add background music pause logic if you want.
  }
});

resetBtn.addEventListener("click", () => {
  resetGame();
  playerScore = 0;
  botScore = 0;
  streak = 0;
  updateScoreBoard();
  resultMsg.textContent = "";
  botReaction.textContent = "";
  playAgainBtn.style.display = "none";
  document.querySelector("header p").textContent = "Welcome! Let's play. Choose your move below!";
  document.querySelector(".profile-section").style.display = "block";
  gameSection.style.display = "none";
  playerNameInput.value = "";
});

function play(choiceIndex) {
  playSound(clickSound);
  const playerChoice = choices[choiceIndex];
  const botChoiceIndex = Math.floor(Math.random() * 3);
  const botChoice = choices[botChoiceIndex];

  playerDisplay.textContent = playerChoice;
  botDisplay.textContent = botChoice;

  // Hand shaking animation
  playerDisplay.classList.add("shake");
  botDisplay.classList.add("shake");

  setTimeout(() => {
    playerDisplay.classList.remove("shake");
    botDisplay.classList.remove("shake");

    const result = getResult(choiceIndex, botChoiceIndex);
    updateScores(result);
    updateDisplay(result);
  }, 400);
}

function getResult(player, bot) {
  if (player === bot) return "tie";
  if (
    (player === 0 && bot === 2) ||
    (player === 1 && bot === 0) ||
    (player === 2 && bot === 1)
  )
    return "win";
  return "lose";
}

function updateScores(result) {
  if (result === "win") {
    playerScore++;
    streak++;
  } else if (result === "lose") {
    botScore++;
    streak = 0;
  }
}

function updateDisplay(result) {
  resultMsg.textContent = reactions[result][Math.floor(Math.random() * reactions[result].length)];
  botReaction.textContent = cheekyBotComments[result][Math.floor(Math.random() * cheekyBotComments[result].length)];

  updateScoreBoard();

  if (streak >= 3) {
    streakMsg.textContent = `🔥 Hot streak! ${streak} wins in a row!`;
  } else {
    streakMsg.textContent = "";
  }

  playAgainBtn.style.display = "inline-block";

  // Play sound based on result
  if (result === "win") playSound(winSound);
  else if (result === "lose") playSound(loseSound);
  else playSound(tieSound);
}

function updateScoreBoard() {
  scoreBoard.textContent = `${playerName}: ${playerScore} | Bot: ${botScore}`;
}

function resetGame() {
  resultMsg.textContent = "";
  botReaction.textContent = "";
  playAgainBtn.style.display = "none";
  playerDisplay.textContent = "❔";
  botDisplay.textContent = "❔";
  streakMsg.textContent = "";
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
