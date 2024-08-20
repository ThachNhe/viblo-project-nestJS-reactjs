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

const Navbar = () => {
  const navigator = useNavigate();
  const isLogin = useSelector((state) => state?.auth);

  useEffect(() => {
    if (!isLogin) {
      navigator("/login");
    }
  }, []);

  console.log("check login L ", isLogin);
  return (
    <div className="sticky w-full bg-white z-10 shadow-md top-0 h-[60px]">
      <div className=" py-1">
        <Container>
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
            <div className="flex flex-row gap-10">
              <Logo />
              <MainMenu />
            </div>
            <div className="flex flex-row gap-5 items-center">
              <Search />
              <Notification isLogin={true} />
              <Auth isLogin={true} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
