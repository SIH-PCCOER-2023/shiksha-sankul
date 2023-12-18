import { useCallback, useContext, useState } from "react";
import TestContext from "./testContext";

const Question = (props) => {
    const [checked, checkedState] = useState(null);
    const {
        questions,
        currentQuestion,
        handleAnswerSelection,
        handleNextQuestion,
        handlePrevQuestion,
    } = useContext(TestContext);

    const getRadioProps = useCallback(
        (id, value) => {
            const ansMap = {
                0: "a",
                1: "b",
                2: "c",
                3: "d",
            };
            return {
                id,
                value,
                type: "radio",
                name: "discount",
                checked: checked === value, // this will toggle the checked state
                onChange: () => {
                    checkedState(value);
                    handleAnswerSelection(currentQuestion, ansMap[id]);
                },
            };
        },
        [checked, currentQuestion, handleAnswerSelection]
    ); // update the props for all checkboxes, if the checked value changes

    if (questions.length <= 0) {
        return <p>Loading...</p>;
    }
    return (
        <>
            <div>
                <div>
                    <h2>Question {currentQuestion + 1}</h2>
                    <h3>{questions[currentQuestion].question}</h3>

                    <ul>
                        {questions[currentQuestion].options.map(
                            (option, index) => (
                                <li key={index}>
                                    <div className="radiobtn">
                                        <input
                                            {...getRadioProps(index, option)}
                                        />
                                        <label htmlFor={index}>{option}</label>
                                    </div>
                                </li>
                            )
                        )}
                    </ul>
                    <button
                        onClick={() => {
                            checkedState(null);
                            handlePrevQuestion();
                        }}
                    >
                        Prev Question
                    </button>
                    <button
                        onClick={() => {
                            checkedState(null);
                            handleNextQuestion();
                        }}
                    >
                        Next Question
                    </button>
                </div>
            </div>
        </>
    );
};

export default Question;
