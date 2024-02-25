import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";

import validator from "validator";
import axios from "axios";
import { sendPostRequest } from "../../utils/sendHttp";
import { showAlert } from "../../utils/alerts";
import Input from "./../UI/Input/Input";
import UserContext from "../../store/user-context";
import AuthContext from "../../store/auth-context";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: validator.isEmail(state.value) };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: validator.isEmail(state.value) };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: true };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: true };
  }
  return { value: "", isValid: false };
};

const LoginForm = (props) => {
  const userCtx = useContext(UserContext);
  const authCtx = useContext(AuthContext);

  // Declared Refs
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // Declared States
  const [formIsValid, setFormIsValid] = useState(false);
  const [error, setError] = useState(null);
  const [isPassVisible, setPassVisible] = useState(false);

  // Declared Navigate
  let navigate = useNavigate();

  // Declared Reducers
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  // Declared UseEffect
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  // Defined Change Handlers
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };
  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  // Defined Validation Handlers
  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };
  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };
  const passwordVisibleHandler = (event) => {
    if (isPassVisible === true) {
      setPassVisible(false);
      event.target.parentElement.parentElement.children[1].type = "password";
    } else {
      setPassVisible(true);
      event.target.parentElement.parentElement.children[1].type = "string";
    }
  };

  // Defined Submit Handler
  const submitHandler = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      if (formIsValid) {
        const data = {
          email: emailState.value,
          password: passwordState.value,
        };
        const res = await sendPostRequest(
          "http://localhost:8080/api/v1/auth/login",
          data
        );

        if (res.data.status === "success") {
          showAlert("success", "Logged in successfully");

          const userType = res.data.data.user.type;

          authCtx.login(res.data.token);
          authCtx.loginUserType(userType);

          userCtx.setUserHandler(res.data.data.user);

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.token}`;

          if (userType === "STUDENT") {
            navigate("/student-dashboard");
          } else if (userType === "FACULTY") {
            navigate("/faculty-dashboard");
          } else {
            showAlert("error", "Invalid user type, Please try again.");
            navigate("/");
          }
        }
      } else if (!emailIsValid) {
        emailInputRef.current.focus();
        setError("Please enter a valid email address");
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
      if (
        err.response.data.message ===
        "Invalid user type. Please enter valid user type"
      ) {
        navigate("/");
      }
    }
  };

  return (
    <>
      <form className="login__form" onSubmit={submitHandler}>
        <div className="login__form--header">Welcome</div>

        <div className="login__form--body">
          <div className="login__form--group">
            <Input
              ref={emailInputRef}
              id="email"
              label={<i className="fa-solid fa-user login__form--icon"></i>}
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

          <div className="login__form--group">
            <Input
              ref={passwordInputRef}
              id="password"
              label={<i className="fa-solid fa-lock login__form--icon"></i>}
              type="password"
              name="password"
              placeholder="Password"
              isValid={passwordIsValid}
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
            <span onClick={passwordVisibleHandler}>
              <i
                className={`fa-solid ${
                  isPassVisible ? "fa-eye" : "fa-eye-slash"
                } login__form--eye-icon`}
              ></i>
            </span>
          </div>

          {error && (
            <p className="login__form--error">
              <i className="fa-solid fa-circle-exclamation"></i>
              {error}
            </p>
          )}
        </div>

        <div className="login__form--footer">
          <button className="login--btn btn" type="submit">
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
