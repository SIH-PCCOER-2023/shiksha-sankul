import React, { useState } from 'react';

const UserContext = React.createContext({
  user: {},
  userHandler: () => {},
});

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({});

  const userHandler = (user) => {
    setUser(user);
  };

  const contextValue = {
    user: user,
    userHandler: userHandler,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
