import { createContext, useState } from "react";

const CurrentToolCheckContextProvider = createContext();

export const CurrentToolCheckContextWrapper = ({ children }) => {
  const [currentCheck, setCurrentCheck] = useState({
    uid: "",
    toolboxSerNo: "",
    toolboxNSN: "",
    toolboxDesc: "",
    checkedBy: "",
    checkedDate: "",
    signature: "",
    tools: [],
  });

  return (
    <CurrentToolCheckContextProvider.Provider
      value={{
        currentCheck,
        setCurrentCheck,
      }}
    >
      {children}
    </CurrentToolCheckContextProvider.Provider>
  );
};

export default CurrentToolCheckContextProvider;
