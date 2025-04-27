import React, { createContext, useState } from 'react';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadAgain, setLoadAgain] = useState(0);

  return (
    <UserContext.Provider value={{ user, setUser, loadAgain, setLoadAgain }}>
        { children }
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }