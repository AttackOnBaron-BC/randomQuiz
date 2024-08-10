const questions = [
  {
    number: 1,
    question: "What is the capital of United Kingdom?",
    choices: ["London", "Paris", "Nairobi"],
    correct: 0
  },
  {
    number: 2,
    question: "How many days are there in a week?",
    choices: ["Five", "Three", "Seven"],
    correct: 2
  },
  {
    number: 3,
    question: "What is the closest planet to the sun?",
    choices: ["Earth", "Mercury", "Saturn"],
    correct: 1
  },
];

var arr = [];
function randomQ(questionsLength){
  while(arr.length < questionsLength){
      var r = Math.floor(Math.random() * 3);
      if(arr.indexOf(r) === -1) arr.push(r);
  }
}

var qs = {};
function questionList(){
    randomQ(questions.length);

    var list = [];
    for (let a of arr) {
      if(a < questions.length)
        list.push(questions[a]);
    }
    localStorage.setItem("questionList", JSON.stringify(list));    
}

const questionsList = JSON.parse(localStorage.getItem("questionList"));

const answers = [];
function showQuestions()
{

  const quizDiv = document.getElementById('quiz');
  console.log(questions);
  questionsList.forEach((q, index) => {
      console.log(q);
      const questionDiv = document.createElement('div');
      questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
      const newElement = document.createElement('questionNumber');
      newElement.textContent = q.number
      console.log(q.number);
      answers.push(q.number);
      q.choices.forEach((opt) => {      
        const optionInput = document.createElement('input');
        optionInput.type = 'radio';
        optionInput.name = `question${index}`;
        optionInput.setAttribute("questionnumber", q.number);
        console.log(opt);
        optionInput.value = opt;
        questionDiv.appendChild(optionInput);
        const optionLabel = document.createElement('label');
        optionLabel.innerHTML = opt;
        questionDiv.appendChild(optionLabel);
        questionDiv.appendChild(document.createElement('br'));
      });
      quizDiv.appendChild(questionDiv);
    });
}

let score = 0;
let ans = [];
function submitQuiz() {
  
  console.log(questionsList.length);

  for(let i = 0; i < questionsList.length; i++){
    const selectedOption = document.querySelector(`input[name="question${i}"]:checked`);
    ans.push(selectedOption.value);
  }
  checkAnswer(ans);
}

let count = 0;
function checkAnswer(answers)
{
  for(let i = 0; i < answers.length; i++)
  {
    if(answers[i] === questionsList[i].choices[questionsList[i].correct])
    {
      score++;
    }
  }
  alert(`You scored ${score} out of ${questionsList.length}`);
}

questionList();
showQuestions();
