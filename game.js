let question = document.getElementById("question");
let options = document.getElementsByClassName("choice");
let missedCount = document.getElementById("missed");
let progressBar = document.getElementById("progress");

let availableQuestions = JSON.parse(localStorage.getItem("AvailableQuestions"));
let currentQuestion = null;
let score = 0;
let questionsLeft = 10;
let missed = 0;


getQuestion = () => {
    let randomIndex = Math.floor(Math.random() * questionsLeft);
    currentQuestion = availableQuestions.results[randomIndex];
    availableQuestions.results.splice(availableQuestions.results.indexOf(currentQuestion), 1);
    console.log(availableQuestions);
    question.innerHTML = currentQuestion.question;
    let answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    let uniques = chance.unique(chance.natural, 4, {min: 0, max: 3});
    questionsLeft--;
    for (let i = 0; i < 4; i++){
        options[i].innerHTML = answers[uniques[i]];
    }
    if(availableQuestions.results.length === 0){
        localStorage.setItem("Score", score.toString());
        window.location.replace("./end.html");
    }

}

getQuestion();

checkAnswers = (event) => {
    let choice = document.getElementById(`choice${event.dataset.option}`)
    if (event.innerHTML === currentQuestion.correct_answer){
        choice.classList.add("correct");
        score++;
    }
    else{
        choice.classList.add("wrong");
        missed++;
        missedCount.innerHTML = missed;
    }
    progressBar.style.width = `${(10- questionsLeft) * 10}%`;
    console.log( `${(10 - questionsLeft) * 10}%`);
    setTimeout(function(){
        choice.classList.remove("wrong");
        choice.classList.remove("correct");
        getQuestion();
    }, 1000);
}
