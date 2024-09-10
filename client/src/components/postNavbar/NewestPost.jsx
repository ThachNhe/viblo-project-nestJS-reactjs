
import React, { useEffect } from "react";
import Banner from "../../components/Banner";
import PostRoute from "../../routes/PostRoute";
import PostNavbar from "../../components/postNavbar/PostNavBar";

function NewestPost() {
  return ( 
    <div className="flex flex-col min-h-screen border">
      <Banner src={"/images/banner.png"} />
      <div className=" mx-auto my-8 bg-slate-600">
        <PostNavbar/>
      </div>
    </div>
   );
}

export default NewestPost;
