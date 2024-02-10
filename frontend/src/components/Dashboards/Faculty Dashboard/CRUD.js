import { useState, useEffect, useRef, useReducer } from "react";
import { showAlert } from "../../../utils/alerts";
import {
  sendGetRequest,
  sendPostRequest,
  sendDeleteRequest,
} from "../../../utils/sendHttp";
import validator from "validator";
import Input from "../../UI/Input/Input";
import Sidebar from "../../Sidebar/Sidebar";

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
    // {
    //   icon: 'fa-calendar',
    //   text: 'Individual Learning Plan',
    //   url: '/faculty-dashboard/ilp',
    // },
    {
      icon: "fa-book-open",
      text: "Learning Resource Management",
      url: "/learningrm",
    },
    // {
    //   icon: 'fa-pen',
    //   text: 'Assessment Scheduling',
    //   url: 'assessment-scheduling.html',
    // },
    // {
    //   icon: 'fa-list',
    //   text: 'Decide Criteria',
    //   url: 'decide-criteria.html',
    // },

    {
      icon: "fa-comments",
      text: "Discussion Forum",
      url: "/discussionforum",
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

  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

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
        console.log(res);
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

      // console.log(res);
      if (res.data.status === "success") {
        showAlert("success", "Student added successfully");
        setTimeout(fetchStudents, 5000);
        clearForm();
        // console.log(res);
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };

  const deleteStudent = async (userId, studentId) => {
    try {
      console.log({ userId });
      console.log({ studentId });
      const res = await sendDeleteRequest(
        `http://localhost:8080/api/v1/student/${userId}/${studentId}`
      );

      if (res.data.status === "success") {
        showAlert("success", "Student deleted successfully");
        setTimeout(fetchStudents, 5000);
        // console.log(res);
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };

  const clearForm = () => {
    setName("");
    emailState("");
    setGrade("");
    setrollno("");
    setClassification("slow");
    setErrors({});
    setPassword(""); // Clear password field
    setConfirmPassword(""); // Clear confirm password field
  };

  return (
    <div className="App">
      <Sidebar navLinks={sidebarLinks} />
      <div className="card">
        {/* <span className="icon-wrapper">{label}</span> */}
        <Input
          ref={nameInputRef}
          id="name"
          label={<i className="fa-solid fa-user login__form--icon"></i>}
          type="text"
          name="name"
          placeholder="Name"
          required
          value={name}
          onChange={nameChangeHandler}
        />
        <Input
          ref={emailInputRef}
          id="email"
          label={<i className="fa-solid fa-envelope login__form--icon"></i>}
          type="email"
          name="email"
          placeholder="Email"
          required
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={gradeInputRef}
          id="grade"
          label={<i className="fa-solid fa-users login__form--icon"></i>}
          type="text"
          name="grade"
          placeholder="Class"
          required
          value={grade}
          onChange={gradeChangeHandler}
        />
        <Input
          ref={rollnoInputRef}
          id="rollno"
          label={<i className="fa-solid fa-list-ol login__form--icon"></i>}
          type="text"
          name="rollno"
          placeholder="SECompA00"
          required
          value={rollno}
          onChange={rollnoChangeHandler}
        />
        <Input
          // Input for password
          ref={passwordInputRef}
          id="password"
          label={<i className="fa-solid fa-lock login__form--icon"></i>}
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={passwordChangeHandler}
        />
        <Input
          // Input for confirm password
          ref={confirmPasswordInputRef}
          id="confirmPassword"
          label={<i className="fa-solid fa-lock login__form--icon"></i>}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={confirmPasswordChangeHandler}
        />
        <label htmlFor="classification">Classification:</label>
        <select
          id="classification"
          value={classification}
          onChange={(e) => setClassification(e.target.value)}
        >
          <option value="slow">Slow Learner</option>
          <option value="fast">Fast Learner</option>
        </select>
        <button onClick={addStudent}>Add Student</button>
      </div>

      {errors.name && <span className="error">{errors.name}</span>}
      {errors.email && <span className="error">{errors.email}</span>}

      <div className="card2">
        <h2>Student List</h2>
        <ul>
          {students.map(
            (student, index) =>
              student.user && (
                <li key={index}>
                  {student.user?.name} {student.user?.email}
                  {student.user?.class} {student.user?.learnerType}
                  {student.classification}
                  <button
                    onClick={() =>
                      deleteStudent(student.user?._id, student._id)
                    }
                  >
                    Delete
                  </button>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default CRUD;
