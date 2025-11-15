import { createContext, useEffect, useState } from "react";

const GlobalContextProvider = createContext();

export const GlobalContextWrapper = ({ children }) => {
  const [allChecks, setAllChecks] = useState(() => {
    const saved = localStorage.getItem("toolboxChecks");
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("myBoxUser");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("toolboxChecks", JSON.stringify(allChecks));
  }, [allChecks]);

  useEffect(() => {
    localStorage.setItem("myBoxUser", JSON.stringify(user));
  }, [user]);

  return (
    <GlobalContextProvider.Provider
      value={{
        allChecks,
        setAllChecks,
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContextProvider.Provider>
  );
};

export default GlobalContextProvider;
