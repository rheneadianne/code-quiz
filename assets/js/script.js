// variables
const questionWrap = $(".question-wrap")
const start = $(".start")
const intro = $(".intro")
const questionTitle = document.querySelector(".question")
const choices = document.querySelector(".choices ul")
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
    questionWrap.delay(4700).slideDown() //show question and timer
    countdown()
    question()
});

// questions as objects -- proof of concept
const questionList = [
    {
        question: "Commonly used Data types do NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    }
]

const question = () => {
    let questionNumber = 0
    let currentQuestion = questionList[questionNumber] // gets question object from array
    questionTitle.textContent = currentQuestion.question // updates question title
    for (i = 0; i < currentQuestion.choices.length; i++) {
        const makeChoices = document.createElement("li")
        makeChoices.textContent = currentQuestion.choices[i]
        choices.appendChild(makeChoices)
    }
}

