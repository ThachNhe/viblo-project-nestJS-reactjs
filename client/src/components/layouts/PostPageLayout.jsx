import React, { useEffect, useState } from "react";
import Banner from "../user/Homepage/Banner";
import Slider from "react-slick";
import PostNavbar from "../postNavbar/PostNavBar";
import ProposedCourse from "../user/Homepage/ProposedCourse";
import Footer from "../user/Homepage/Footer";
import { Outlet } from "react-router-dom";
import BannerImg from '../../images/cover/banner.png';


const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const PostPageLayout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Banner src={BannerImg} />
        <div className="bg-post-nav-bar">
          <PostNavbar />
        </div>
        <div className="container mx-auto my-8 px-4 max-w-[1140px] ">
          <main className="flex gap-5 flex-1 h-screen">
            {/* CHILDREN SECTION */}
            <div className="flex flex-col gap-2 w-3/4 overflow-y-scroll scrollbar-hidden">
              <Outlet />
            </div>
            {/* CHILDREN SECTION */}

            <div className="flex flex-col gap-3 items-center overflow-y-scroll overflow-x-hidden custom-scrollbar">
              <div className="flex-grow p-1 rounded-md flex flex-col gap-10 py-2 px-5">
                <div className="w-72">
                  <div className="flex gap-4">
                    <h4 className="text-md mb-4 uppercase text-blue-600 hover:underline font-medium">
                      Khoá học đề xuất
                    </h4>
                    <hr className="flex-grow text-red-full text-neutral-900 mt-4" />
                  </div>
                  <div className="flex">
                    <Slider {...settings}>
                      <div>
                        <ProposedCourse
                          courseName={"Lập trình cùng Thạch nhé"}
                          time={"thg 8 26, 2024 3:04 SA"}
                          tags={[
                            { name: "Abstract" },
                            { name: "Control Structures" },
                          ]}
                          level={"Cơ bản"}
                          viewNumber={10}
                          studentNumber={35}
                          questionNumber={99}
                          docNumber={22}
                        />
                      </div>
                    </Slider>
                  </div>
                </div>
              </div>
              <div className="flex-grow p-1 rounded-md flex flex-col gap-10 py-2 px-5">
                <div className="w-72">
                  <div className="flex gap-4">
                    <h4 className="text-md mb-4 uppercase text-blue-600 hover:underline font-medium">
                      Khoá học đề xuất
                    </h4>
                    <hr className="flex-grow text-red-full text-neutral-900 mt-4" />
                  </div>
                  <div className="flex">
                    <Slider {...settings}>
                      <div>
                        <ProposedCourse
                          courseName={"Lập trình cùng Thạch nhé"}
                          time={"thg 8 26, 2024 3:04 SA"}
                          tags={[
                            { name: "Abstract" },
                            { name: "Control Structures" },
                          ]}
                          level={"Cơ bản"}
                          viewNumber={10}
                          studentNumber={35}
                          questionNumber={99}
                          docNumber={22}
                        />
                      </div>
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </main>
          {/* CHILDREN SECTION */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostPageLayout;
