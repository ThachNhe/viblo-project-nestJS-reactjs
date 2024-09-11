import React, { createContext, useState } from "react";
// Initiate Context
const AppContext = createContext();
// Provide Context
export const AppProvider = ({ children }) => {
  const [isHomePage, setIsHomePage] = useState(true);

  const [isHiddenNavbar, setIsHiddenNavbar] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isHomePage,
        setIsHomePage,
        isHiddenNavbar,
        setIsHiddenNavbar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export { AppContext };
export default AppProvider;
