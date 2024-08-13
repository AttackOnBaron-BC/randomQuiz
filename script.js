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

let quizStartTime; // Variable to store the start time of the quiz

function randomQ(questionsLength) {
  let arr = [];
  while (arr.length < questionsLength) {
    const r = Math.floor(Math.random() * questions.length);
    if (arr.indexOf(r) === -1) arr.push(r); // Ensure no duplicate questions
  }
  return arr; // Return array of random question indices
}

function generateQuiz() {
  const selectedAmount = parseInt(document.getElementById("questionAmount").value); // Get number of questions selected
  const randomQuestions = randomQ(selectedAmount); // Get random questions based on selection

  let quizQuestions = randomQuestions.map(index => questions[index]); // Map selected questions
  localStorage.setItem("questionList", JSON.stringify(quizQuestions)); // Store questions in localStorage

  showQuestions(); // Call function to display questions
  quizStartTime = new Date(); // Record the start time of the quiz

  const quizModal = new bootstrap.Modal(document.getElementById('quizModal')); // Initialize Bootstrap modal
  quizModal.show(); // Show the modal
}

function showQuestions() {
  const questionsList = JSON.parse(localStorage.getItem("questionList")); // Retrieve questions from localStorage
  const quizDiv = document.getElementById('quiz');
  quizDiv.innerHTML = ''; // Clear any previous questions

  questionsList.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`; // Add question text
    q.choices.forEach((opt, optIndex) => {
      const optionInput = document.createElement('input');
      optionInput.type = 'radio';
      optionInput.name = `question${index}`; // Name radio buttons by question index
      optionInput.value = optIndex; // Set value to choice index
      questionDiv.appendChild(optionInput);
      const optionLabel = document.createElement('label');
      optionLabel.innerHTML = opt; // Add choice text
      questionDiv.appendChild(optionLabel);
      questionDiv.appendChild(document.createElement('br'));
    });
    quizDiv.appendChild(questionDiv);
  });
}

function submitQuiz() {
  const questionsList = JSON.parse(localStorage.getItem("questionList")); // Retrieve questions from localStorage
  let score = 0; // Reset score to zero

  questionsList.forEach((q, index) => {
    const selectedOption = document.querySelector(`input[name="question${index}"]:checked`); // Get selected option
    if (selectedOption && parseInt(selectedOption.value) === q.correct) {
      score++; // Increment score if correct answer
    }
  });

  const quizEndTime = new Date(); // Record the end time of the quiz
  const timeTaken = (quizEndTime - quizStartTime) / 1000; // Calculate time taken in seconds

  displayResults(score, questionsList.length, timeTaken); // Call function to display results

  const quizModal = bootstrap.Modal.getInstance(document.getElementById('quizModal')); // Get modal instance
  quizModal.hide(); // Close the modal after submitting the quiz
}

function displayResults(score, total, timeTaken) {
  const resultsText = document.getElementById('resultsText');
  resultsText.innerHTML = `Score: ${score} out of ${total}<br>Time: ${timeTaken.toFixed(2)} seconds`; // Display score and time taken in separate lines
  const resultsCard = document.getElementById('quiz-results');
  resultsCard.style.display = 'block'; // Show results section
}
