// UserContext.js
import React, { createContext, useContext, useState } from 'react';

// Define the context and its default values
const UserContext = createContext({
  Username: '',
  Role: '',
  setUser: () => {}
});

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ Username: '', Role: '' });

  return (
    <UserContext.Provider value={{ ...user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the UserContext
export const useUser = () => useContext(UserContext);
