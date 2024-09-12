import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/action/index";
import { useLocation } from "react-router-dom";
import PostCard from "../../PostCard";

function Items({ currentItems }) {
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

  const handlePageChange = (selectedItem) => {
    try {
      const newPage = selectedItem.selected + 1;
      setPage(newPage);
      navigate(`/followings?page=${newPage}`);
      dispatch(actions.getPaginationPosts(newPage, 10));

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (e) {
      console.log("ERROR : ", e);
    }
  };

  return (
    <>
      <Items currentItems={paginationPosts?.data} />
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
        disabledClassName={"text-gray-400 "}
      />
    </>
  );
};

export default FollowingPost;
