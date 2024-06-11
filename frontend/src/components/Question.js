// import { useCallback, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import TestContext from "../store/testContext";

// import UserContext from "../store/user-context";
// import { sendGetRequest, sendPostRequest } from "../utils/sendHttp";
// import { showAlert } from "../utils/alerts";

// const Question = ({ activeClass, testType }) => {
//   const userCtx = useContext(UserContext);
//   const navigate = useNavigate();

//   const [checked, checkedState] = useState(null);
//   // const [testCompleted, setTestCompleted] = useState(false);

//   const {
//     questions,
//     currentQuestion,
//     handleAnswerSelection,
//     handleNextQuestion,
//     totalScore,
//     obtainedScore,
//     testCompleted,
//     incorrectQuestions,
//   } = useContext(TestContext);

//   const getRadioProps = useCallback(
//     (id, value) => {
//       const ansMap = {
//         0: "a",
//         1: "b",
//         2: "c",
//         3: "d",
//       };
//       return {
//         id,
//         value,
//         type: "radio",
//         name: "discount",
//         checked: checked === value, // this will toggle the checked state
//         onChange: () => {
//           checkedState(value);
//           handleAnswerSelection(currentQuestion, ansMap[id]);
//         },
//       };
//     },
//     [checked, currentQuestion, handleAnswerSelection]
//   ); // update the props for all checkboxes, if the checked value changes

//   useEffect(() => {
//     const submitTestHandler = async () => {
//       try {
//         // console.log(userCtx.user._id);
//         // const students = await sendGetRequest(
//         //   'http://localhost:8080/api/v1/student/'
//         // );
//         // // console.log(students);
//         // let studentId = '';
//         // console.log(students);

//         // for (let student of students.data.data) {
//         //   if (student.user._id === userCtx.user._id) {
//         //     studentId = student._id;
//         //   }
//         // }

//         const data = {
//           student: userCtx.user._id,
//           questions: questions,
//           obtainedScore: obtainedScore,
//           totalScore: totalScore,
//           incorrectQuestions: incorrectQuestions,
//         };

//         const res = await sendPostRequest(
//           "http://localhost:8080/api/v1/tests",
//           data
//         );

//         if (res.data.status === "success") {
//           showAlert("success", Score: ${obtainedScore} out of ${totalScore});
//           // showAlert('success', ${testType} TEST Completed);
//           navigate("/student-dashboard");
//         }
//       } catch (err) {
//         showAlert("error", err.response.data.message);
//       }
//     };

//     if (testCompleted) {
//       submitTestHandler();
//     }
//   }, [
//     navigate,
//     obtainedScore,
//     totalScore,
//     questions,
//     testType,
//     userCtx,
//     testCompleted,
//   ]);

//   return (
//     <TestContext.Provider>
//       {!testCompleted && (
//         <div className={test__box ${activeClass}}>
//           <div className="test__box--header">
//             <div>{TEST}</div>
//           </div>

//           <section className="test__box--content">
//             <div className="test__box--que">
//               <span>{currentQuestion + 1}.</span>
//               <p>{questions[currentQuestion].question}</p>
//             </div>

//             <ul className="test__box--options">
//               {questions[currentQuestion].options.map((option, index) => (
//                 <li key={index} className="test__box--item">
//                   <div className="radiobtn">
//                     <input
//                       {...getRadioProps(index, option)}
//                       hidden
//                       className="test__box--input"
//                     />
//                     <label htmlFor={index} className="test__box--option">
//                       {option}
//                     </label>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </section>

//           <div className="test__box--footer">
//             <div className="test__box--totalQue">
//               <span>
//                 <p>{currentQuestion + 1}</p> of <p>{questions.length}</p>
//                 Questions
//               </span>
//             </div>
//             <button
//               className="test__box--nextBtn"
//               onClick={() => {
//                 checkedState(null);

//                 if (currentQuestion < questions.length) {
//                   handleNextQuestion();
//                 }
//               }}
//             >
//               {currentQuestion === questions.length - 1
//                 ? "Submit"
//                 : "Next Question"}
//             </button>
//           </div>
//           {/* {testCompleted &&
//             showAlert(
//               'success',
//               Score: ${obtainedScore} out of ${totalScore}
//             )} */}
//         </div>
//       )}
//     </TestContext.Provider>
//   );
// };

// export default Question;
import { useCallback, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TestContext from "../store/testContext";
import UserContext from "../store/user-context";
import { sendGetRequest, sendPostRequest } from "../utils/sendHttp";
import { showAlert } from "../utils/alerts";

const Question = ({ activeClass }) => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const [checked, checkedState] = useState(null);

  const {
    questions,
    currentQuestion,
    handleAnswerSelection,
    handleNextQuestion,
    totalScore,
    obtainedScore,
    testCompleted,
    incorrectQuestions,
  } = useContext(TestContext);

  const getRadioProps = useCallback(
    (id, value) => {
      const ansMap = { 0: "a", 1: "b", 2: "c", 3: "d" };
      return {
        id,
        value,
        type: "radio",
        name: "discount",
        checked: checked === value,
        onChange: () => {
          checkedState(value);
          handleAnswerSelection(currentQuestion, ansMap[id]);
        },
      };
    },
    [checked, currentQuestion, handleAnswerSelection]
  );

  useEffect(() => {
    const submitTestHandler = async () => {
      try {
        const data = {
          student: userCtx.user._id,
          questions: questions,
          obtainedScore: obtainedScore,
          totalScore: totalScore,
          incorrectQuestions: incorrectQuestions,
        };

        const res = await sendPostRequest(
          "http://localhost:8080/api/v1/tests",
          data
        );

        if (res.data.status === "success") {
          showAlert("success", `Score: ${obtainedScore} out of ${totalScore}`);

          // Trigger the worker function using a GET request
          const workerRes = await sendGetRequest(
            `http://localhost:8080/api/v1/ilps/startworker/${userCtx.user._id}`
          );

          console.log("Worker triggered successfully:", workerRes.data.message);

          navigate("/student-dashboard");
        }
      } catch (err) {
        showAlert("error", err.response.data.message);
      }
    };

    if (testCompleted) {
      submitTestHandler();
    }
  }, [
    navigate,
    obtainedScore,
    totalScore,
    questions,
    incorrectQuestions,
    testCompleted,
    userCtx,
  ]);

  return (
    <TestContext.Provider>
      {!testCompleted && (
        <div className={`test__box ${activeClass}`}>
          <div className="test__box--header">
            <div>TEST</div>
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
            <div className="test__box--totalQue">
              <span>
                <p>{currentQuestion + 1}</p> of <p>{questions.length}</p>
                Questions
              </span>
            </div>
            <button
              className="test__box--nextBtn"
              onClick={() => {
                checkedState(null);

                if (currentQuestion < questions.length) {
                  handleNextQuestion();
                }
              }}
            >
              {currentQuestion === questions.length - 1
                ? "Submit"
                : "Next Question"}
            </button>
          </div>
        </div>
      )}
    </TestContext.Provider>
  );
};

export default Question;
