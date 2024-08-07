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
  
  function showQuestions()
  {
    let correctAnswer = 0;
    const questions = JSON.parse(localStorage.getItem("questionList"));
  
    let questionText = document.querySelector("ul");  
  
    for (const q of questions) {
      let li = document.createElement("li");
      li.innerHTML = q.question;
      questionText.appendChild(li);

      const test = questionText.appendChild(li);
      const br = document.createElement("br");
      test.appendChild(br);

      q.choices.forEach(e => {
        const button = document.createElement("button");
        button.textContent = e;
        test.appendChild(button);
        button.addEventListener('click', function(event){
          if(event === q.correct)
            correctAnswer++;
        })
      });
    } 

    console.log(correctAnswer);
  }

  
 
  
  questionList();
  showQuestions();