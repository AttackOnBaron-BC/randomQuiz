const questions = [
  {
    number: 1,
    question: "What is the command we use to create a new file?",
    choices: ["mkdir", "touch", "ls"],
    correct: 0
  },
  {
    number: 2,
    question: "What is an HTML semantic element?",
    choices: ["A semantic element clearly describes its meaning to both the browser and the developer.", "Semantic elements are outdated and are no longer used in HTML.", "Semantic elements, like <div>, hold the important content together so it's easy to understand."],
    correct: 0
  },
  {
    number: 3,
    question: "What is the purpose of the alt attribute for images?",
    choices: ["To provide context for the images in the cases where they are not observable, either due to an accessibility challenge or a broken link.", "To prevent search engines from indexing the image.", "To make the image load faster. "],
    correct: 0
  },
  {
    number: 4,
    question: "What is the purpose of the <head> element in HTML?",
    choices: ["The <head> element contains metadata about the document, such as its title and links to its stylesheets.", "The <head> element is used to define the main content of the document.", "The <head> element is used to define the footer of the document."],
    correct: 0
  },
  
  {
    number: 5,
    question: "Which SQL command is used to retrieve data from a database?",
    choices: ["GET", "FETCH", "SELECT"],
    correct: 2
  },
  {
    number: 6,
    question: "In C++, which keyword is used to declare a constant variable?",
    choices: ["static", "final", "const"],
    correct: 2
  },
  {
    number: 7,
    question: "What does CSS stand for?",
    choices: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Systems"],
    correct: 1
  },
  {
    number: 8,
    question: "Which data structure follows the Last-In-First-Out (LIFO) principle?",
    choices: ["Queue", "Stack", "Linked List"],
    correct: 1
  },
  {
    number: 9,
    question: "In Git, which command is used to create a new branch?",
    choices: ["git branch", "git checkout", "git commit"],
    correct: 0
  },
  {
    number: 10,
    question: "What is the correct way to comment a single line in Java?",
    choices: ["// Comment", "/* Comment */", "# Comment"],
    correct: 0
  },
  {
    number: 11,
    question: "Which programming language is often used for developing Android apps?",
    choices: ["Swift", "Kotlin", "Objective-C"],
    correct: 1
  },
  {
    number: 12,
    question: "What does API stand for?",
    choices: ["Application Programming Interface", "Advanced Programming Integration", "Automated Program Interface"],
    correct: 0
  },
  {
    number: 13,
    question: "In Python, which method is used to add an element to the end of a list?",
    choices: ["append()", "push()", "add()"],
    correct: 0
  },
  {
    number: 14,
    question: "Which symbol is used to access properties of an object in JavaScript?",
    choices: ["->", ".", "::"],
    correct: 1
  },
  {
    number: 15,
    question: "What is the purpose of the 'npm' command in Node.js?",
    choices: ["Node Package Manager", "New Project Module", "Node Process Monitor"],
    correct: 0
  },
    {
    number: 16,
    question: "Which HTTP method is typically used to submit form data to a server?",
    choices: ["GET", "POST", "PUT"],
    correct: 1
    },
    {
    number: 17,
    question: "In Ruby, which keyword is used to define a class method?",
    choices: ["static", "class", "self"],
    correct: 2
    },
    {
    number: 18,
    question: "What does JSON stand for?",
    choices: ["JavaScript Object Notation", "Java Standard Object Notation", "JavaScript Optimized Network"],
    correct: 0
    },
    {
    number: 19,
    question: "Which programming paradigm does functional programming belong to?",
    choices: ["Imperative", "Declarative", "Procedural"],
    correct: 1
    },
    {
    number: 20,
    question: "In SQL, which clause is used to filter the results of a SELECT statement?",
    choices: ["FILTER", "WHERE", "HAVING"],
    correct: 1
    }
];

var arr = [];
function randomQ(questionsLength){
  while(arr.length < questionsLength){
      var r = Math.floor(Math.random() * 5);
      if(arr.indexOf(r) === -1) arr.push(r);
  }
}
console.log(questions.length);

function questionList(){
    randomQ(5);

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
    if(selectedOption){
      ans.push(selectedOption.value);
    }    
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
