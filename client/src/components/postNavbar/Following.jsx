"use client";
import React, { useEffect, useState } from "react";
import Banner from "../Banner";
import Slider from "react-slick";
import PostNavbar from "./PostNavBar";
import ProposedCourse from "../ProposedCourse";
import PostCard from "../PostCard";
import Footer from "../../hooks/user/Footer";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.length > 0 &&
        currentItems.map((item, index) => {
          return (
            <PostCard
              authorName={item.authorName}
              date={item.date}
              title={item.title}
              tags={item.tags}
              viewNumber={item.viewNumber}
              commentNumber={item.commentNumber}
              bookmarkNumber={item.bookmarkNumber}
              voteNumber={item.voteNumber}
            />
          );
        })}
    </>
  );
}
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const postData = [
  {
    authorName: "Duong hoang Vu",
    date: "thg 8 26, 2024 3:04 SA",
    title: ` Hướng Dẫn Kích Hoạt Chức Năng Rung Trên Điện Thoại Bằng JavaScript –
            Tăng Tương Tác Cho Ứng Dụng Web Di Động`,
    tags: [{ name: "java" }],
    viewNumber: 5,
    commentNumber: 10,
    bookmarkNumber: 15,
    voteNumber: 5,
  },
  {
    authorName: "Tran Duy Khanh",
    date: "thg 8 26, 2024 3:04 SA",
    title: ` Sử Dụng Patch Package Để Tùy Chỉnh NPM Package Theo Ý Muốn`,
    tags: [{ name: "java" }],
    viewNumber: 5,
    commentNumber: 10,
    bookmarkNumber: 15,
    voteNumber: 8,
  },
  {
    authorName: "Nguyen nhat Le",
    date: "thg 8 26, 2024 3:04 SA",
    title: ` Hướng Dẫn Kích Hoạt Chức Năng Rung Trên Điện Thoại Bằng JavaScript –
            Tăng Tương Tác Cho Ứng Dụng Web Di Động`,
    tags: [{ name: "java" }],
    viewNumber: 5,
    commentNumber: 10,
    bookmarkNumber: 15,
    voteNumber: 5,
  },
  {
    authorName: "Duong hoang Vu",
    date: "thg 8 26, 2024 3:04 SA",
    title: ` Hướng Dẫn Kích Hoạt Chức Năng Rung Trên Điện Thoại Bằng JavaScript –
            Tăng Tương Tác Cho Ứng Dụng Web Di Động`,
    tags: [{ name: "java" }],
    viewNumber: 5,
    voteNumber: 5,
    commentNumber: 10,
    bookmarkNumber: 15,
  },
  {
    authorName: "Tran Duy Khanh",
    date: "thg 8 26, 2024 3:04 SA",
    title: ` Sử Dụng Patch Package Để Tùy Chỉnh NPM Package Theo Ý Muốn`,
    tags: [{ name: "java" }],
    viewNumber: 5,
    commentNumber: 10,
    bookmarkNumber: 15,
    voteNumber: 5,
  },
  {
    authorName: "Nguyen nhat Le",
    date: "thg 8 26, 2024 3:04 SA",
    title: ` Hướng Dẫn Kích Hoạt Chức Năng Rung Trên Điện Thoại Bằng JavaScript –
            Tăng Tương Tác Cho Ứng Dụng Web Di Động`,
    tags: [{ name: "java" }],
    viewNumber: 5,
    commentNumber: 10,
    bookmarkNumber: 15,
    voteNumber: 5,
  },
  {
    authorName: "Duong hoang Vu",
    date: "thg 8 26, 2024 3:04 SA",
    title: ` Hướng Dẫn Kích Hoạt Chức Năng Rung Trên Điện Thoại Bằng JavaScript –
            Tăng Tương Tác Cho Ứng Dụng Web Di Động`,
    tags: [{ name: "java" }],
    viewNumber: 5,
    commentNumber: 10,
    bookmarkNumber: 15,
    voteNumber: 5,
  },
  {
    authorName: "Tran Duy Khanh",
    date: "thg 8 26, 2024 3:04 SA",
    title: ` Sử Dụng Patch Package Để Tùy Chỉnh NPM Package Theo Ý Muốn`,
    tags: [{ name: "java" }],
    viewNumber: 5,
    commentNumber: 10,
    voteNumber: 5,

    bookmarkNumber: 15,
  },
  {
    authorName: "Nguyen nhat Le",
    date: "thg 8 26, 2024 3:04 SA",
    title: ` Hướng Dẫn Kích Hoạt Chức Năng Rung Trên Điện Thoại Bằng JavaScript –
            Tăng Tương Tác Cho Ứng Dụng Web Di Động`,
    tags: [{ name: "java" }],
    viewNumber: 5,
    commentNumber: 10,
    bookmarkNumber: 15,
    voteNumber: 5,
  },
];

const Following = ({ itemsPerPage = 4 }) => {
  useEffect(() => {});
  const navigate = useNavigate();
  const pageCount = Math.ceil(items.length / itemsPerPage);
  const handlePageChange = (selectedItem) => {
    const newPage = selectedItem.selected + 1;
    navigate(`/followings?page=${newPage}`);
  };

  //============
  return (
    <>
      <div className="flex flex-col min-h-screen border">
        <Banner src={"/images/banner.png"} />
        <div className="bg-post-nav-bar">
          <PostNavbar />
        </div>
        <div className="container mx-auto my-8 px-4 max-w-[1140px] ">
          <div className="flex gap-5">
            <div className="flex flex-col gap-4 w-3/4 ">
              <Items currentItems={postData} />
            </div>
            <div className="flex-grow p-1 rounded-md flex flex-col gap-10 py-2">
              <div className="w-72">
                <div className="flex gap-4">
                  <h4 className="text-md mb-4 uppercase text-blue-600 hover:underline font-medium">
                    Khoá học đề xuất
                  </h4>
                  <hr className="flex-grow text-red-full text-red-900 mt-4" />
                </div>
                <div className="flex">
                  <Slider {...settings}>
                    <div>
                      <ProposedCourse
                        courseName={"Java"}
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
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageChange}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName={"flex justify-center my-5"}
          pageClassName={"mx-1"}
          pageLinkClassName={"px-4 py-2 border border-gray-300 rounded-md"}
          previousClassName={"mx-1"}
          previousLinkClassName={"px-4 py-2 border border-gray-300 rounded-md"}
          nextClassName={"mx-1"}
          nextLinkClassName={"px-4 py-2 border border-gray-300 rounded-md"}
          breakClassName={"mx-1"}
          breakLinkClassName={"px-4 py-2 border border-gray-300 rounded-md"}
          activeClassName={"bg-blue-500 text-white"}
          disabledClassName={"text-gray-400"}
        />
      </div>
      <Footer />
    </>
  );
};

export default Following;
