const letters = [
  'α','β','γ','δ','ε','ζ','η','θ','ι','κ','λ','μ','ν','ξ','ο','π','ρ','σ','τ','υ','φ','χ','ψ','ω',
  'ά','έ','ή', 'ί', 'ό', 'ύ', 'ώ', 'ϊ', 'ΐ', 'ΰ',
  'Α','Β','Γ','Δ','Ε','Ζ','Η','Θ','Ι','Κ','Λ','Μ','Ν','Ξ','Ο','Π','Ρ','Σ','Τ','Υ','Φ','Χ','Ψ','Ω',
  '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', ';', ':', '<', '>', '?', ',', '.', '/'
];

const LETTER_TIME_LIMIT = 5;
const GAME_TIME_LIMIT = 60;

let letterTimer = LETTER_TIME_LIMIT;
let gameTimer = GAME_TIME_LIMIT;
let letter = null;
let score = 0;
let gameOver = true;
let intervalId = null;

const letter_el = document.getElementById('the-letter');
const counter_el = document.getElementById('the-counter');     // per-letter timer
const game_timer_el = document.getElementById('game-timer');   // total timer
const score_el = document.getElementById('score');
const letter_input = document.getElementById('letter-input');
const restart_btn = document.getElementById('restart-btn');

function choose_letter() {
  return letters[Math.floor(Math.random() * letters.length)];
}

function clearInput() {
  letter_input.value = '';
}

function newLetterAndResetLetterTimer() {
  letter = choose_letter();
  letter_el.textContent = letter;

  letterTimer = LETTER_TIME_LIMIT;
  counter_el.textContent = letterTimer;
}

function setUIRunning() {
  restart_btn.disabled = true;    // disabled during round
  letter_input.disabled = false;
}

function setUIEnded() {
  restart_btn.disabled = false;   // enabled after round ends
  letter_input.disabled = true;
}

function startRound() {
  // safety: clear old timer
  if (intervalId) clearInterval(intervalId);

  // reset state
  score = 0;
  score_el.textContent = score;

  gameTimer = GAME_TIME_LIMIT;
  game_timer_el.textContent = gameTimer;

  gameOver = false;
  setUIRunning();
  clearInput();
  newLetterAndResetLetterTimer();

  // 👇 focus input when round starts
  letter_input.focus();

  intervalId = setInterval(() => {
    if (gameOver) return;

    gameTimer--;
    letterTimer--;

    game_timer_el.textContent = gameTimer;
    counter_el.textContent = letterTimer;

    // per-letter timeout → new letter, game continues
    if (letterTimer <= 0) {
      newLetterAndResetLetterTimer();
      clearInput();
    }

    // end of 1-minute round
    if (gameTimer <= 0) {
      gameOver = true;
      clearInterval(intervalId);
      intervalId = null;

      letter_el.textContent = '⏱️ Done!';
      setUIEnded();
      clearInput();
    }
  }, 1000);
}

// handle guesses
letter_input.addEventListener('beforeinput', (e) => {
  if (gameOver || !e.data) return;

  // clear input right after the guess
  setTimeout(clearInput, 0);

  if (e.data === letter) {
    score++;
    score_el.textContent = score;
    newLetterAndResetLetterTimer();
  }
  // wrong guess → same letter, same timer
});

// restart only works after round ends
restart_btn.addEventListener('click', () => {
  if (!gameOver) return;
  startRound();
});

// initial UI state
restart_btn.disabled = false;
letter_input.disabled = true;
// letter_el.textContent = 'Press Restart';
counter_el.textContent = LETTER_TIME_LIMIT;
game_timer_el.textContent = GAME_TIME_LIMIT;
score_el.textContent = 0;

// ------ UI Colors -------

const colorPickerBg = document.getElementById('bg-input');
const colorPickerFont = document.getElementById('font-input');

const the_body = document.querySelector('body');
const the_letter = document.getElementById('the-letter');

const the_anchor = document.getElementById('check-ratio-anchor');

let selectedBg = "#40513B";
let selectedFont = "#f5fbe6";

let the_href = `https://contrast-ratio.org/#${selectedFont.replace("#", "%23")}-on-${selectedBg.replace("#", "%23")}`;

colorPickerBg.addEventListener("input", updateFirstBg);
colorPickerBg.addEventListener("change", watchColorPickerBg);

function updateFirstBg(event) {
  // the_body.style.background = event.target.value;
  the_body.style.setProperty("--main-bg-color", event.target.value);
  selectedBg = event.target.value;
  the_href = `https://contrast-ratio.org/#${selectedFont.replace("#", "%23")}-on-${selectedBg.replace("#", "%23")}`;
  the_anchor.href = the_href;
}

function watchColorPickerBg(event) {
  // the_body.style.background = event.target.value;
  the_body.style.setProperty("--main-bg-color", event.target.value);
  selectedBg = event.target.value;
  the_href = `https://contrast-ratio.org/#${selectedFont.replace("#", "%23")}-on-${selectedBg.replace("#", "%23")}`;
  the_anchor.href = the_href;
}

colorPickerFont.addEventListener("input", updateFirstFont);
colorPickerFont.addEventListener("change", watchColorPickerFont);

function updateFirstFont(event) {
  // the_body.style.background = event.target.value;
  the_body.style.setProperty("--letter-color", event.target.value);
  selectedFont = event.target.value;
  the_href = `https://contrast-ratio.org/#${selectedFont.replace("#", "%23")}-on-${selectedBg.replace("#", "%23")}`;
  the_anchor.href = the_href;
}

function watchColorPickerFont(event) {
  // the_body.style.background = event.target.value;
  the_body.style.setProperty("--letter-color", event.target.value);
  selectedFont = event.target.value;
  the_href = `https://contrast-ratio.org/#${selectedFont.replace("#", "%23")}-on-${selectedBg.replace("#", "%23")}`;
  the_anchor.href = the_href;
}
