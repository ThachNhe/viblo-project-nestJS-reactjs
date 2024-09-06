import Navbar from "../../components/navbar/Navbar";
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

function Homepage() {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.post);
  const comments = useSelector((state) => state.comment.commentByPostId);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [responseId, setResponseId] = useState(0);
  const [isUpvote, setIsUpvote] = useState(false);
  const [isDownvote, setIsDownvote] = useState(false);

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
        <div className="container mx-auto my-8 px-4 max-w-[1140px]">
          <div className="flex gap-5">
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

            <div className="flex-grow p-1rounded-md flex flex-col gap-10 py-2">
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
          </div>

          <PostSection data={data} sectionName={"Bài viết liên quan"} />
          <PostSection
            data={data}
            sectionName={"Bài viết khác của văn Thạch"}
          />

          <CommentForm
            title={"Bình luận"}
            postId={post?.data?.id}
            userId={userInfo?.data?.user?.id}
            parentId={0}
            onCreateComment={handleCreateComment}
            replyForUserId={""}
            replyForUserName={""}
          />

          {comments?.map((comment, index) => {
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
