//list questions for the quiz
const Questions = [{
    q: "What is an array?",
    a: [{ text: "A loop", isCorrect: false },
    { text: "An index", isCorrect: false },
    { text: "a collection of items stored at contiguous memory locations", isCorrect: true },
    { text: "a sequence of nodes", isCorrect: false }
    ]

},
{
    q: "What is a data structure?",
    a: [{ text: "A set of tags that define a specific part of a web page", isCorrect: false, isSelected: false },
    { text: "Items that are stored that are of the same type.", isCorrect: false },
    { text: "Nested web pages basically mean a webpage within a webpage", isCorrect: false },
    { text: "a storage format that defines the way data is stored, organized, and manipulated", isCorrect: true }
    ]

},
{
    q: "What is an element in HTML?",
    a: [{ text: " special characters used to represent characters that cannot be typed on a keyboard", isCorrect: false },
    { text: "helps in creating a well-defined template for an HTML webpage that is both consistent as well as portable", isCorrect: false },
    { text: "A set of tags that define a specific part of a web page", isCorrect: true },
    { text: "An empty sequence of space characters is called the white space in HTML", isCorrect: false }
    ]

}

]

let currQuestion = 0
let score = 0

function loadQues() {
    const question = document.getElementById("ques")
    const opt = document.getElementById("opt")

    question.textContent = Questions[currQuestion].q;
    opt.innerHTML = ""

    for (let i = 0; i < Questions[currQuestion].a.length; i++) {
        const choicesdiv = document.createElement("div");
        const choice = document.createElement("input");
        const choiceLabel = document.createElement("label");

        choice.type = "radio";
        choice.name = "answer";
        choice.value = i;

        choiceLabel.textContent = Questions[currQuestion].a[i].text;

        choicesdiv.appendChild(choice);
        choicesdiv.appendChild(choiceLabel);
        opt.appendChild(choicesdiv);
    }
}

loadQues();

function loadScore() {
    const totalScore = document.getElementById("score")
    totalScore.textContent = `You scored ${score} out of ${Questions.length}`
}


function nextQuestion() {
    if (currQuestion < Questions.length - 1) {
        currQuestion++;
        loadQues();
    } else {
        document.getElementById("opt").remove()
        document.getElementById("ques").remove()
        document.getElementById("btn").remove()
        loadScore();
    }
}

function checkAns() {
    const selectedAns = parseInt(document.querySelector('input[name="answer"]:checked').value);

    if (Questions[currQuestion].a[selectedAns].isCorrect) {
        score++;
        console.log("Correct")
        nextQuestion();
    } else {
        nextQuestion();
    }
}

//could not get the "saved score" and typing user initials to work for some reaon.
//I started getting a little confused 

var countdownEl = document.querySelector('#countdown');
var scoreAreaEl = document.querySelector('#scoreArea');
var inNameEl = document.querySelector('#inName');
var buttonDivEl = document.querySelector('#saveButton');
var highScoreEl = document.querySelector('#highScores')

//variables 
var timer = 75;
var runningTimer;
var displayScore = 0;
var questionIndex = 0;

//adjusting time and points based on if answer is correct or wrong 
function correctInc(answer) {
    createText(answer);
    if (answer === "true") {
        score += 5;
    } else {
        timer -= 10;
    }
}

// timer function starts at 75 seconds
function startTimer() {
    countdownEl.innerHTML = "Time:" + timer;
    if (timer <= 0) {
        gameOver();
    } else {
        timer -= 1;
        runningTimer = setTimeout(startTimer, 1000);
    }

}

// game over function
function gameOver() {
    clearInterval(runningTimer);
    countdownEl.innerHTML = "Finished";
    displayScore();
    savedScore();
}

// once all questions have been answered give me a final score 
function displayScore() {
    questionConEl.replaceWith(scorePageEl);
    scoreAreaEl.innerText = "Final Score:" + score;
    
    // Create an input element for initials 
    initTextEl = document.createElement("input");
    initTextEl.setAttribute("id", "initails-input");
    initTextEl.setAttribute("type", "text");
    initTextEl.setAttribute("name", "iniatials");
    initTextEl.setAttribute("placeholder", "Enter Initials here");

    inNameEl.appendChild(initTextEl);


    // create save button element
    saveButtonEl = document.createElement("button");
    saveButtonEl.setAttribute("id", "save-btn");
    saveButtonEl.setAttribute("class", "save-btn");
    saveButtonEl.setAttribute("type", "submit");
    saveButtonEl.textContent = "Save Score";

    inNameEl.appendChild(saveButtonEl);

    inNameEl.addEventListener("submit", viewHighScores);
}

function viewHighScores(e) {
    e.preventDefault();
    var name = document.querySelector("#initails-input").value;
    savedInit(name);

    scorePageEl.replaceWith(highScoreEl)
    loadSaveScores();

}


//function to save task in local storage 
var savedScore = function () {
    localStorage.setItem("score", JSON.stringify(score));
}
var savedInit = function (initails) {
    localStorage.setItem("initails", JSON.stringify(initails));
}

// gets tasks from local storage and load them
function loadSaveScores() {
    // get tasks items from local stroage
    var savedScore = localStorage.getItem("score");
    var savedInit = localStorage.getItem("initails");

    savedScore = JSON.parse(savedScore);
    savedInit = JSON.parse(savedInit);

    document.getElementById("highScores").innerHTML = savedInit + " - " + savedScore;

}


//event listeners

startButtonEl.addEventListener("click", startQuiz);
