import React, { useState } from 'react';

const UserContext = React.createContext({
  userName: '',
  userNameHandler: () => {},
});

export const UserContextProvider = (props) => {
  const [name, setName] = useState(null);

  const nameHandler = (name) => {
    setName(name);
  };

  const contextValue = {
    userName: name,
    userNameHandler: nameHandler,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
