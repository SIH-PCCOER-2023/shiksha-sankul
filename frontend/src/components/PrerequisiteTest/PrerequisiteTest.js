import { useEffect, useState } from "react";

import Header from "../Header/Header";
import Question from "./Question";
import { getQuestions } from "../../utils/questionbank";
import TestContext from "./testContext";

const PrerequisiteTest = (props) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [showScore, setShowScore] = useState(false);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        const loadQuestions = async () => {
            // Till the data is fetch using API
            // the Loading page will show.
            setLoading(true);

            // Await make wait until that
            // promise settles and return its result
            const response = await getQuestions();
            // const data = await response.data;

            // After fetching data stored it in posts state.
            setQuestions(response);

            // Closed the loading page
            setLoading(false);
        };
        // Call the function
        loadQuestions();
    },[]);

    const handleAnswerSelection = (questionIndex, selectedAnswer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = selectedAnswer;
        setAnswers(updatedAnswers);
    };
    const handleNextQuestion = () => {
        if (
            answers[currentQuestion] === questions[currentQuestion].answer ||
            JSON.stringify(answers[currentQuestion]) ===
                JSON.stringify(questions[currentQuestion].answer)
        ) {
            setScore(score + 1);
        }
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowScore(true);
        }
    };
    return (
        <TestContext.Provider
            value={{
                score,
                Loading,
                showScore,
                questions,
                currentQuestion,
                handleAnswerSelection,
                handleNextQuestion,
            }}
        >
            <div className="prereq-test-container">
                <Header />

                {Loading ? (
                    <>Loading</>
                ) : (
                    <>
                        {showScore ? (
                            <div>
                                <h2>Quiz Complete!</h2>
                                <h3>Your Score: {score}</h3>
                            </div>
                        ) : (
                            <div>
                                {/* <>{questions}</> */}
                                <Question />
                            </div>
                        )}
                    </>
                )}
            </div>
        </TestContext.Provider>
    );
};

export default PrerequisiteTest;
