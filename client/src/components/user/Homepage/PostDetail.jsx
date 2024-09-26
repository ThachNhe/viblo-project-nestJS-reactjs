import { useEffect, useState, useRef } from "react";
import UserInfo from "./UserInfo";
import ArticleStats from "../../ArticleStats";
import Posts from "./Posts";
import PostSection from "../PostSection";
import PostInfo from "./PostInfo";
import CommentForm from "./CommentForm";
import "react-perfect-scrollbar/dist/css/styles.css";
import Footer from "./Footer";
import ProposedCourse from "./ProposedCourse";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/action/index";
import * as services from "../../../services/index";
import CommentSection from "./CommentSection.";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import { extractHeadings } from "../../../utils/utils";
import Banner from "./Banner";
import NoComment from "./NoComment";
import { socket } from "../../../socket";
import { useParams } from "react-router-dom";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function PostDetail() {
  const dispatch = useDispatch();
  // const post = useSelector((state) => state.post.post);
  const comments = useSelector((state) => state.comment.commentByPostId);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const relatedPosts = useSelector((state) => state.post.relatedPosts);
  const [responseId, setResponseId] = useState(0);
  const [isUpvote, setIsUpvote] = useState(false);
  const [isDownvote, setIsDownvote] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const location = useLocation();
  const [toc, setToc] = useState([]);
  const [defaultPostId, setDefaultPostId] = useState(
    location?.state?.data ? location?.state?.data : 17
  );
  const { slug } = useParams();
  const postBySlug = useSelector((state) => state.post.postBySlug);
  console.log("slug : ", slug);

  useEffect(() => {
    dispatch(actions.getPostBySlug(slug));

    socket.on("newComment", (commentData) => {
      if (commentData?.postId === defaultPostId) {
        dispatch(actions.getCommentByPostId(defaultPostId));
      }
    });

    return () => {
      socket.off("newComment");
    };
  }, []);
  //======================

  useEffect(() => {
    dispatch(actions.getCommentByPostId(postBySlug?.data?.id));
    dispatch(actions.getRelatedPosts(postBySlug?.data?.id));
  }, [postBySlug]);

  // Xử lý sự kiện cuộn của nội dung bài viết
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);
  const [isContentScrolledToEnd, setIsContentScrolledToEnd] = useState(false);

  // Xử lý sự kiện cuộn của phần nội dung bài viết
  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement) {
      const handleScroll = () => {
        const { scrollHeight, scrollTop, clientHeight } = contentElement;
        if (scrollHeight - scrollTop === clientHeight) {
          setIsContentScrolledToEnd(true); // Đã cuộn hết phần nội dung
        } else {
          setIsContentScrolledToEnd(false);
        }
      };

      // Thêm sự kiện cuộn vào phần tử nội dung
      contentElement.addEventListener("scroll", handleScroll);

      return () => {
        contentElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  //======================

  useEffect(() => {
    const user = postBySlug?.data?.userVotes.find(
      (vote) => +vote?.user?.id === +userInfo?.data?.user?.id
    );

    const bookmark = postBySlug?.data?.bookmarkers.find(
      (bookmarker) => +bookmarker?.id === +userInfo?.data?.user?.id
    );

    const headings = extractHeadings(postBySlug?.data?.content_markdown);
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
  }, [postBySlug]);

  const handleCreateComment = async (newComment) => {
    try {
      const commentInfo = await services.createComment(newComment);
      if (commentInfo?.success) {
        dispatch(actions.getCommentByPostId(postBySlug?.data?.id));
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
      const voteInfo = await services.votePost(payload, postBySlug?.data?.id);
      console.log("voteInfo : ", voteInfo);
      voteInfo.success && dispatch(actions.getPostById(postBySlug?.data?.id));
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const handlerBookmark = async () => {
    try {
      if (isBookmark) {
        const res = await services.unbookmark(postBySlug?.data?.id);
        if (res?.success) {
          // setIsBookmark(false);
          dispatch(actions.getPostById(postBySlug?.data?.id));
        }
      }

      if (!isBookmark) {
        const res = await services.bookmark(postBySlug?.data?.id);
        if (res?.success) {
          // setIsBookmark(true);
          dispatch(actions.getPostById(postBySlug?.data?.id));
        }
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };
  return (
    <>
      <div className="flex flex-col min-h-screen border">
        <Banner src={"/images/banner.png"} />
        {/* Content */}
        <div className="container mx-auto my-8 px-4 max-w-[1140px] bg-homepage  ">
          <div className="flex gap-2 flex-1 overflow-auto">
            {/* <!-- Nội dung chính --> */}
            <main
              ref={contentRef}
              className="flex gap-4 w-3/4 h-screen overflow-y-scroll overflow-x-hidden scrollbar-hidden"
            >
              <PostInfo
                upvote={isUpvote}
                downvote={isDownvote}
                isBookmark={isBookmark}
                voteNumber={postBySlug?.data?.vote_number}
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
                        fullName={postBySlug?.data?.author?.fullName}
                        userName={postBySlug?.data?.author?.userName}
                        starNumber={postBySlug?.data?.author?.star_number}
                        followerNumber={postBySlug?.data?.author?.follower_number}
                        postNumber={postBySlug?.data?.author?.post_number}
                      />

                      <div className="flex flex-col gap-2">
                        <span>Đã đăng vào {postBySlug?.data?.createdDate}</span>
                        <div className=" float-right">
                          <ArticleStats
                            viewNumber={postBySlug?.data?.view_number}
                            commentNumber={postBySlug?.data?.comments?.length}
                            bookmarkNumber={postBySlug?.data?.bookmark_number}
                          />
                        </div>
                      </div>
                    </div>
                    <Posts
                      data={postBySlug?.data?.content_markdown}
                      tags={postBySlug?.data?.tags_array}
                    />
                  </div>
                </div>
              </div>
            </main>

            {/* <!-- Sidebar bên phải --> */}
            <aside
              className={`flex-grow p-1 rounded-md flex flex-col gap-10 py-2  overflow-y-scroll h-screen custom-scrollbar overflow-x-hidden ${
                isContentScrolledToEnd ? "" : "sticky top-96"
              }`}
              ref={sidebarRef}
            >
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
                          <span className="hover:text-cyan-600 cursor-pointer">
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
            </aside>
          </div>
          <div className="py-14">
            {relatedPosts?.data?.length > 0 && (
              <PostSection
                post={relatedPosts?.data}
                sectionName={"Bài viết liên quan"}
              />
            )}

            {relatedPosts?.data?.length > 0 && (
              <PostSection
                post={relatedPosts?.data}
                sectionName={"Bài viết khác của văn Thạch"}
              />
            )}
          </div>

          <CommentForm
            title={"Bình luận"}
            postId={postBySlug?.data?.id}
            userId={userInfo?.data?.user?.id}
            parentId={0}
            onCreateComment={handleCreateComment}
            replyForUserId={""}
            replyForUserName={""}
          />

          {comments && comments?.data?.length > 0 ? (
            comments?.data?.map((comment, index) => {
              return (
                <div key={index}>
                  <CommentSection
                    comment={comment}
                    parentId={comment.id}
                    postId={postBySlug?.data?.id}
                    userId={userInfo?.data?.user?.id}
                    key={index}
                    handlerOpenResponseForm={handlerOpenResponseForm}
                    responseId={responseId}
                    commentId={+comment.id}
                    onCreateComment={handleCreateComment}
                  />
                </div>
              );
            })
          ) : (
            <NoComment />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PostDetail;
