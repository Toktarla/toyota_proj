let score;
document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz");
  const submitButton = document.getElementById("submitBtn");
  const timeDisplay = document.getElementById("timeDisplay");
  const resultModal = new bootstrap.Modal(document.getElementById("resultModal"));
  const resultBody = document.getElementById("resultBody");
  let timeRemaining = 300; // 5 min
  let questions = [];
  let currentLanguage = localStorage.getItem("locale") || "en"; // Default language

  loadQuizQuestions(currentLanguage);

  function loadQuizQuestions(language) {
    fetch(`/questions/questions_${language}.json`)
      .then(response => response.json())
      .then(data => {
        questions = data.questions;
        loadQuestions();
      })
      .catch(error => {
        console.error("Failed to load quiz questions:", error);
      });
  }

  function loadQuestions() {
    quizContainer.innerHTML = ""; 
    questions.forEach((question, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question");
      questionDiv.innerHTML = `
        <h2> <i class="fa-solid fa-wand-magic"></i> ${index + 1}:</h2>
        <p>${question.question}</p>
        <div class="options">
          ${question.options
            .map(
              (option, optionIndex) => `
                <input type="radio" id="q${index + 1}_option${optionIndex + 1}" name="q${index + 1}" value="${option}">
                <label for="q${index + 1}_option${optionIndex + 1}">${option}</label><br>
              `
            )
            .join("")}
        </div>
      `;
      quizContainer.appendChild(questionDiv);
    });
  }

  const timerInterval = setInterval(() => {
    timeRemaining--;
    timeDisplay.textContent = formatTime(timeRemaining);

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      timeDisplay.textContent = "00:00";
      submitQuiz();
    }
  }, 1000);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${
      minutes < 10 ? "0" : ""
    }${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  async function submitQuiz() {
    clearInterval(timerInterval);
    score = 0;
    questions.forEach((question, index) => {
      const selectedOption = document.querySelector(
        `input[name=q${index + 1}]:checked`
      );
      if (selectedOption && selectedOption.value === question.correctAnswer) {
        score++;
      }
    });

    const timeTaken = 300 - timeRemaining;
    const feedback = `${score} / ${
      questions.length
    }.<br>⏳: ${formatTime(timeTaken)}`;
    resultBody.innerHTML = feedback;

    const quizResults = {
      score: score,
      totalQuestions: questions.length,
    };

    const queryString = Object.keys(quizResults)
      .map(key => `${key}=${quizResults[key]}`)
      .join("&");

    try {
      const response = await fetch(`/submit-quiz?${queryString}`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data.message); // Log success message
    } catch (error) {
      console.error("Failed to store quiz results:", error); // Log error message
    }

    resultModal.show();
  }

  submitButton.addEventListener("click", submitQuiz);

  const facebookBtn = document.getElementById("facebookBtn");
  const twitterBtn = document.getElementById("twitterBtn");
  const linkedinBtn = document.getElementById("linkedinBtn");

  facebookBtn.addEventListener("click", () => {
    shareOnSocialMedia("facebook");
  });

  twitterBtn.addEventListener("click", () => {
    shareOnSocialMedia("twitter");
  });

  linkedinBtn.addEventListener("click", () => {
    shareOnSocialMedia("linkedin");
  });

  function shareOnSocialMedia(platform) {
    const quizResult = `I scored ${score} out of ${
      questions.length
    } in the Toyota Quiz!`;
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          window.location.href
        )}&quote=${encodeURIComponent(quizResult)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          window.location.href
        )}&text=${encodeURIComponent(quizResult)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          window.location.href
        )}&summary=${encodeURIComponent(quizResult)}`;
        break;
    }

    window.open(shareUrl, "_blank");
  }

  const languageSelector = document.getElementById("lang-select");

  if (languageSelector) {
    languageSelector.addEventListener("change", function () {
      const selectedLanguage = this.value;
      currentLanguage = selectedLanguage;
      localStorage.setItem("locale", selectedLanguage);
      loadQuizQuestions(selectedLanguage);
    });
  }
});
