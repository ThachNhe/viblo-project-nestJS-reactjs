import { useEffect, useState } from "react";
import UserInfo from "../../components/UserInfo";
import ArticleStats from "../../components/ArticleStats";
import Posts from "../../components/Posts";
import PostSection from "./PostSection";
import PostInfo from "../../components/PostInfo";
import CommentForm from "../../components/CommentForm";
import "react-perfect-scrollbar/dist/css/styles.css";
import Footer from "./Footer";
import ProposedCourse from "../../components/ProposedCourse";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/action/index";
import * as services from "../../services/index";
import CommentSection from "./CommentSection.";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import {extractHeadings} from '../../utils/utils'

const data = [
  {
    title: "How to push code to github repository",
    author: "Dinh Van Thach",
    readTime: 5,
    viewNumber: 10,
    commentNumber: 5,
    bookmarkNumber: 1,
    point: 10,
  },
  {
    title: "How to push code to github repository",
    author: "Dinh Van Thach",
    readTime: 5,
    viewNumber: 10,
    commentNumber: 5,
    bookmarkNumber: 1,
    point: 10,
  },

  {
    title: "How to push code to github repository",
    author: "Dinh Van Thach",
    readTime: 5,
    viewNumber: 10,
    commentNumber: 5,
    bookmarkNumber: 1,
    point: 10,
  },

  {
    title: "How to push code to github repository",
    author: "Dinh Van Thach",
    readTime: 5,
    viewNumber: 10,
    commentNumber: 5,
    bookmarkNumber: 1,
    point: 10,
  },

  {
    title: "How to push code to github repository",
    author: "Dinh Van Thach",
    readTime: 5,
    viewNumber: 10,
    commentNumber: 5,
    bookmarkNumber: 1,
    point: 10,
  },

  {
    title: "How to push code to github repository",
    author: "Dinh Van Thach",
    readTime: 5,
    viewNumber: 10,
    commentNumber: 5,
    bookmarkNumber: 1,
    point: 10,
  },

  {
    title: "How to push code to github repository",
    author: "Dinh Van Thach",
    readTime: 5,
    viewNumber: 10,
    commentNumber: 5,
    bookmarkNumber: 1,
    point: 10,
  },

  {
    title: "How to push code to github repository",
    author: "Dinh Van Thach",
    readTime: 5,
    viewNumber: 10,
    commentNumber: 5,
    bookmarkNumber: 1,
    point: 10,
  },

  {
    title: "How to push code to github repository",
    author: "Dinh Van Thach",
    readTime: 5,
    viewNumber: 10,
    commentNumber: 5,
    bookmarkNumber: 1,
    point: 10,
  },

  {
    title: "How to push code to github repository",
    author: "Dinh Van Thach",
    readTime: 5,
    viewNumber: 10,
    commentNumber: 5,
    bookmarkNumber: 1,
    point: 10,
  },
];
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function Homepage() {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.post);
  const comments = useSelector((state) => state.comment.commentByPostId);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [responseId, setResponseId] = useState(0);
  const [isUpvote, setIsUpvote] = useState(false);
  const [isDownvote, setIsDownvote] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const location = useLocation();
  const [toc, setToc] = useState([]);

  const [defaultPostId, setDefaultPostId] = useState(
    location?.state?.data ? location?.state?.data : 17
  );

  useEffect(() => {
    dispatch(actions.getPostById(defaultPostId));
    dispatch(actions.getCommentByPostId(defaultPostId));
  }, []);

  useEffect(() => {
    const user = post?.data?.userVotes.find(
      (vote) => +vote?.user?.id === +userInfo?.data?.user?.id
    );

    const bookmark = post?.data?.bookmarkers.find(
      (bookmarker) => +bookmarker?.id === +userInfo?.data?.user?.id
    );

    const headings = extractHeadings(post?.data?.content_markdown);
    setToc(headings);

    if (+bookmark?.id === +userInfo?.data?.user?.id) {
      setIsBookmark(true);
    }

    if (+bookmark?.id !== +userInfo?.data?.user?.id) {
      setIsBookmark(false);
    }

    if (user?.voteType === "UPVOTE") {
      setIsUpvote(true);
      setIsDownvote(false);
    }

    if (user?.voteType === "DOWNVOTE") {
      setIsUpvote(false);
      setIsDownvote(true);
    }

    if (!user) {
      setIsUpvote(false);
      setIsDownvote(false);
    }
  }, [post]);

  const handleCreateComment = async (newComment) => {
    try {
      const commentInfo = await services.createComment(newComment);
      if (commentInfo?.success) {
        dispatch(actions.getCommentByPostId(post?.data?.id));
        toast.success("Bình luận thành công!");
      }
      return commentInfo;
    } catch (err) {
      toast.error("Bình luận thất bại!");
      console.log("err : ", err);
    }
  };

  const handlerOpenResponseForm = (commentId) => {
    setResponseId(commentId);
  };

  const handlerSubmitvote = async (voteType) => {
    const payload = {
      voteType: voteType,
    };

    try {
      const voteInfo = await services.votePost(payload, post?.data?.id);
      voteInfo.success && dispatch(actions.getPostById(post?.data?.id));
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const handlerBookmark = async () => {
    try {
      if (isBookmark) {
        const res = await services.unbookmark(post?.data?.id);
        if (res?.success) {
          // setIsBookmark(false);
          dispatch(actions.getPostById(post?.data?.id));
        }
      }

      if (!isBookmark) {
        const res = await services.bookmark(post?.data?.id);
        if (res?.success) {
          // setIsBookmark(true);
          dispatch(actions.getPostById(post?.data?.id));
        }
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };



  return (
    <>
      <div className="flex flex-col min-h-screen border">
        {/* Banner */}
        <div className="flex items-center justify-center mb-10">
          <img
            src="/images/banner.png"
            alt="Banner Image"
            className="max-w-full h-auto rounded-lg"
          />
        </div>

        {/* Content */}
        <div className="container mx-auto my-8 px-4 max-w-[1140px]">
          <div className="flex gap-5">
            {/* <!-- Nội dung chính --> */}
            <div className="flex gap-4 w-3/4">
              <PostInfo
                upvote={isUpvote}
                downvote={isDownvote}
                isBookmark={isBookmark}
                voteNumber={post?.data?.vote_number}
                handlerUpvote={() => handlerSubmitvote("UPVOTE")}
                handlerDownvote={() => handlerSubmitvote("DOWNVOTE")}
                handlerBookmark={handlerBookmark}
                // facebook={true}
                // twitter={true}
              />
              <div className="flex-1 pr-4 lg:pr-2">
                <div>
                  <div>
                    <div className="flex gap-2 items-center justify-between">
                      <UserInfo
                        fullName={post?.data?.author?.fullName}
                        userName={post?.data?.author?.userName}
                        starNumber={post?.data?.author?.star_number}
                        followerNumber={post?.data?.author?.follower_number}
                        postNumber={post?.data?.author?.post_number}
                      />

                      <div className="flex flex-col gap-2">
                        <span>Đã đăng vào {post?.data?.createdDate}</span>
                        <div className=" float-right">
                          <ArticleStats
                            viewNumber={post?.data?.view_number}
                            commentNumber={post?.data?.comments?.length}
                            bookmarkNumber={post?.data?.bookmark_number}
                          />
                        </div>
                      </div>
                    </div>
                    <Posts
                      data={post?.data?.content_markdown}
                      tags={post?.data?.tags_array}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Sidebar bên phải --> */}

            <div className="flex-grow p-1 rounded-md flex flex-col gap-10 py-2">
              <div>
                <div className="flex gap-4">
                  <h4 className="text-md mb-4 uppercase font-medium">
                    Mục lục
                  </h4>
                  <hr className="flex-grow text-red-full text-red-900 mt-4" />
                </div>
                <div>
                  <ul>
                    {toc.map((heading, index) => (
                      <li
                        key={index}
                        style={{ marginLeft: (heading.depth - 1) * 20 }}
                        className="font-medium text-gray-600 text-sm"
                      >
                        <span className="hover:text-cyan-600">
                          {heading.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-72">
                <div className="flex gap-4">
                  <h4 className="text-md mb-4 uppercase text-blue-600 hover:underline font-medium">
                    Câu đố đề xuất
                  </h4>
                  <hr className="flex-grow text-red-full text-red-900 mt-4" />
                </div>
                <div className="flex">
                  <Slider {...settings}>
                    {[1.2].map((item, index) => {
                      return (
                        <div key={index}>
                          <ProposedCourse />
                        </div>
                      );
                    })}
                  </Slider>
                </div>
              </div>
            </div>
          </div>

          <PostSection data={data} sectionName={"Bài viết liên quan"} />
          {/* <PostSection
            data={data}
            sectionName={"Bài viết khác của văn Thạch"}
          /> */}

          <CommentForm
            title={"Bình luận"}
            postId={post?.data?.id}
            userId={userInfo?.data?.user?.id}
            parentId={0}
            onCreateComment={handleCreateComment}
            replyForUserId={""}
            replyForUserName={""}
          />

          {comments &&
            comments.data?.length > 0 &&
            comments?.data?.map((comment, index) => {
              return (
                <div key={index}>
                  <CommentSection
                    comment={comment}
                    parentId={comment.id}
                    postId={post?.data?.id}
                    userId={userInfo?.data?.user?.id}
                    key={index}
                    handlerOpenResponseForm={handlerOpenResponseForm}
                    responseId={responseId}
                    commentId={+comment.id}
                    onCreateComment={handleCreateComment}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
