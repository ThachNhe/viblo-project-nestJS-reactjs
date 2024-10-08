import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/action/index";
import { useLocation } from "react-router-dom";
import PostCard from "../../PostCard";

function Items({ currentItems, handlerShowPostDetail }) {
  return (
    <>
      {currentItems &&
        currentItems?.length > 0 &&
        currentItems?.map((item, index) => {
          return (
            <PostCard
              authorName={item?.author?.fullName}
              date={item.created_at}
              title={item.title}
              tags={item.tags_array}
              viewNumber={item.view_number}
              commentNumber={item.comment_number}
              bookmarkNumber={item.bookmark_number}
              voteNumber={item.vote_number}
              imgURL={item?.author?.avatar}
              key={index}
              slug={item.slug}
              handlerClick={handlerShowPostDetail}
            />
          );
        })}
    </>
  );
}

const FollowingPost = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paginationPosts = useSelector((state) => state?.post?.paginationPosts);
  const [page, setPage] = useState(queryParams.get("page") || 1);

  useEffect(() => {
    dispatch(actions.getPaginationPosts(page, 10));
  }, []);

  useEffect(() => {
    const page = parseInt(queryParams.get("page")) || 1;
    setPage(page);
  }, [location.search]);

  const handlePageChange = (selectedItem) => {
    try {
      const newPage = selectedItem.selected + 1;
      const limit = 10;
      setPage(newPage);
      navigate(`/followings?page=${newPage}`);
      dispatch(actions.getPaginationPosts(newPage, limit));

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (e) {
      console.log("ERROR : ", e);
    }
  };

  const handlerShowPostDetail = (slug) => {
    navigate(`/p/${slug}`);
  };

  return (
    <>
      <Items
        currentItems={paginationPosts?.data}
        handlerShowPostDetail={handlerShowPostDetail}
      />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        pageCount={paginationPosts?.meta?.totalPages || 2}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName={"flex justify-center my-5"}
        pageClassName={"mx-1"}
        forcePage={page - 1}
        pageLinkClassName={
          "px-4 py-2 border border-gray-500 rounded-md border-2 h-10 w-10"
        }
        previousClassName={"mx-1"}
        previousLinkClassName={
          "px-4 py-2 border border-gray-500 rounded-md border-2"
        }
        nextClassName={"mx-1"}
        nextLinkClassName={
          "px-4 py-2 border border-gray-500 rounded-md border-2"
        }
        breakClassName={"mx-1"}
        breakLinkClassName={
          "px-4 py-2 border border-gray-500 rounded-md border-2"
        }
        activeClassName={" text-blue-600  font-semibold bg-slate-200"}
        disabledClassName={"text-neutral-500 "}
      />
    </>
  );
};

export default FollowingPost;
