// Timers
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

// Questions
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
const outro = document.querySelector(".finalMessage")
const tryAgain = document.querySelector(".tryAgain")
const quizTaker = $(".quizTaker")
let takerSubmit = $(".quizTakerSubmit")
let scoreList = JSON.parse(window.localStorage.getItem("scoreList")) || [];

const endQuiz = () => {
    let highestStreak = Math.max(...questionStreakArray) // calculates highest streak
    let finalScore = (timeLeft + 1) * highestStreak // calculates final score
    clearInterval(countdownInterval) // stop timer
    questionTitle.textContent = "" // clears last question title
    choices.innerHTML = "" // clears last question
    if (highestStreak !== 0 && timeLeft !== 0) { //various messages depending on streak and time
        outro.textContent = `Congratulations! Your highest streak was ${highestStreak}, which makes your final score ${finalScore}! Great job!`
        tryAgain.innerHTML = "Want to see if you can get a higher score? Click here!";
    } else if (highestStreak !==0 && timeLeft === 0) {
        outro.textContent = `Your highest streak was ${highestStreak} but you ran out of time. That means your final score is ${finalScore}.`
        tryAgain.innerHTML = "Don't give up! If you want to try again, click here!";
    } else {
        outro.textContent = `Your highest streak was ${highestStreak} and you ran out of time. That means your final score is ${finalScore}.`
        tryAgain.textContent = "Want to try again? Click here!";
    }

    quizTaker.show() //shows quiz taker input field

// Saves Score to Local Storage
    takerSubmit.click(function(){ 
        let takerInput = document.querySelector(".quizTakerInput").value.trim()
        let addScore = { // adds score once name is submited
            name: takerInput,
            score: finalScore
        }
        saveScore = () => {
            scoreList.push(addScore);
            scoreList.sort((a,b) => b.score - a.score)
            window.localStorage.setItem("scoreList", JSON.stringify(scoreList));
        }
        saveScore()
    })
}

//Get Scores from Local storage and add to code
const printedScoreList = document.querySelector(".scores")
const printScoreList = () => {
    for (i = 0; i < scoreList.length; i++) { // creates list elements based on score list
        const makeScores = document.createElement("li");
        makeScores.setAttribute("class", "scoreItem");
        makeScores.textContent = scoreList[i].name + ": " + scoreList[i].score;
        printedScoreList.appendChild(makeScores);
    }
}

printScoreList()

$(".viewScores").click(function(){
    $(".scores").fadeToggle()
})

$(".clearStorage").click(function(){
    localStorage.clear(); // clear local storage
    printedScoreList.innerHTML = "" // clears on page
})