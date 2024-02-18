import React, { useState } from "react";

const UserContext = React.createContext({
  user: {},
  setUserHandler: (user) => {},
  removeUserHandler: () => {},
});

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({});

  const setUserHandler = (user) => {
    setUser(user);
  };

  const removeUserHandler = () => {
    setUser(null);
  };

  const contextValue = {
    user: user,
    setUserHandler: setUserHandler,
    removeUserHandler: removeUserHandler,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
