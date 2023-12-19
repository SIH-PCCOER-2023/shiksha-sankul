import { useCallback, useContext, useState } from 'react';
import TestContext from './testContext';

const Question = ({ activeClass }) => {
  const [checked, checkedState] = useState(null);
  const [testCompleted, setTestCompleted] = useState(false);

  const {
    questions,
    currentQuestion,
    handleAnswerSelection,
    handleNextQuestion,
  } = useContext(TestContext);

  const getRadioProps = useCallback(
    (id, value) => {
      const ansMap = {
        0: 'a',
        1: 'b',
        2: 'c',
        3: 'd',
      };
      return {
        id,
        value,
        type: 'radio',
        name: 'discount',
        checked: checked === value, // this will toggle the checked state
        onChange: () => {
          checkedState(value);
          handleAnswerSelection(currentQuestion, ansMap[id]);
        },
      };
    },
    [checked, currentQuestion, handleAnswerSelection]
  ); // update the props for all checkboxes, if the checked value changes

  return (
    <>
      {!testCompleted && (
        <div className={`test__box ${activeClass}`}>
          <div className="test__box--header">
            <div>Academic Test</div>
          </div>

          <section className="test__box--content">
            <div className="test__box--que">
              <span>{currentQuestion + 1}.</span>
              <p>{questions[currentQuestion].question}</p>
            </div>

            <ul className="test__box--options">
              {questions[currentQuestion].options.map((option, index) => (
                <li key={index} className="test__box--item">
                  <div className="radiobtn">
                    <input
                      {...getRadioProps(index, option)}
                      hidden
                      className="test__box--input"
                    />
                    <label htmlFor={index} className="test__box--option">
                      {option}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <div className="test__box--footer">
            <button
              className="test__box--nextBtn"
              onClick={() => {
                checkedState(null);
                if (currentQuestion === questions.length - 1) {
                  setTestCompleted(true);
                } else {
                  handleNextQuestion();
                }
              }}
            >
              {currentQuestion === questions.length - 1
                ? 'Submit'
                : 'Next Question'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Question;
