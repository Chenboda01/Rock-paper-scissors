// ===== Emoji map =====
const EMOJI = { r: '🪨', p: '📄', s: '✂️' };
const CHOICES = ['r', 'p', 's'];

// ===== DOM refs =====
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const playerChoiceIcon = document.getElementById('player-choice-icon');
const computerChoiceIcon = document.getElementById('computer-choice-icon');
const outcomeEl = document.getElementById('outcome');
const moveBtns = document.querySelectorAll('.move-btn');
const resetBtn = document.getElementById('reset-btn');

// ===== State =====
let playerScore = 0;
let computerScore = 0;
let locked = false;

// ===== Copy buttons =====
document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        const cmd = btn.dataset.cmd;
        const text = document.getElementById(`cmd-${cmd}`).textContent;
        navigator.clipboard.writeText(text).then(() => {
            btn.textContent = 'Copied!';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.textContent = 'Copy';
                btn.classList.remove('copied');
            }, 1500);
        }).catch(() => {
            // fallback for older browsers
            const ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            btn.textContent = 'Copied!';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.textContent = 'Copy';
                btn.classList.remove('copied');
            }, 1500);
        });
    });
});

// ===== Game logic =====
function computerMove() {
    return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function determineWinner(player, computer) {
    if (player === computer) return 'tie';
    if (
        (player === 'r' && computer === 's') ||
        (player === 's' && computer === 'p') ||
        (player === 'p' && computer === 'r')
    ) {
        return 'win';
    }
    return 'lose';
}

function animateIcon(el) {
    el.classList.remove('pop');
    // force reflow to restart animation
    void el.offsetWidth;
    el.classList.add('pop');
}

function playRound(player) {
    if (locked) return;

    locked = true;
    moveBtns.forEach((btn) => (btn.disabled = true));

    const computer = computerMove();

    // Show choices with animation
    playerChoiceIcon.textContent = EMOJI[player];
    computerChoiceIcon.textContent = EMOJI[computer];
    animateIcon(playerChoiceIcon);
    animateIcon(computerChoiceIcon);

    const result = determineWinner(player, computer);

    // Update score and outcome
    outcomeEl.className = 'outcome';

    if (result === 'win') {
        playerScore++;
        outcomeEl.textContent = '🎉 You win!';
        outcomeEl.classList.add('win');
    } else if (result === 'lose') {
        computerScore++;
        outcomeEl.textContent = '😵 You lose!';
        outcomeEl.classList.add('lose');
    } else {
        outcomeEl.textContent = '🤝 Tie!';
        outcomeEl.classList.add('tie');
    }

    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;

    // Unlock after short delay
    setTimeout(() => {
        locked = false;
        moveBtns.forEach((btn) => (btn.disabled = false));
    }, 600);
}

// ===== Event listeners =====
moveBtns.forEach((btn) => {
    btn.addEventListener('click', () => playRound(btn.dataset.move));
});

resetBtn.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    playerChoiceIcon.textContent = '—';
    computerChoiceIcon.textContent = '—';
    outcomeEl.textContent = 'Make your move!';
    outcomeEl.className = 'outcome';
});
