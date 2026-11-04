// クイズの問題データ（answer は正解の choices のインデックス）
const quizData = [
  {
    question: '日本でいちばん標高が高い山はどれ？',
    choices: ['北岳', '富士山', '奥穂高岳', '槍ヶ岳'],
    answer: 1,
  },
  {
    question: 'うるう年ではない1年は何日？',
    choices: ['364日', '365日', '366日', '360日'],
    answer: 1,
  },
  {
    question: '1気圧のもとで、水が沸騰する温度はおよそ何℃？',
    choices: ['50℃', '80℃', '100℃', '120℃'],
    answer: 2,
  },
  {
    question: '太陽系の惑星で、いちばん大きいものはどれ？',
    choices: ['土星', '地球', '海王星', '木星'],
    answer: 3,
  },
  {
    question: '日本で一般的に「虹」は何色とされている？',
    choices: ['7色', '5色', '6色', '8色'],
    answer: 0,
  },
];

const progressEl = document.getElementById('progress');
const questionScreen = document.getElementById('question-screen');
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const feedbackEl = document.getElementById('feedback');
const nextButton = document.getElementById('next-button');
const resultScreen = document.getElementById('result-screen');
const resultScoreEl = document.getElementById('result-score');
const resultMessageEl = document.getElementById('result-message');
const retryButton = document.getElementById('retry-button');

let currentIndex = 0;
let score = 0;

// 問題を表示する
function showQuestion() {
  const quiz = quizData[currentIndex];

  progressEl.textContent = `${currentIndex + 1} / ${quizData.length} 問目`;
  questionEl.textContent = quiz.question;
  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';
  nextButton.hidden = true;
  choicesEl.replaceChildren();

  quiz.choices.forEach((choice, index) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-button';
    button.textContent = choice;
    button.addEventListener('click', () => checkAnswer(index));
    li.appendChild(button);
    choicesEl.appendChild(li);
  });
}

// 回答を判定してフィードバックを表示する
function checkAnswer(selectedIndex) {
  const quiz = quizData[currentIndex];
  const buttons = choicesEl.querySelectorAll('.choice-button');
  const isCorrect = selectedIndex === quiz.answer;

  buttons.forEach((button) => {
    button.disabled = true;
  });
  buttons[quiz.answer].classList.add('is-correct');

  if (isCorrect) {
    score++;
    feedbackEl.textContent = '⭕ 正解！';
    feedbackEl.classList.add('is-correct');
  } else {
    buttons[selectedIndex].classList.add('is-wrong');
    feedbackEl.textContent = `❌ 不正解… 正解は「${quiz.choices[quiz.answer]}」です。`;
    feedbackEl.classList.add('is-wrong');
  }

  const isLast = currentIndex === quizData.length - 1;
  nextButton.textContent = isLast ? '結果を見る' : '次の問題へ';
  nextButton.hidden = false;
  nextButton.focus();
}

// 結果を表示する
function showResult() {
  questionScreen.hidden = true;
  resultScreen.hidden = false;
  progressEl.textContent = '';

  resultScoreEl.textContent = `${quizData.length}問中${score}問正解`;

  if (score === quizData.length) {
    resultMessageEl.textContent = '全問正解！すばらしいです！';
  } else if (score >= quizData.length / 2) {
    resultMessageEl.textContent = 'よくできました！';
  } else {
    resultMessageEl.textContent = 'もう一度チャレンジしてみましょう！';
  }
}

// 最初からやり直す
function startQuiz() {
  currentIndex = 0;
  score = 0;
  resultScreen.hidden = true;
  questionScreen.hidden = false;
  showQuestion();
}

nextButton.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
});

retryButton.addEventListener('click', startQuiz);

startQuiz();
