const questions = [
    {
      number: 1,
      question: "What is the capital of United Kingdom?",
      choices: ["London", "Paris", "Nairobi"],
      correct: "Paris"
    },
    {
      number: 2,
      question: "How many days are there in a week?",
      choices: ["Five", "Three", "Seven"],
      correct: "Seven"
    },
    {
      number: 3,
      question: "What is the closest planet to the sun?",
      choices: ["Earth", "Mercury", "Saturn"],
      correct: "Mercury"
    },
  ];
  
// var arr = [];
// const questionToShow = 3;

// function randomQ(questionsLength){
//   while(arr.length < questionsLength){
//       var r = Math.floor(Math.random() * questionToShow);
//       if(arr.indexOf(r) === -1) arr.push(r);
//   }
// }

// var qs = {};
// function questionList(){
//   randomQ(questions.length);

//   var list = [];
//   for (let a of arr) {
//     if(a < questions.length)
//       list.push(questions[a]);
//   }
//   localStorage.setItem("questionList", JSON.stringify(list));    
// }

// function showQuestions()
// {
//   let questionNumber = 1;
//   const questions = JSON.parse(localStorage.getItem("questionList"));

//   const quiz = document.getElementById("quiz");
//   quiz.innerHTML = "";

//   for(let q of questions)
//   {
//     console.log(q.choices);
//     const questionDiv = document.createElement("div");
//     const questionText = document.createElement("h3");
//     questionText.textContent = q.question;
//     questionDiv.appendChild(questionText);

//     const answers = q.choices;
//     for(let j = 0; j < answers.length; j++)
//     {
//       const answerDiv = document.createElement("div");
//       const radioInput = document.createElement("input");
//       radioInput.type = "radio";
//       radioInput.name = `question-${questionNumber}`;
//       radioInput.value = j;

//       const answerLabel = document.createElement("label");
//       answerLabel.textContent = answers[j];
//       answerDiv.appendChild(radioInput);
//       answerDiv.appendChild(answerLabel);
//       questionDiv.appendChild(answerDiv);
//     }
//     quiz.appendChild(questionDiv);
//   }
// }

// function submitQuiz()
// {  
//   let score = 0;
//   const quizQuestions = document.querySelectorAll(".question");
//   console.log(quizQuestions);
//   quizQuestions.forEach((questionDiv, index) => {
//     const selectedAnswer = questionDiv.querySelector("input[type='radio']:checked");
//     if (selectedAnswer) {
//       const selectedAnswerIndex = parseInt(selectedAnswer.value);
//       const correctAnswerIndex = questions[index].correctAnswer;
//       if (selectedAnswerIndex === correctAnswerIndex) {
//         score++;
//       }
//     }
//   });
//   const scoreDiv = document.getElementById("score");
//   scoreDiv.textContent = `Your score is ${score} out of 5.`;
// }

// let count = 0;
// function checkAnswer(t)
// {
//   t++;
//   count += t;
//   console.log(count);
// }




// questionList();
// showQuestions();

function generateRandomQuestions() {
  const randomQuestions = [];
  while (randomQuestions.length < 2) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      if (!randomQuestions.includes(questions[randomIndex])) {
          randomQuestions.push(questions[randomIndex]);
      }
  }
  console.log(randomQuestions);
  return randomQuestions;
}

function displayQuestions(questions) {
  const quizDiv = document.getElementById('quiz');
  console.log(questions);
  questions.forEach((q, index) => {
      console.log(q);
      const questionDiv = document.createElement('div');
      questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
      q.choices.forEach((opt) => {
          
          const optionInput = document.createElement('input');
          optionInput.type = 'radio';
          optionInput.name = `question${index}`;
          console.log(optionInput.name);
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

function submitQuiz() {
  let score = 0;
  questions.forEach((q, index) => {
      const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
      console.log(selectedOption);
      // selectedOption.forEach(e =>
      // {
      //   if(e.value === q.correct)
      //     score++;
      // }
      // );
  });
  alert(`Your score is: ${score}/5`);
}

const randomQuestions = generateRandomQuestions();
displayQuestions(randomQuestions);