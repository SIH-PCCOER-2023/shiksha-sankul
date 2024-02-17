import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  userType: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  loginUserType: (user) => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("jwt", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("jwt");
  };

  const loginUserTypeHandler = (loginUser) => {
    setUserType(loginUser);
  };

  const contextValue = {
    token: token,
    userType: userType,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    loginUserType: loginUserTypeHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
