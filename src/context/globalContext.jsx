import { createContext, useEffect, useState } from "react";

const GlobalContextProvider = createContext();

export const GlobalContextWrapper = ({ children }) => {
  const [allChecks, setAllChecks] = useState(() => {
    const saved = localStorage.getItem("toolboxChecks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("toolboxChecks", JSON.stringify(allChecks));
  }, [allChecks]);

  return (
    <GlobalContextProvider.Provider
      value={{
        allChecks,
        setAllChecks,
      }}
    >
      {children}
    </GlobalContextProvider.Provider>
  );
};

export default GlobalContextProvider;
