const initialTimer = document.querySelector(".initialTimer")
const timer = document.querySelector(".timer")
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
        timer.innerHTML = `Time remaining: ${timeLeft}`;
        timeLeft--;
    } else {
        timer.textContent = "Times Up!";
        endQuiz()
    }
}

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
    question(); //call question
});

const questionList = [ // questions as objects
    {
        question: "Commonly used Data types do NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed with _____.",
        choices: ["quotation marks", "curly brackets", "parenthesis", "square brackets"],
        answer: "curly brackets"
    },
    {
        question: "Arrays in JavaScript can be used to store",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotation marks", "parenthesis"],
        answer: "quotation marks"
    },
    {
        question: "A very useful tool used during developement and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log"
    },
    {
        question: "In ES6, JavaScript introduced 2 types of variables. What are they called?",
        choices: ["let and const", "var and let", "var and const", "none of the above"],
        answer: "let and const"
    },
    {
        question: "Which of the following is a correct way to declare an arrow function",
        choices: [
            "function sipJuice (juice, flavour) => ", 
            "var buyCoffee = '' => ", 
            "let haveBrunch = food, cost => ", 
            "const eatFood = foodChoice => "
        ],
        answer: "const eatFood = foodChoice => "
    }
]

let questionNumber = 0
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
        } else {
            questionNumber++ // next question in array
            choices.innerHTML = "" // clears last question
            ifWrong.textContent = "" //clears feedback
                if (questionNumber === questionList.length) {
                    return endQuiz()
                } else {
                    return question()
                }
        }
    });
}

const endQuiz = () => {
    clearInterval(countdownInterval) // stop timer
}

