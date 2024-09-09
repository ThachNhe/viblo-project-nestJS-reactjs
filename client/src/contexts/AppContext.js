import React, { createContext, useState } from "react";
// Initiate Context
const AppContext = createContext();
// Provide Context
export const AppProvider = ({ children }) => {
  const [isHomePage, setIsHomePage] = useState(true);
  return (
    <AppContext.Provider value={{ isHomePage, setIsHomePage }}>
      {children}
    </AppContext.Provider>
  );
};
export { AppContext };
export default AppProvider;
