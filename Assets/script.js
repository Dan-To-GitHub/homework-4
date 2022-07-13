// Page element
var startQuiz = document.getElementById("start-button");
var redoQuiz = document.getElementById("redo-button")
var timerEl = document.getElementById("timer-count");
var question = document.getElementById("question");
var options = document.querySelectorAll(".options");
var form = document.getElementById("form");
var submit = document.getElementById("submit");
var scores = document.getElementById("scores");

// Starting values
var currentQuestionIndex = 0;
var currentScore = 0;
var secondsLeft = 60;

// Questions array
var questions = [
    {title: "What is the notation for Javascript files?",
    options: [".html",".css",".js",".jv"],
    answer: ".js"},
    {title: "What symbol is used to represent an array?",
    options: ["()","[]","{}","<>"],
    answer: "[]"},
    {title: "Which of the following values represents a boolean?",
    options: ["true","3","'A'","None of the above"],
    answer: "true"},
    {title: "What symbol is used to call an ID in getElementById?",
    options: ["#",".","<>","None of the above"],
    answer: "None of the above"},
    {title: "Within a for loop, which of the following represents an addition assignment of 1 for the 'love' variable?",
    options: ["love += 1","love =+ 1","love ++ 1","Both A and C"],
    answer: "love += 1"}]

// Starts quiz

function init() {
    startQuiz.setAttribute("class", "hide");
    question.classList.remove("hide");
    options.forEach(function(item) {
        item.classList.remove("hide");
    });
    // display the questions from 1 to 5
    displayQuestions();
    // display options
    displayOptions();
    // start or restart the timer
    timer();
}

startQuiz.addEventListener("click", init);

// Timer
function timer() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = secondsLeft;
        
        if ((secondsLeft === 0) || (currentQuestionIndex === 5)) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to end quiz
            endQuiz();
        };
    }, 1000);
}
  
// Displays question
function displayQuestions() {
    question.textContent = questions[currentQuestionIndex].title;
}

// Displays options
function displayOptions() {
    options.forEach(function(option, i) {
        option.textContent = questions[currentQuestionIndex].options[i];
    });
}

// Click function
options.forEach(function(option) {
    option.addEventListener("click", function(event) {
        // Verify correct answer
        if (option.textContent === questions[currentQuestionIndex].answer) {
            currentScore += 20;
            console.log(currentScore);
        };
        // Current index to move to next question
        currentQuestionIndex += 1;
        // Display new question
        if (currentQuestionIndex < 5) {
            console.log(currentQuestionIndex)
            displayQuestions();
            displayOptions();
        } else {
            endQuiz();
        };
    });
});

// Ends quiz
function endQuiz() {
    question.textContent = "Final Score: " + currentScore + "%";
    // Hide options
    options.forEach(function(option) {
        option.setAttribute("class","options hide")
    });
    // Display form
    form.classList.remove("hide");
}

// Saves score
submit.addEventListener("click", function(event) {
    event.preventDefault();
    // Save to local storage
    var input = document.getElementById("initials").value;
    localStorage.setItem("initials", input);
    localStorage.setItem("score", currentScore);
    // Hide question and form
    question.setAttribute("class", "question hide")
    form.setAttribute("class", "hide")
    // Display scores
    scores.classList.remove("hide")
    initials = localStorage.getItem("initials");
    finalScore = localStorage.getItem("score");
    var result = document.createElement("li");
    result.setAttribute("style", "font-family: Gill Sans, sans-serif")
    result.textContent = "Initials: " + initials + " | Final Score: " + finalScore + "%";
    scores.appendChild(result);
    // Allow for retries
    redoQuiz.classList.remove("hide");
});

// Redo quiz
redoQuiz.addEventListener("click", function() {
    currentQuestionIndex = 0;
    currentScore = 0;
    secondsLeft = 60;
    scores.setAttribute("class", "hide")
    init();
})


