import { useState, useEffect, useRef, useReducer } from "react";
import { showAlert } from "../../../utils/alerts";
import {
  sendGetRequest,
  sendPostRequest,
  sendDeleteRequest,
} from "../../../utils/sendHttp";
import validator from "validator";
import Input from "../../UI/Input/Input";
import FacultySidebar from "../../Sidebar/FacultySidebar";
import ExcelUpload from "./ExcelUpload";
import "@fortawesome/fontawesome-free/css/all.css";

const CRUD = () => {
  const sidebarLinks = [
    {
      icon: "fa-graduation-cap",
      text: "Student Management",
      url: "/faculty-dashboard",
    },
    {
      icon: "fa-chart-pie",
      text: "Analytics",
      url: "/analytics",
    },
    {
      icon: "fa-book-open",
      text: "Learning Resource Management",
      url: "/learningrm",
    },
    {
      icon: "fa-note-sticky",
      text: "Share Notes",
      url: "/pdfupload",
    },
    {
      icon: "fa-chart-line",
      text: "View Performance",
      url: "/performanceview",
    },
  ];
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [rollno, setrollno] = useState("");
  const [classification, setClassification] = useState("slow");
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const gradeInputRef = useRef();
  const rollnoInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const emailReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
      return { value: action.val, isValid: validator.isEmail(state.value) };
    }
    if (action.type === "INPUT_BLUR") {
      return { value: state.value, isValid: validator.isEmail(state.value) };
    }
    return { value: "", isValid: false };
  };

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const gradeChangeHandler = (event) => {
    setGrade(event.target.value);
  };

  const rollnoChangeHandler = (event) => {
    setrollno(event.target.value);
  };

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const confirmPasswordChangeHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const fetchStudents = async () => {
    try {
      const res = await sendGetRequest("http://localhost:8080/api/v1/student");

      if (res.data.status === "success") {
        showAlert("success", "Students fetched successfully");
        setStudents(res.data.data);
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };

  const addStudent = async () => {
    try {
      const data = {
        name: name,
        email: emailState.value,
        class: grade,
        rollno: rollno,
        learnerType: classification,
        password: password,
        passwordConfirm: confirmPassword,
      };

      const res = await sendPostRequest(
        "http://localhost:8080/api/v1/student",
        data
      );

      if (res.data.status === "success") {
        showAlert("success", "Student added successfully");
        setTimeout(fetchStudents, 5000);
        clearForm();
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };

  const deleteStudent = async (userId, studentId) => {
    try {
      const res = await sendDeleteRequest(
        `http://localhost:8080/api/v1/student/${userId}/${studentId}`
      );

      if (res.data.status === "success") {
        showAlert("success", "Student deleted successfully");
        setTimeout(fetchStudents, 5000);
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };

  const clearForm = () => {
    setName("");
    dispatchEmail({ type: "USER_INPUT", val: "" });
    setGrade("");
    setrollno("");
    setClassification("slow");
    setErrors({});
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="App">
      <FacultySidebar navLinks={sidebarLinks} />
      <div className="cards-container">
        <div className="card">
          <div className="icon-wrapper">
            <i className="fa-solid fa-user login__form--icon"></i>
            <Input
              ref={nameInputRef}
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              required
              value={name}
              onChange={nameChangeHandler}
            />
          </div>
          <div className="icon-wrapper">
            <i className="fa-solid fa-envelope login__form--icon"></i>
            <Input
              ref={emailInputRef}
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              required
              isValid={emailIsValid}
              value={emailState.value}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />
          </div>
          <div className="icon-wrapper">
            <i className="fa-solid fa-users login__form--icon"></i>
            <Input
              ref={gradeInputRef}
              id="grade"
              type="text"
              name="grade"
              placeholder="Class"
              required
              value={grade}
              onChange={gradeChangeHandler}
            />
          </div>
          <div className="icon-wrapper">
            <i className="fa-solid fa-list-ol login__form--icon"></i>
            <Input
              ref={rollnoInputRef}
              id="rollno"
              type="text"
              name="rollno"
              placeholder="SEComp00"
              required
              value={rollno}
              onChange={rollnoChangeHandler}
            />
          </div>
          <div className="icon-wrapper">
            <i className="fa-solid fa-lock login__form--icon"></i>
            <Input
              ref={passwordInputRef}
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={passwordChangeHandler}
              className="password-input"
            />
          </div>

          <div className="icon-wrapper">
            <i className="fa-solid fa-lock login__form--icon"></i>
            <Input
              ref={confirmPasswordInputRef}
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={confirmPasswordChangeHandler}
              className="confirm-password-input"
            />
          </div>
          <label htmlFor="classification">Classification:</label>
          <div className="icon-wrapper">
            <i className="fa-solid fa-comments login__form--icon"></i>
            <select
              id="classification"
              value={classification}
              onChange={(e) => setClassification(e.target.value)}
              className="classification-input"
            >
              <option value="slow">Slow Learner</option>
              <option value="fast">Fast Learner</option>
            </select>
          </div>
          <button onClick={addStudent} className="add-student-btn">
            Add Student
          </button>
          <ExcelUpload />
        </div>

        {errors.name && <span className="error">{errors.name}</span>}
        {errors.email && <span className="error">{errors.email}</span>}

        <div className="card2">
          <h2>Student List</h2>
          <ul>
            {students
              .filter((student) => student.user) // Filter out students with no user data
              .sort((a, b) => a.user.rollno.localeCompare(b.user.rollno)) // Sort students based on roll numbers
              .map((student, index) => (
                <li key={index}>
                  <span>
                    {"Name: "}
                    {student.user.name}
                  </span>
                  <span>
                    {"  Email: "}
                    {student.user.email}
                  </span>
                  <span>
                    {"Roll Number: "}
                    {student.user.rollno}
                  </span>
                  <span>
                    {"  Learner Type: "}
                    {student.user.learnerType}
                  </span>
                  <button
                    onClick={() => deleteStudent(student.user._id, student._id)}
                    className="glow-on-hover delete-btn"
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CRUD;
