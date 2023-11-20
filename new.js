const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'The Queen of our Hearts Miss World Aishwarya Rai Bacchhan made her debut with a Tamil movie inspired by the life of actors and politics. Identify the movie',
    answers: [
      { text: 'Uyire (1998)', correct: false },
      { text: 'Aur Pyaar Ho Gaya (1997)', correct: false },
      { text: 'Iruvar (1997)', correct: true },
      { text: 'Guru (2007)', correct: false },
    ]
  },
  {
    question: 'Which of these crime thrillers features Vidya Balan in the role of a pregnant woman trying to find her missing husband??',
    answers: [
      { text: 'Kahaani', correct: true },
      { text: 'Bhool Bhulaiya', correct: false},
      { text: 'Munna Bhai MBBS', correct: false },
      { text: 'Fun Fun Function', correct: false }
    ]
  },
  {
    question: 'Which of these movies starring Ayushmann Khurana is based on the 2014 Badaun rape case?',
    answers: [
      { text: 'Vicky Donor', correct: false },
      { text: 'Article 15', correct: true },
      { text: 'Andhadhun', correct: false },
      { text: 'Jolly LLB', correct: false }
    ]
  },
  {
    question: 'Which movie starring Alia Bhatt won the National Film Award 2023?',
    answers: [
      { text: 'Mimi', correct: false },
      { text: 'Gangubai Kathiawadi', correct: true },
      { text: 'Rocky Aur Rani ki Prem Kahaani', correct: false },
      { text: 'Udta Punjab', correct: false },
    ]
  }
]
