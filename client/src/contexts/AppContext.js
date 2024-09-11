import React, { createContext, useState } from "react";
// Initiate Context
const AppContext = createContext();
// Provide Context
export const AppProvider = ({ children }) => {
  const [isHomePage, setIsHomePage] = useState(true);

  const [isHiddenNavbar, setIsHiddenNavbar] = useState(false);

  const [
    isOpenDropdownCommonNotification,
    setIsOpenDropdownCommonNotification,
  ] = useState(false);

  const [
    isOpenDropdownPersonalNotification,
    setIsOpenDropdownPersonalNotification,
  ] = useState(false);

  const [isOpenDropdownWriteMenu, setIsOpenDropdownWriteMenu] = useState(false);

  const [isOpenDropdownUserMenu, setIsOpenDropdownUserMenu] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isHomePage,
        setIsHomePage,
        isOpenDropdownCommonNotification,
        setIsOpenDropdownCommonNotification,
        isOpenDropdownPersonalNotification,
        setIsOpenDropdownPersonalNotification,
        isOpenDropdownWriteMenu,
        setIsOpenDropdownWriteMenu,
        isOpenDropdownUserMenu,
        setIsOpenDropdownUserMenu,
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
