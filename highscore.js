const highScoreList = document.getElementById("highScoreList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoreList.innerHTML += 
    highScores.map((score) => {
        return `<tr>
                    <td>
                        ${score.name}
                    </td>
                    <td>
                        ${score.score}%
                    </td>
                </tr>`
    }).join("");
 // Join used to convert it into string , it seperate array element with specified string value
