// variables
const question = $(".question-wrap")
const start = $(".start")
const intro = $(".intro")
const questionTitle = $(".question")
const choices = $(".choices")
const initialTimer = document.querySelector(".initialTimer")
const timer = document.querySelector(".timer")

// hides intro, countsdown 3 seconds, then shows first question
start.click(function() {
    
// countdown for 4 seconds before quiz begins
const firstCountdown = () => {
    let initialTime = 3;
    let firstInterval = setInterval(function () {
        if (initialTime !== 0) {
            initialTimer.innerHTML = initialTime;
            initialTime--;
        } else {
        initialTimer.textContent = "GO!";
        clearInterval(firstInterval)
        }
    }, 1000);
}

const countdown = () => {
    let timeLeft = 124; // extra 4 seconds for delay
    let countdownInterval = setInterval(function () {
        if (timeLeft !== 0) {
            timer.innerHTML = `Time remaining: ${timeLeft}`;
            timeLeft--;
        } else {
            timer.textContent = "Times Up!";
            clearInterval(countdownInterval)
            endQuiz()
        }
    }, 1000);
}
    firstCountdown()
    intro.delay(4000).fadeOut(); // hide intro
    question.delay(4700).slideDown() //show question and timer
    countdown()
});



