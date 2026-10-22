const emoji = { rock: '✊', paper: '✋', scissors: '✌️' };

let playerScore = 0;
let computerScore = 0;
let round = 0;

const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const roundEl = document.getElementById('round-number');
const playerChoiceEl = document.getElementById('player-choice');
const computerChoiceEl = document.getElementById('computer-choice');
const resultEl = document.getElementById('result');
const messageEl = document.getElementById('message');
const errorEl = document.getElementById('error');

function play(choice) {
  errorEl.textContent = '';

  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  round++;
  if (choice === computerChoice) {
    resultEl.textContent = "It's a Draw!";
    messageEl.textContent = 'Both players chose the same move.';
  } else if (
    (choice === 'rock' && computerChoice === 'scissors') ||
    (choice === 'paper' && computerChoice === 'rock') ||
    (choice === 'scissors' && computerChoice === 'paper')
  ) {
    playerScore++;
    resultEl.textContent = 'You Win! 🎉';
    messageEl.textContent = `${capitalize(choice)} beats ${computerChoice}.`;
  } else {
    computerScore++;
    resultEl.textContent = 'Computer Wins!';
    messageEl.textContent = `${capitalize(computerChoice)} beats ${choice}.`;
  }

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  roundEl.textContent = round;
  playerChoiceEl.textContent = emoji[choice];
  computerChoiceEl.textContent = emoji[computerChoice];
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  round = 0;
  playerScoreEl.textContent = '0';
  computerScoreEl.textContent = '0';
  roundEl.textContent = '0';
  playerChoiceEl.textContent = '?';
  computerChoiceEl.textContent = '?';
  resultEl.textContent = 'Make your move!';
  messageEl.textContent = 'Choose Rock, Paper or Scissors to start the round.';
  errorEl.textContent = '';
}

document.querySelectorAll('.move-button').forEach(button => {
  button.addEventListener('click', () => play(button.dataset.choice));
});

document.getElementById('reset-button').addEventListener('click', resetGame);
