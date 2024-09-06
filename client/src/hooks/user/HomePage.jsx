import Navbar from "../../components/navbar/Navbar";
import { useEffect, useRef, useState } from "react";
import UserInfo from "../../components/UserInfo";
import ArticleStats from "../../components/ArticleStats";
import Posts from "../../components/Posts";
import PostSection from "./PostSection";
import PostInfo from "../../components/PostInfo";
import CommentForm from "../../components/CommentForm";
import Comment from "../../components/Comment";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import Footer from "./Footer";
import ProposedCourse from "../../components/ProposedCourse";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/action/index";
import * as services from "../../services/index";
import CommentSection from "./CommentSection.";
// var toc = require("markdown-toc");
// import markdownToc from "markdown-toc";

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

const commentData = [
  {
    id: "1",
    content: "Bài viết quá hay OKOKOO!!",
    parentId: "0",
    parentName: "",
    row_number: "0",
    date: "thg 8 26, 2024 8:29 SA",
    user: {
      id: "3",
      fullName: "dinh van thach",
      userName: "thachdinh001",
    },
    comments: [
      {
        id: "2",
        content: "Đúng vậy!!",
        parentId: "1",
        parentName: "Dinh Van Thach",
        date: "thg 8 26, 2024 8:29 SA",
        user: {
          id: "3",
          fullName: "dinh van thach",
          userName: "thachdinh001",
        },
      },
      {
        id: "3",
        content: "Cam on ban ve bai viet!!",
        parentId: "1",
        parentName: "Khan Tra",
        date: "thg 8 26, 2024 8:29 SA",

        user: {
          id: "3",
          fullName: "dinh van thach",
          userName: "thachdinh001",
        },
      },
    ],
  },
  {
    id: "4",
    content: "Bài viết quá hay!!",
    parentId: "0",
    parentName: "",
    date: "thg 8 26, 2024 8:29 SA",

    user: {
      id: "3",
      fullName: "dinh van thach",
      userName: "thachdinh001",
    },
    comments: [
      {
        id: "5",
        content: "Đúng vậy!!",
        parentId: "1",
        parentName: "Dinh Van Thach",
        date: "thg 8 26, 2024 8:29 SA",

        user: {
          id: "3",
          fullName: "dinh van thach",
          userName: "thachdinh001",
        },
      },
    ],
  },
];

function Homepage() {
  const scrollbarRef = useRef(null);
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.post);
  const comments = useSelector((state) => state.comment.commentByPostId);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [parentId, setParentId] = useState(0);
  const [responseId, setResponseId] = useState(0);
  const [userVoteType, setUserVoteType] = useState();
  const [isUpvote, setIsUpvote] = useState(false);
  const [isDownvote, setIsDownvote] = useState(false);
  const handleCreateComment = async (newComment) => {
    try {
      const commentInfo = await services.createComment(newComment);
      dispatch(actions.getCommentByPostId(post?.data?.id));
      return commentInfo;
    } catch (err) {
      console.log("err : ", err);
    }
  };

  useEffect(() => {
    dispatch(actions.getPostById(17));
    dispatch(actions.getCommentByPostId(post?.data?.id));
  }, []);

  const handlerOpenResponseForm = (commentId) => {
    setResponseId(commentId);
  };

  useEffect(() => {
   
    const user = post?.data?.userVotes.find(
      (vote) => +vote?.user?.id === +userInfo?.data?.user?.id
    );
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

  const handlerSubmitvote = async (voteType) => {
    const payload = {
      userId: userInfo?.data?.user?.id,
      postId: post?.data?.id,
      voteType: voteType,
    };

    try {
      const voteInfo = await services.votePost(payload);
      voteInfo.success && dispatch(actions.getPostById(post?.data?.id));
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const handlerBookmark = () => {
    console.log("bookmark");
  };

  return (
    <>
      <Navbar isHomePage={true} />
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
        <div className="container mx-auto my-8 px-4 lg:px-40">
          <div className="flex">
            {/* <!-- Nội dung chính --> */}
            <div className="flex gap-4">
              <PostInfo
                upvote={isUpvote}
                downvote={isDownvote}
                voteNumber={post?.data?.vote_number}
                handlerUpvote={() => handlerSubmitvote("UPVOTE")}
                handlerDownvote={() => handlerSubmitvote("DOWNVOTE")}
                handlerBookmark={handlerBookmark}
                // facebook={true}
                // twitter={true}
              />
              <div className="flex-1 pr-4 lg:pr-2">
                <div style={{ height: "1000px", padding: "10px" }}>
                  <PerfectScrollbar>
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
                  </PerfectScrollbar>
                </div>
              </div>
            </div>

            {/* <!-- Sidebar bên phải --> */}
            <PerfectScrollbar style={{ height: "700px", padding: "10px" }}>
              <div className="flex-grow p-1 bg-zinc-50 rounded-md flex flex-col gap-10 py-2">
                <div>
                  <div className="flex gap-4">
                    <h4 className="text-md mb-4 uppercase font-medium">
                      Mục lục
                    </h4>
                    <hr className="flex-grow text-red-full text-red-900 mt-4" />
                  </div>
                  <ul className="list-disc pl-4 text-gray-700">
                    <li>Hiểu rõ về toán tử OR (||)</li>
                    <li>Hiểu rõ về toán tử nullish (??)</li>
                    <li>Hiểu rõ về toán tử OR (||)</li>
                    <li>Hiểu rõ về toán tử nullish (??)</li>
                    <li>Hiểu rõ về toán tử OR (||)</li>
                    <li>Hiểu rõ về toán tử nullish (??)</li>
                    <li>Hiểu rõ về toán tử OR (||)</li>
                    <li>Hiểu rõ về toán tử nullish (??)</li>
                    <li>...</li>
                  </ul>
                </div>
                <div>
                  <div className="flex gap-4">
                    <h4 className="text-md mb-4 uppercase text-blue-600 hover:underline font-medium">
                      Câu đố đề xuất
                    </h4>
                    <hr className="flex-grow text-red-full text-red-900 mt-4" />
                  </div>
                  <div>
                    <ProposedCourse />
                    <ProposedCourse />
                    <ProposedCourse />
                    <ProposedCourse />
                  </div>
                </div>
              </div>
            </PerfectScrollbar>
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
            parentName={""}
            onCreateComment={handleCreateComment}
          />

          {/* {comments?.data &&
            comments?.data.length > 0 &&
            comments.data.map((comment, index) => {
              return (
                <Comment
                  isAnswer={false}
                  fullName={comment.user.fullName}
                  userName={comment.user.userName}
                  date={comment.date}
                  content={comment.content}
                  submitComment={() => console.log("submit comment")}
                />
              );
            })} */}
          {commentData.map((comment, index) => {
            return (
              <div key={index}>
                <CommentSection
                  comment={comment}
                  key={index}
                  handlerOpenResponseForm={handlerOpenResponseForm}
                  responseId={responseId}
                  commentId={+comment.id}
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
