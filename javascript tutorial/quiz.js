(function () {
  const questions = [
    {
      question: "JavaScript mein variable declare karne ke liye kaunsa keyword modern code mein use hota hai?",
      options: ["let", "define", "varName", "value"],
      answer: "let",
    },
    {
      question: "Array ka pehla index kya hota hai?",
      options: ["0", "1", "-1", "first"],
      answer: "0",
    },
    {
      question: "Strict equality ke liye kaunsa operator use hota hai?",
      options: ["=", "==", "===", "!="],
      answer: "===",
    },
    {
      question: "Function se value return karne ke liye kya use hota hai?",
      options: ["send", "return", "output", "give"],
      answer: "return",
    },
    {
      question: "DOM element select karne ka common method kaunsa hai?",
      options: ["document.querySelector()", "document.pick()", "dom.find()", "page.select()"],
      answer: "document.querySelector()",
    },
  ];

  const quiz = document.createElement("section");
  quiz.className = "tutorial-quiz";
  quiz.innerHTML = `
    <h2>Quick JavaScript Quiz</h2>
    <p class="tutorial-quiz-question"></p>
    <div class="tutorial-quiz-options"></div>
    <p class="tutorial-quiz-feedback" aria-live="polite"></p>
    <p class="tutorial-quiz-score" aria-live="polite"></p>
    <button class="tutorial-quiz-next" type="button" hidden>Next question</button>
  `;
  document.body.appendChild(quiz);

  const questionText = quiz.querySelector(".tutorial-quiz-question");
  const options = quiz.querySelector(".tutorial-quiz-options");
  const feedback = quiz.querySelector(".tutorial-quiz-feedback");
  const score = quiz.querySelector(".tutorial-quiz-score");
  const next = quiz.querySelector(".tutorial-quiz-next");
  let current = 0;
  let points = 0;

  function render() {
    const item = questions[current];
    questionText.textContent = `${current + 1}/${questions.length}. ${item.question}`;
    options.innerHTML = "";
    feedback.textContent = "";
    next.hidden = true;
    score.textContent = `Score: ${points}/${questions.length}`;

    item.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = option;
      button.addEventListener("click", () => {
        options.querySelectorAll("button").forEach((choice) => {
          choice.disabled = true;
        });
        if (option === item.answer) {
          points += 1;
          feedback.textContent = "Sahi jawab!";
        } else {
          feedback.textContent = `Sahi jawab: ${item.answer}`;
        }
        score.textContent = `Score: ${points}/${questions.length}`;
        next.hidden = false;
      });
      options.appendChild(button);
    });
  }

  next.addEventListener("click", () => {
    current += 1;
    if (current === questions.length) {
      questionText.textContent = "Quiz complete!";
      options.innerHTML = "";
      feedback.textContent = `Aapka score ${points}/${questions.length} hai.`;
      next.textContent = "Phir se khelo";
      current = -1;
    } else {
      render();
    }
  });

  render();
})();
