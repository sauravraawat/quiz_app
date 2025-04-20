import React, { useState, useEffect } from 'react';
import './QuizApp.css';

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds per question
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Sample quiz questions
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      correctAnswer: "JavaScript"
    },
    {
      question: "What does HTML stand for?",
      options: [
        "Hypertext Markup Language",
        "Hypertext Machine Language",
        "Hyper Transfer Markup Language",
        "Hyper Tool Multi Language"
      ],
      correctAnswer: "Hypertext Markup Language"
    }
  ];

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted) {
      handleNextQuestion();
    }
  }, [timeLeft, quizCompleted]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    // Check if answer is correct
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Move to next question or end quiz
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(10);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(10);
    setQuizCompleted(false);
    setSelectedOption(null);
  };

  return (
    <div className="quiz-container">
      {!quizCompleted ? (
        <>
          <div className="timer">Time left: {timeLeft}s</div>
          <div className="question-container">
            <h2>Question {currentQuestion + 1}/{questions.length}</h2>
            <p>{questions[currentQuestion].question}</p>
            <div className="options">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${
                    selectedOption === option ? "selected" : ""
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              className="next-btn"
              onClick={handleNextQuestion}
              disabled={!selectedOption}
            >
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <div className="result-container">
          <h2>Quiz Completed!</h2>
          <p>Your score: {score}/{questions.length}</p>
          <button className="restart-btn" onClick={restartQuiz}>
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizApp;