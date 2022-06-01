// variables
const question = $(".question-wrap")
const start = $(".start")
const intro = $(".intro")
const questionTitle = $(".question")
const choices = $(".choices")
const initialTimer = document.querySelector(".initialTimer")

// hides intro, countsdown 3 seconds, then shows first question
start.click(function() {
    
// countdown for 3 seconds before quiz begins
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
    firstCountdown()
    intro.delay(4000).fadeOut(); // hide intro
    question.delay(4700).slideDown() //show question and timer
});



