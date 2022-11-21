const quizData = [
    {
        question: "Who is the present president of the USA?",
        a: "Donald Trump",
        b: "Barack Obama",
        c: "Joe Biden",
        d: "George W. Bush",
        correct: "opt3"
    },
    {
        question: "Which is the longest river of the world?",
        a: "Nile",
        b: "Amazon",
        c: "Mississippi river",
        d: "Jordan river",
        correct: "opt1"
    },
    {
        question: "Who was the winner of 2018 FIFA World Cup?",
        a: "Argentina",
        b: "France",
        c: "Germany",
        d: "Brazil",
        correct: "opt2"
    },
    {
        question: "Who built Eiffel Tower?",
        a: "Alexander Eiffel",
        b: "Nelson Eiffel",
        c: "Robert Eiffel",
        d: "William Eiffel",
        correct: "opt1"
    },
    {
        question: "Which is the highest mountain peak of the world?",
        a: "Mt. Everest",
        b: "Mt. Kanchanjungha",
        c: "Mt. K2",
        d: "Mt. Killimanjaro",
        correct: "opt1"
    },
    {
        question: "Who is the present CEO of Google?",
        a: "Larry Page",
        b: "Tim Cook",
        c: "Satya Nadella",
        d: "Sundar Pichai",
        correct: "opt4"
    }
];

const question = document.getElementById("questionText");
const optionA = document.getElementById("opt1");
const optionB = document.getElementById("opt2");
const optionC = document.getElementById("opt3");
const optionD = document.getElementById("opt4");
const optionSelect = document.querySelectorAll("li");
const submitBtn = document.querySelector("button");
const nextBtn = document.getElementById("nextBtn");
const againBtn = document.getElementById("againBtn");

const questionCount = document.getElementById("questionCount");
let currentQuestionNum = 0;
let score = 0;
var userAnswer;  //This gloabally scopes the userAnswer variable for use in different function

loadQuiz();

function loadQuiz() {

    question.innerHTML = quizData[currentQuestionNum].question;
    optionA.innerHTML = quizData[currentQuestionNum].a;
    optionB.innerHTML = quizData[currentQuestionNum].b;
    optionC.innerHTML = quizData[currentQuestionNum].c;
    optionD.innerHTML = quizData[currentQuestionNum].d;
    displayQustionCount();
}

optionSelect.forEach(activateListItem)

function activateListItem(listItem) {
    listItem.addEventListener("click", (event) => {
        deactivateListItems();
        userAnswer = generateListItemID(event);
        listItem.classList.add("active");
    })
}

function deactivateListItems() {
    optionSelect.forEach((listItem) => {
        listItem.classList.remove("active");
    })
}

submitBtn.addEventListener("click", submitAnswer = () => {
    checkAnswer();
})

function nextQuestion() {
    currentQuestionNum++;
    loadQuiz();
    deactivateListItems();
}

function checkAnswer() {
    let correctAnswer;
    // console.log("userAnswer = " + userAnswer);
    correctAnswer = quizData[currentQuestionNum].correct;
    // console.log(correctAnswer);

    if (`${userAnswer}` == `${correctAnswer}`) {
        score++;
        let correctAns = document.getElementById(userAnswer);
        correctAns.classList.add("correct");
        // console.log(score);
    }

    else {
        let correctAns = document.getElementById(correctAnswer);
        correctAns.classList.add("correct");

        let incorrectAns = document.getElementById(userAnswer);
        incorrectAns.classList.add("incorrect");
        // console.log(score);
    }
    swapButtonToNext();

    if (currentQuestionNum + 1 == quizData.length) {
        showScore();
    }
}

function generateListItemID(event) {
    let userAnswer;
    userAnswer = event.target.id;
    return userAnswer;
}

function swapButtonToNext() {
    submitBtn.style.display = "none";
    nextBtn.style.display = "flex";
    nextBtn.style.justifyContent = "center";
    nextBtn.style.alignItems = "center";

    if (currentQuestionNum + 1 == quizData.length) {
        swapButtonToAgain();
    }
}

function swapButtonToSubmit() {
    nextBtn.style.display = "none";
    submitBtn.style.display = "flex";
    nextBtn.style.justifyContent = "center";
    nextBtn.style.alignItems = "center";
    againBtn.style.display = "none";
}

function swapButtonToAgain() {
    nextBtn.style.display = "none";
    submitBtn.style.display = "none";
    againBtn.style.display = "flex";
    againBtn.style.justifyContent = "center";
    againBtn.style.alignItems = "center";
}

const nextQues = document.querySelector("#nextBtn");

nextQues.addEventListener("click", () => {
    swapButtonToSubmit();
    nextQuestion();
    optionSelect.forEach(removeClasses);
});

function removeClasses(listItem) {
    listItem.classList.remove("active");
    listItem.classList.remove("correct");
    listItem.classList.remove("incorrect");
}

function displayQustionCount() {
    questionCount.innerHTML = `${currentQuestionNum + 1} of ${quizData.length} Questions`;
}

const playAgain = document.getElementById("againBtn");

playAgain.addEventListener("click", newGame = () => {
    currentQuestionNum = 0;
    optionSelect.forEach((listItem) => {
        listItem.classList.remove("active");
        listItem.classList.remove("correct");
        listItem.classList.remove("incorrect");
    })
    swapButtonToSubmit();
    loadQuiz();
})

function showScore() {
    questionCount.innerHTML = `Your score is ${score} / ${quizData.length}`;
}