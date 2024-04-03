import React, { useState } from "react";

const TestContext = React.createContext({
  questions: [],
  questionsHandler: () => {},
  obtainedScore: 0,
  setObtainedScore: () => {},
  totalScore: 0,
  setTotalScore: () => {},
});

export const UserContextProvider = (props) => {
  const [questions, setQuestions] = useState({});
  const [obtainedScore, setObtainedScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const questionsHandler = (questions) => {
    setQuestions(questions);
  };

  const obtainedScoreHandler = (obtainedScore) => {
    setObtainedScore(obtainedScore);
  };

  const totalScoreHandler = (totalScore) => {
    setTotalScore(totalScore);
  };

  const contextValue = {
    questions: questions,
    questionsHandler: questionsHandler,
    obtainedScore: obtainedScore,
    obtainedScoreHandler: obtainedScoreHandler,
    totalScore: totalScore,
    totalScoreHandler: totalScoreHandler,
  };

  return (
    <TestContext.Provider value={contextValue}>
      {props.children}
    </TestContext.Provider>
  );
};

export default TestContext;
