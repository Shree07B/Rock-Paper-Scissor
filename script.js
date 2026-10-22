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

async function play(choice) {
  errorEl.textContent = '';
  resultEl.textContent = 'Playing...';
  messageEl.textContent = 'Java is choosing the computer move.';

  try {
    const response = await fetch('/api/play', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ choice })
    });

    if (!response.ok) throw new Error('The Java server could not process the move.');
    const data = await response.json();

    round++;
    if (data.result === 'win') playerScore++;
    if (data.result === 'lose') computerScore++;

    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
    roundEl.textContent = round;
    playerChoiceEl.textContent = emoji[data.playerChoice];
    computerChoiceEl.textContent = emoji[data.computerChoice];

    if (data.result === 'win') {
      resultEl.textContent = 'You Win! 🎉';
      messageEl.textContent = `${capitalize(data.playerChoice)} beats ${data.computerChoice}.`;
    } else if (data.result === 'lose') {
      resultEl.textContent = 'Computer Wins!';
      messageEl.textContent = `${capitalize(data.computerChoice)} beats ${data.playerChoice}.`;
    } else {
      resultEl.textContent = "It's a Draw!";
      messageEl.textContent = 'Both players chose the same move.';
    }
  } catch (error) {
    resultEl.textContent = 'Connection Error';
    messageEl.textContent = 'Make sure the Java server is running.';
    errorEl.textContent = error.message;
  }
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
