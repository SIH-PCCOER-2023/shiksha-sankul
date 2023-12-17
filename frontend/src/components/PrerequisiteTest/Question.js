import { useContext } from "react";
import TestContext from "./testContext";

const Question = (props) => {
    const {
        questions,
        currentQuestion,
        handleAnswerSelection,
        handleNextQuestion,
    } = useContext(TestContext);
    console.log(questions, currentQuestion);
    if (questions.length<=0) {
        return <p>Loading...</p>;
    }
    return (
        <>
            <div>
                <div>
                    <h2>Question {currentQuestion + 1}</h2>
                    <h3>{questions[currentQuestion].question}</h3>
                    {questions[currentQuestion].type === "radio" && (
                        <ul>
                            {questions[currentQuestion].options.map(
                                (option, index) => (
                                    <li key={index}>
                                        <input
                                            type="radio"
                                            name={`questions${currentQuestion}`}
                                            value={option}
                                            onChange={() =>
                                                handleAnswerSelection(
                                                    currentQuestion,
                                                    option
                                                )
                                            }
                                        />
                                        {option}
                                    </li>
                                )
                            )}
                        </ul>
                    )}
                    {questions[currentQuestion].type === "checkbox" && (
                        <ul>
                            {questions[currentQuestion].options.map(
                                (option, index) => (
                                    <li key={index}>
                                        <input
                                            type="checkbox"
                                            name={`question${currentQuestion}`}
                                            value={option}
                                            onChange={() =>
                                                handleAnswerSelection(
                                                    currentQuestion,
                                                    option
                                                )
                                            }
                                        />
                                        {option}
                                    </li>
                                )
                            )}
                        </ul>
                    )}
                    {questions[currentQuestion].type === "input" && (
                        <input
                            type="text"
                            onChange={(e) =>
                                handleAnswerSelection(
                                    currentQuestion,
                                    e.target.value
                                )
                            }
                        />
                    )}
                    {questions[currentQuestion].type === "textarea" && (
                        <textarea
                            rows="4"
                            cols="50"
                            onChange={(e) =>
                                handleAnswerSelection(
                                    currentQuestion,
                                    e.target.value
                                )
                            }
                        />
                    )}
                    <button onClick={handleNextQuestion}>Next Question</button>
                </div>
            </div>
        </>
    );
};

export default Question;
