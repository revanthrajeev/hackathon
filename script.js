const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const nextBtn = document.querySelector('.next-btn');
const optionsList = document.querySelector('.option-list');

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
};

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
};

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
};

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
};

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
};

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);
        questionNumb++;
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
        
        // Remove any existing explanation when moving to next question
        const existingExplanation = document.querySelector('.explanation-text');
        if (existingExplanation) {
            existingExplanation.remove();
        }
    } else {
        showResultBox();
    }
};

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;
    
    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
                    <div class="option"><span>${questions[index].options[1]}</span></div>
                    <div class="option"><span>${questions[index].options[2]}</span></div>
                    <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionsList.innerHTML = optionTag;
    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionsList.children.length;
    let explanation = questions[questionCount].explanation;

    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    } else {
        answer.classList.add('incorrect');

        // if answer is incorrect, show auto selected correct answer
        for (let i = 0; i < allOptions; i++) {
            if (optionsList.children[i].textContent == correctAnswer) {
                optionsList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    // Show explanation
    showExplanation(explanation);

    // if user has selected, disabled all options
    for (let i = 0; i < allOptions; i++) {
        optionsList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add("active");
}

function showExplanation(explanation) {
    // Remove any existing explanation
    const existingExplanation = document.querySelector('.explanation-text');
    if (existingExplanation) {
        existingExplanation.remove();
    }
    
    // Create and append explanation element inside scrollable quiz-content
    const explanationElement = document.createElement('div');
    explanationElement.className = 'explanation-text';
    explanationElement.innerHTML = `<p><strong>Explanation:</strong> ${explanation}</p>`;
    document.querySelector('.quiz-content').appendChild(explanationElement);
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
} 

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');
    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255,255,255,.1) 0deg)`;
        progressValue.textContent = `${progressStartValue}%`;
        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}
