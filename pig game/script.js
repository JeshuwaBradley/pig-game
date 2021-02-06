'use strict';

//selecting elements
const playerEl0 = document.querySelector(".player--0");
const playerEl1 = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");


//starting conditions

 let scores, currentScore, activePlayer, playing;

const init = function() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  playerEl0.classList.remove("player--winner");
  playerEl1.classList.remove("player--winner");
  playerEl0.classList.add("player--active");
  playerEl1.classList.remove("player--active");
}
init();

const switchPlayer = function() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEl0.classList.toggle("player--active");
  playerEl1.classList.toggle("player--active");
}


//rolling the dice functionality
btnRoll.addEventListener("click", function() {
  if (playing) {
    //generating a randon dice rolling
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //checked for the rolled 1: if true, switch to next player
    if (dice !== 1) {
      //add the value to the score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      //switch players
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function() {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    if (scores[activePlayer] >= 10) {
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
