const questions = [
  {
    number: 1,
    question: "What is the command we use to create a new file?",
    choices: ["mkdir", "touch", "ls"],
    correct: 1 // Correct answer is "touch"
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

function randomQ(selectedAmount) {
  let arr = [];
  while (arr.length < selectedAmount) {
    const r = Math.floor(Math.random() * questions.length); // Generate random index
    if (arr.indexOf(r) === -1) arr.push(r); // Ensure no duplicate questions
  }
  return arr; // Return array of random question indices
}

function generateQuiz() {
  const selectedAmount = parseInt(document.getElementById("questionAmount").value); // Get number of questions selected
  const randomQuestions = randomQ(selectedAmount); // Get random questions based on selection

  let quizQuestions = randomQuestions.map(index => questions[index]); // Map selected questions
  localStorage.setItem("questionList", JSON.stringify(quizQuestions)); // Store questions in localStorage

  showQuestions(); // Call function to display questions in the modal
  const quizModal = new bootstrap.Modal(document.getElementById('quizModal')); // Initialize Bootstrap modal
  quizModal.show(); // Show the modal
}

function showQuestions() {
  const questionsList = JSON.parse(localStorage.getItem("questionList")); // Retrieve questions from localStorage
  const quizDiv = document.getElementById('quiz');
  quizDiv.innerHTML = ''; // Clear any previous questions

  questionsList.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
    q.choices.forEach((opt, optIndex) => {
      const optionInput = document.createElement('input');
      optionInput.type = 'radio';
      optionInput.name = `question${index}`; // Name radio buttons by question index
      optionInput.value = optIndex; // Set value to choice index
      questionDiv.appendChild(optionInput);
      const optionLabel = document.createElement('label');
      optionLabel.innerHTML = opt;
      questionDiv.appendChild(optionLabel);
      questionDiv.appendChild(document.createElement('br'));
    });
    quizDiv.appendChild(questionDiv);

    if (index < questionsList.length - 1) {
      const hr = document.createElement('hr'); // Create a line to separate questions
      quizDiv.appendChild(hr);
    }
  });
}

let score = 0;

function submitQuiz() {
  const questionsList = JSON.parse(localStorage.getItem("questionList")); // Retrieve questions from localStorage
  let score = 0; // Reset score to zero

  questionsList.forEach((q, index) => {
    const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
    if (selectedOption && parseInt(selectedOption.value) === q.correct) {
      score++; // Increment score if correct answer
    }
  });

  const quizModal = bootstrap.Modal.getInstance(document.getElementById('quizModal')); // Get modal instance
  quizModal.hide(); // Close the modal after submitting the quiz

  displayResults(score, questionsList.length); // Call function to display results
}

function displayResults(score, total) {
  const resultsText = document.getElementById('resultsText');
  resultsText.innerHTML = `Score: ${score} out of ${total}`; // Display score
  const resultsCard = document.getElementById('quiz-results');
  resultsCard.style.display = 'block'; // Show results section
}
// modal js


/*=============== SHOW MODAL ===============*/
const showModal = (openButton, modalContent) =>{
  const openBtn = document.getElementById(openButton),
  modalContainer = document.getElementById(modalContent)
  
  if(openBtn && modalContainer){
      openBtn.addEventListener('click', ()=>{
          modalContainer.classList.add('show-modal')
      })
  }
}
showModal('open-modal','modal-container')

/*=============== CLOSE MODAL ===============*/
const closeBtn = document.querySelectorAll('.close-modal')

function closeModal(){
  const modalContainer = document.getElementById('modal-container')
  modalContainer.classList.remove('show-modal')
}
closeBtn.forEach(c => c.addEventListener('click', closeModal))