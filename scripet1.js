let btn = document.querySelector('#btn');
let Display = document.querySelector('#Display');
let text = document.querySelector('#text');
let input = document.querySelector('#input');

// 🎵 Load sounds
let winSound = new Audio('sounds/win.mp3');
let loseSound = new Audio('sounds/lose.mp3');

let wingame = 0;
let lossgame = 0;
let round = 1;

btn.addEventListener('click', () => {
  if (round <= 5) {
    let userGuess = parseInt(input.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 5) {
      alert("⚠️ Please enter a valid number between 1 and 9!");
      input.value = "";
      input.focus();
      return;
    }

    let randomNumber = Math.floor(Math.random() * 9) + 1;

    // Remove previous color class
    Display.classList.remove("win", "lose");

    if (userGuess === randomNumber) {
      Display.innerHTML = `✅ Round ${round}: You Win! The number was <b>${randomNumber}</b>`;
      Display.classList.add("win");
      winSound.play();
      wingame++;
    } else {
      Display.innerHTML = `❌ Round ${round}: You Lost! The correct number was <b>${randomNumber}</b>`;
      Display.classList.add("lose");
      loseSound.play();
      lossgame++;
    }

    round++;

    text.innerHTML = `🎮 Round: ${round <= 5 ? round : 5}/5`;

    if (round > 5) {
      text.innerHTML = `
        <br>🎉 <b>Game Over!</b><br>
        ✅ Wins: ${wingame}<br>
        ❌ Losses: ${lossgame}<br><br>
        <button id="restartBtn">🔁 Play Again</button>
      `;
      btn.disabled = true;

      // Restart Game
      document.querySelector('#restartBtn').addEventListener('click', () => {
        wingame = 0;
        lossgame = 0;
        round = 1;
        Display.innerHTML = "";
        text.innerHTML = "";
        btn.disabled = false;
        input.value = "";
        input.focus();
      });
    }

    input.value = "";
    input.focus();
  }
});
