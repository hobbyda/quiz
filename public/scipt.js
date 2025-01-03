const GITHUB_TOKEN = 'your_github_token';
const REPO_OWNER = 'your_username';
const REPO_NAME = 'your_private_repo';
const FILE_PATH = 'quiz_data.csv';

let quizData = [];
let currentQuestion = 0;
let score = 0;
let wrongQuestions = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const resultEl = document.getElementById("result");

async function fetchQuizData() {
    const url = `https://api.github.com/repos/${hobbyda}/${quizdata}/contents/${quiz_multiple4.csv}`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3.raw'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch quiz data');
    }
    const csvData = await response.text();
    return parseCSV(csvData);
}

function parseCSV(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
        const values = line.split(',');
        return headers.reduce((obj, header, index) => {
            obj[header.trim()] = values[index].trim();
            return obj;
        }, {});
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        showResult();
        return;
    }

    const question = quizData[currentQuestion];
    questionEl.textContent = `${currentQuestion + 1}. ${question.question}`;

    const options = [question.option1, question.option2, question.option3, question.option4];
    shuffleArray(options);

    optionsEl.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => selectAnswer(option);
        optionsEl.appendChild(button);
    });
}

function selectAnswer(selectedOption) {
    const question = quizData[currentQuestion];
    if (selectedOption === question.answer) {
        score += 10;
    } else {
        score -= 5;
        wrongQuestions.push(currentQuestion);
    }
    scoreEl.textContent = `점수: ${score}`;
    currentQuestion++;
    loadQuestion();
}

function showResult() {
    questionEl.textContent = '퀴즈 종료!';
    optionsEl.innerHTML = '';
    resultEl.innerHTML = `최종 점수: ${score}<br><br>틀린 문제 해설:`;
    wrongQuestions.forEach(index => {
        const question = quizData[index];
        resultEl.innerHTML += `<br>${index + 1}번 문제: ${question.check}`;
    });
}

async function fetchQuizData() {
    const response = await fetch('/.netlify/functions/getQuizData');
    if (!response.ok) {
      throw new Error('Failed to fetch quiz data');
    }
    const csvData = await response.text();
    return parseCSV(csvData);
  }
  

initQuiz();
