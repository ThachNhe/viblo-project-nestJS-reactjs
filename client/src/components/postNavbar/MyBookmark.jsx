"use client";
import React, { useEffect } from "react";
import Banner from "../Banner";
import PostRoute from "../../routes/PostRoute";
import PostNavbar from "./PostNavBar";

const MyBookmark = () => {
  useEffect(() => {});

  return (
    <div className="flex flex-col min-h-screen border">
      <Banner src={"/images/banner.png"} />
      <div className=" my-8 bg-slate-600">
        <PostNavbar/>
        <PostRoute/>
      </div>
    </div>
  );
};

export default MyBookmark;
