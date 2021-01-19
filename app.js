/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose 
- Let player choose to play again
*/

// Game values
let min = 1,
  max = 50,
  winningNum = getRandomNum(min, max),
  guessesLeft = 5;

// UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guess'
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess)) setMessage(` Please enter a number !`, "#ff595e");
  else {
    // Check if won
    if (guess === winningNum) {
      //Game over - won
      gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } else {
      // Wrong number
      // guessesLeft = guessesLeft-1 both of the same
      guessesLeft -= 1;

      if (guessesLeft === 0) {
        // Game over - lost
        gameOver(
          false,
          `Game Over, you lost. The correct number was ${winningNum}`
        );
      } else {
        // Game continues - answer wrong

        // Change border color
        guessInput.style.borderColor = "blue";

        // Clear input
        guessInput.value = "";
        // Tell user it's the wrong number
        setMessage(
          `${guess} is not correct, ${guessesLeft} guesses left.`,
          "#ff595e"
        );
      }
      if (guess < min || guess > max) {
        setMessage(
          `Please enter a number between ${min} and ${max}`,
          "#ad6a6c"
        );
      }
    }
  }
});

// Game Over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "#b58db6") : (color = "#ad6a6c");
  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  // Play again?
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// Get Winning Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
