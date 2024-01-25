const totalQuestions = 5;
let currentQuestion = 1;
let answers = {};

function startSurvey() {
  document.querySelector('.welcome-screen button').style.display = 'none';
  showQuestion(currentQuestion);
}

function showQuestion(questionNumber) {
  document.querySelectorAll('.question-container').forEach(container => {
    container.style.display = 'none';
  });

  if (questionNumber <= totalQuestions) {
    const currentQuestionContainer = document.getElementById(`question-${questionNumber}`);
    currentQuestionContainer.style.display = 'block';
    document.getElementById('question-number').innerText = `${questionNumber}/${totalQuestions}`;
  } else {
    // Show thank-you screen
    document.querySelector('.thank-you-screen').style.display = 'block';
    // Simulate submitting to the database or local storage
    saveSurveyToStorage();
    // Reset survey after 5 seconds
    setTimeout(resetSurvey, 5000);
  }
}

function nextQuestion() {
  if (currentQuestion === 5) {
    // For Question 5 (text-based), use textarea instead of input
    const answer = document.getElementById('answer-text').value;
    answers[`question-${currentQuestion}`] = answer;
  } else {
    const rating = document.querySelector('input[name="rating"]:checked');
    if (rating) {
      answers[`question-${currentQuestion}`] = rating.value;
    } else {
      alert('Please select a rating before proceeding.');
      return;
    }
  }

  currentQuestion++;
  showQuestion(currentQuestion);
}

function saveSurveyToStorage() {
  // Save answers to local storage or database
  localStorage.setItem('surveyData', JSON.stringify(answers));
}

function resetSurvey() {
  currentQuestion = 1;
  answers = {};
  document.querySelector('.thank-you-screen').style.display = 'none';

  // Wait for 5 seconds before showing the welcome screen
  setTimeout(() => {
    document.querySelector('.welcome-screen button').style.display = 'block';
    showQuestion(currentQuestion);
  }, 5000);
}

// Make sure "Start Survey" button is visible when the page loads
document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('.welcome-screen button').style.display = 'block';
});
