const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const maxvalue = localStorage.getItem("maxvalue");

finalScore.innerText = mostRecentScore;

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);

username.addEventListener("keyup", () => {
    console.log(username.value);
    saveScoreBtn.disabled = !username.value;

});

const saveHighScore = (e) => {
    console.log("Clicked saved button");
    e.preventDefault();

    const score = 
    {
        score : Math.floor((mostRecentScore / maxvalue) * 100),
        name : username.value
    }

    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5); // Delete score greater than 5 means, consider only first 5 scores
    console.log(highScores);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/highscore.html");
}