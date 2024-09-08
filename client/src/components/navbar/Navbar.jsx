"use client";
import React, { useEffect } from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import MainMenu from "./MainMenu";
import Notification from "./Notification";
import Auth from "./Auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WriteMenu from "./WriteMenu";
const Navbar = ({ isHomePage }) => {
  const navigator = useNavigate();
  const isLogin = useSelector((state) => state?.auth?.isLogin);

  useEffect(() => {
    if (!isLogin) {
      navigator("/login");
    }
  }, [navigator, isLogin]);

  console.log("check login L ", isLogin);
  return (
    <div className="sticky w-full bg-white z-10 shadow-md top-0 h-[60px] ">
      <div className=" py-1">
        <Container isHomePage={isHomePage}>
          <div
            className="
                    flex
                    flex-row
                    items-center
                    justify-between
                    gap-3
                    md:gap-0
                   "
          >
            <div className="flex flex-row gap-10 ">
              <Logo />
              <MainMenu />
            </div>
            <div className="flex flex-row gap-5 items-center">
              {isHomePage && <Search />}
              <Notification isLogin={true} />
              <WriteMenu />
              <Auth isLogin={isLogin} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
