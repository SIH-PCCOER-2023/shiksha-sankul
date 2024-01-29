import { useEffect, useState } from 'react';

import Question from '../Question';
import { getQuestions } from '../../utils/questionbank';
import TestContext from '../../store/testContext';
import { showAlert } from '../../utils/alerts';
import Sidebar from '../Sidebar/Sidebar';
import DashboardHeader from '../Header/DashboardHeader';

const PrerequisiteTest = (props) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [testStarted, setTestStarted] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);

      const response = await getQuestions();

      setQuestions(response);

      setLoading(false);
    };
    loadQuestions();
  }, []);

  const handleAnswerSelection = (questionIndex, selectedAnswer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = selectedAnswer;
    setAnswers(updatedAnswers);
  };
  const handleNextQuestion = () => {
    if (!answers[currentQuestion]) {
      showAlert('error', 'Please select an option!');
      return;
    }
    if (
      answers[currentQuestion] === questions[currentQuestion].correctanswer ||
      JSON.stringify(answers[currentQuestion]) ===
        JSON.stringify(questions[currentQuestion].answer)
    ) {
      setScore(score + questions[currentQuestion].marks);
      console.log(
        answers[currentQuestion],
        questions[currentQuestion].correctanswer
      );
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleTestStart = () => {
    setTestStarted(true);
  };

  const sidebarLinks = [
    {
      icon: 'fa-home',
      text: 'Dashboard',
      url: '/student-dashboard',
    },
    {
      icon: 'fa-calendar',
      text: 'Individual Learning Plan',
      url: '/ilp',
    },
    {
      icon: 'fa-book-open',
      text: 'Learning Center',
      url: 'learning.html',
    },
    {
      icon: 'fa-pen',
      text: 'Assessments',
      url: '/assessments',
    },
    // {
    //   icon: 'fa-thumbs-up',
    //   text: 'Our Recommendations',
    //   url: 'recommendations.html',
    // },
    // {
    //   icon: 'fa-solid fa-file-pdf',
    //   text: 'Certificates',
    //   url: 'certificates.html',
    // },
    {
      icon: 'fa-solid fa-chart-pie',
      text: 'Performance',
      url: '/performance',
    },
    {
      icon: 'fa-solid fa-comments',
      text: 'Discussion Forum',
      url: 'discussion.html',
    },
  ];

  return (
    <>
      <Sidebar navLinks={sidebarLinks} />

      <DashboardHeader />

      <TestContext.Provider
        value={{
          score,
          loading,
          showScore,
          questions,
          currentQuestion,
          handleAnswerSelection,
          handleNextQuestion,
        }}
      >
        <div className="prereq">
          <div className="prereq__startbtn">
            {!testStarted && (
              <button onClick={handleTestStart}>Start Test</button>
            )}
          </div>

          {testStarted && (
            <div>
              <Question activeClass="activeTest" />
            </div>
          )}
        </div>
      </TestContext.Provider>
    </>
  );
};

export default PrerequisiteTest;
