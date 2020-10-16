// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.getElementById('game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
})

// Listen for guess
guessBtn.addEventListener('click', function () {

    let guess = parseInt(guessInput.value);
    // Validate number
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check if won
    if (guess === winningNum) {
        // Set Message
        gameOver(true, `${winningNum} is correct, YOU WIN!!`, true);
        //Play Again
        guessBtn.value = 'Play Again';
        guessBtn.className += 'play-again';
    } else {
        // Wrong number
        guessesLeft -= 1;
        if (guessesLeft === 0) {
            // Game over - lost

            // Set Message
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`, true);
            //Play Again
            guessBtn.value = 'Play Again';
            guessBtn.className += 'play-again';
        } else {
            // Game continues - anwer wrong
            const indication = guess < winningNum ? 'Rather big' : 'Rather small'
            //Clear Input
            guessInput.value = '';
            gameOver(false, `${guess} is not correct : ${indication}. ${guessesLeft} guess(es) left`, false);

        }
    }
});

// Game over
function gameOver(won, msg, disabled) {
    let color = won ? 'green' : 'red'
    // Disable input
    guessInput.disabled = disabled;
    // Change border color
    guessInput.style.borderColor = color;
    // Set Message
    setMessage(msg, color);
}

// Get Winning Number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

// Set Message Function
function setMessage(msg, color) {
    message.style.color = color
    message.textContent = msg;
}