// variables
const questionWrap = $(".question-wrap")
const start = $(".start")
const intro = $(".intro")
const questionTitle = document.querySelector(".question")
const choices = document.querySelector(".choices ul")
const initialTimer = document.querySelector(".initialTimer")
const timer = document.querySelector(".timer")
let timeLeft = 124; // 2 mins to complete + 4 seconds to account for delay

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
    countdown() //start timer
    question() //call question
});

// questions as objects
const questionList = [
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

    for (i = 0; i < currentQuestion.choices.length; i++) { // creates choices
        const makeChoices = document.createElement("li");
        makeChoices.setAttribute("class", "choice");
        makeChoices.textContent = currentQuestion.choices[i];
        choices.appendChild(makeChoices);
    }

    $(".choice").click(function(){
        if (this.textContent !== questionList[questionNumber].answer) {
            timeLeft -= 10 // penalty for wrong answer
            if (timeLeft < 0) { // to avoid negative time
                timeLeft = 0
            }
        } else {
            questionNumber++ // next question in array
            choices.innerHTML = "" // clears last question
                if (questionNumber === questionList.length) {
                    endQuiz()
                } else {
                    question()
                }
        }
    });
}

