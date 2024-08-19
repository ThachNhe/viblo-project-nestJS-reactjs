"use client";
import React from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import MainMenu from "./MainMenu";
import Notification from "./Notification";
import Auth from "./Auth";
const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className=" py-1 border-b-[1px]">
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
            <div className="flex flex-row gap-5  items-center">
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
