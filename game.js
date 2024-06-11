const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressBarText = document.getElementById("progressBarText");
const progressBarFull = document.getElementById("progressBarFull");
const progressBar = document.getElementById("progressBar");
const scoreText = document.getElementById("score");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple")
.then((res) =>{
    return res.json();
})
.then((loadedQuestions) => {
    questions = loadedQuestions.results.map((loadedQuestion) => {
        const formattedQuestion = 
        {
            question : loadedQuestion.question,
        }

        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
        answerChoices.splice(
            formattedQuestion.answer - 1,
            0,
            loadedQuestion.correct_answer
        );

        answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index + 1)] = choice;
        });

        return formattedQuestion;
    });
    console.log(questions)
    startGame();
})
.catch((err) => {
    console.error(err);
})

// CONSTANTS

const CORRECT_BONUS = 10;
let MAX_QUESTIONS;

const startGame = () => {  // For the intial values .
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    MAX_QUESTIONS = availableQuestions.length;
    localStorage.setItem("maxvalue", MAX_QUESTIONS * 10);
    getNewQuestion();
}

const getNewQuestion = () =>  // I t is function used for the purpose of changing innertext of the elements .
{
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS)
    {
        localStorage.setItem("mostRecentScore", score);
        window.location.assign("/end.html");
    }
    questionCounter++;
    progressBarText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${ (questionCounter / MAX_QUESTIONS) * 100 }%`;
    progressBarFull.innerText = `${ Math.floor((questionCounter / MAX_QUESTIONS) * 100) }%  `;  

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    // console.log(availableQuestions[questionIndex]);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);  // Deleting the question 

    acceptingAnswers = true;
    loader.classList.add("hidden");
    game.classList.remove("hidden");
}

choices.forEach(choice => {  // when user clicks on any choice then going to happen .
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) {
            return;
        }
        // console.log(e.target);
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        selectedChoice.parentElement.classList.add(classToApply);

        if(classToApply == "correct")
        {
            incrementScore(CORRECT_BONUS);
        }

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1250);
    })
});

const incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}