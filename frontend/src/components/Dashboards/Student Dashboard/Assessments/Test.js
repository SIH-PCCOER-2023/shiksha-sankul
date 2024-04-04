import { useEffect, useState } from "react";

import Question from "../../../Question";
import TestContext from "../../../../store/testContext";

import Sidebar from "../../../Sidebar/Sidebar";
import DashboardHeader from "../../../Header/DashboardHeader";

import { showAlert } from "../../../../utils/alerts";
import { getQuestions } from "../../../../utils/questionbank";

const Test = ({ testType }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [obtainedScore, setObtainedScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  // const [showScore, setShowScore] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  // let incorrectQuestions = [];

  useEffect(() => {
    const loadQuestions = async () => {
      // setLoading(true);

      const response = await getQuestions(testType);

      setQuestions(response);

      // setLoading(false);
    };
    loadQuestions();
  }, [testType]);

  const handleAnswerSelection = (questionIndex, selectedAnswer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = selectedAnswer;
    setAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (!answers[currentQuestion]) {
      showAlert("error", "Please select an option!");
      return;
    }

    if (
      answers[currentQuestion] !== questions[currentQuestion].correctanswer &&
      JSON.stringify(answers[currentQuestion]) !==
        JSON.stringify(questions[currentQuestion].answer)
    ) {
      setIncorrectQuestions((prevIds) => [
        ...prevIds,
        questions[currentQuestion]._id,
      ]);
      // incorrectQuestions.push(questions[currentQuestion]._id);
    }
    // console.log("IAQ: ", incorrectQuestions);

    if (
      answers[currentQuestion] === questions[currentQuestion].correctanswer ||
      JSON.stringify(answers[currentQuestion]) ===
        JSON.stringify(questions[currentQuestion].answer)
    ) {
      setObtainedScore(obtainedScore + questions[currentQuestion].marks);
      // console.log(
      //   answers[currentQuestion],
      //   questions[currentQuestion].correctanswer
      // );
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }

    setTotalScore(totalScore + questions[currentQuestion].marks);

    if (currentQuestion === questions.length - 1) {
      setTestCompleted(true);
      // if (
      //   answers[currentQuestion] !== questions[currentQuestion].correctanswer &&
      //   JSON.stringify(answers[currentQuestion]) !==
      //     JSON.stringify(questions[currentQuestion].answer)
      // ) {
      //   // If last question answered incorrectly, add its ID to incorrectQuestions
      //   setIncorrectQuestions((prevIds) => [
      //     ...prevIds,
      //     questions[currentQuestion]._id,
      //   ]);
      // }
    }
    // console.log("IAQ: ", incorrectQuestions);
  };

  const handleTestStart = () => {
    setTestStarted(true);
  };

  const sidebarLinks = [
    {
      icon: "fa-home",
      text: "Dashboard",
      url: "/student-dashboard",
    },
    {
      icon: "fa-pen",
      text: "Assessments",
      url: "/assessments",
    },
    {
      icon: "fa-solid fa-chart-pie",
      text: "Performance",
      url: "/performance",
    },
    {
      icon: "fa-solid fa-layer-group",
      text: "ILP",
      url: "/individuallearningplan",
    },
    {
      icon: "fa-book-open",
      text: "Learning Center",
      url: "/learning-center",
    },
    {
      icon: "fa-note-sticky",
      text: "Notes",
      url: "/notes",
    },
    {
      icon: "fa-solid fa-comments",
      text: "Discussion Forum",
      url: "/discussionforum",
    },
  ];

  return (
    <>
      <Sidebar navLinks={sidebarLinks} />

      <DashboardHeader />

      <TestContext.Provider
        value={{
          obtainedScore,
          totalScore,
          // loading,
          // showScore,
          questions,
          currentQuestion,
          handleAnswerSelection,
          handleNextQuestion,
          testCompleted,
          incorrectQuestions,
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
              <Question activeClass="activeTest" testType={testType} />
            </div>
          )}
        </div>
      </TestContext.Provider>
    </>
  );
};

export default Test;
