// TIMERS
const initialTimer = document.querySelector(".initialTimer")
const timer = document.querySelector(".timeLeft")
let timeLeft = 124; // 2 mins to complete + 4 seconds to account for delay

const firstCountdown = () => { // countdown to quiz
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

const quizCountdown = () => { // quiz timer function
    if (timeLeft !== 0) {
        timer.innerHTML = timeLeft;
        timeLeft--;
    } else {
        timer.textContent = "Times Up!";
        endQuiz()
    }
}

// QUESTIONS
const questionWrap = $(".question-wrap")
const start = $(".start")
const intro = $(".intro")
const questionTitle = document.querySelector(".question")
const choices = document.querySelector(".choices ul")

start.click(function() { // countdown for 4 seconds before quiz begins
    firstCountdown(); //counts down 4 seconds
    intro.delay(4000).fadeOut(); // hide intro
    questionWrap.delay(4700).slideDown(); //show question and timer
    countdownInterval = setInterval(quizCountdown, 1000); // start timer
    question(); // call question
});

let questionNumber = 0
let questionStreak = 0 // calculates how many right answers in a row
let questionStreakArray = []

const question = () => {
    let currentQuestion = questionList[questionNumber] // gets question object from array
    questionTitle.textContent = currentQuestion.question // updates question title

    for (i = 0; i < currentQuestion.choices.length; i++) { // creates choices from questionList.choice array
        const makeChoices = document.createElement("li");
        makeChoices.setAttribute("class", "choice");
        makeChoices.textContent = currentQuestion.choices[i];
        choices.appendChild(makeChoices);
    }

    $(".choice").click(function(){
        let ifWrong = document.querySelector(".ifWrong p")
        if (this.textContent !== questionList[questionNumber].answer) {
            timeLeft -= 10 // penalty for wrong answer
            if (timeLeft < 0) { // to avoid negative time
                timeLeft = 0
            }
            ifWrong.textContent = "Try Again!"
            questionStreak = 0 // resets streak if wrong
            questionStreakArray.push(questionStreak); //adds to streak array
            console.log(questionStreakArray)
        } else {
            questionStreak++ // adds to streak if right
            questionNumber++ // next question in array
            questionStreakArray.push(questionStreak);
            choices.innerHTML = "" // clears last question
            ifWrong.textContent = "" //clears feedback
                if (questionNumber === questionList.length) {
                    return endQuiz()
                } else {
                    return question()
                };
        }
    });
}

// Ending Quiz and Calculating HighScore
let finalScore = questionStreak * timer.textContent

const endQuiz = () => {
    clearInterval(countdownInterval) // stop timer
    console.log(timer.textContent)
    questionTitle.textContent = "" // clears last question title
    choices.innerHTML = "" // clears last question
}

