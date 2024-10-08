import { useEffect, useState, useRef, useCallback } from "react";
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
import CommentSection from "./CommentSection";
import toast from "react-hot-toast";
import Slider from "react-slick";
import { extractHeadings } from "../../../utils/utils";
import Banner from "./Banner";
import NoComment from "./NoComment";
import { socket } from "../../../socket";
import { useNavigate, useParams } from "react-router-dom";
import TableOfContents from "./TableOfContent";
import BannerImg from "../../../images/cover/banner.png";
import { useLocation } from "react-router-dom";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function PostDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comments = useSelector((state) => state.comment.commentByPostId);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const relatedPosts = useSelector((state) => state.post.relatedPosts);
  const postBySlug = useSelector((state) => state.post.postBySlug);
  const [responseId, setResponseId] = useState(0);
  const [isUpvote, setIsUpvote] = useState(false);
  const [isDownvote, setIsDownvote] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const { slug } = useParams();
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState("");
  // Xử lý sự kiện cuộn của nội dung bài viết
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);
  const [isContentScrolledToEnd, setIsContentScrolledToEnd] = useState(false);
  const location = useLocation();
  const { commentId = 0, scrollTrigger = false, postId } = location.state || {};

  useEffect(() => {
    dispatch(actions.getPostBySlug(slug));
    dispatch(actions.getUsersNotifications());
    postId && dispatch(actions.getCommentByPostId(postId));
    socket.on("newComment", (commentData) => {
      if (+commentData?.postId === +postBySlug?.data?.id) {
        dispatch(actions.getCommentByPostId(postBySlug?.data?.id));
      }
    });
    return () => {
      socket.off("newComment");
    };
  }, []);

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

  useEffect(() => {
    if (commentId) {
      const commentElement = document.getElementById(`comment-${commentId}`);
      console.log("commentElement : ", commentElement);

      if (commentElement) {
        commentElement.scrollIntoView({ behavior: "smooth" });
      }
    }
    console.log("scrollTrigger : ", scrollTrigger);
    console.log("commentId : ", commentId);
    console.log("postId : ", postId);
  }, [commentId, scrollTrigger]);

  // Sử dụng hiệu ứng để trích xuất tiêu đề khi mount component
  useEffect(() => {
    dispatch(actions.getCommentByPostId(postBySlug?.data?.id));
    dispatch(actions.getRelatedPosts(postBySlug?.data?.id));
    const user = postBySlug?.data?.userVotes.find(
      (vote) => +vote?.user?.id === +userInfo?.data?.user?.id
    );

    const bookmark = postBySlug?.data?.bookmarkers.find(
      (bookmarker) => +bookmarker?.id === +userInfo?.data?.user?.id
    );

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
    const headingsFromMarkdown = extractHeadings(
      postBySlug?.data?.content_markdown
    );
    setHeadings(headingsFromMarkdown);
  }, [postBySlug]);

  // Cuộn mượt mà tới phần nội dung khi nhấn vào mục lục
  const scrollToSection = (id) => {
    setActiveHeading(id);
    const element = document.getElementById(id);
    const headerOffset = 80;
    const elementPosition = element?.getBoundingClientRect().top || 0;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;
    if (element) {
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Theo dõi phần tiêu đề hiện tại khi cuộn trang
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY + 100; // Thêm offset để tính toán chính xác hơn

  //     // Tìm heading cuối cùng mà người dùng đã cuộn qua
  //     const currentHeading = headings.reduce((acc, heading) => {
  //       const element = document.getElementById(heading.id);
  //       if (element && element.offsetTop <= scrollPosition) {
  //         return heading.id;
  //       }
  //       console.log("acc : ", acc);
  //       return acc;
  //     }, "");

  //     if (currentHeading !== activeHeading) {
  //       setActiveHeading(currentHeading);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   // Gọi handleScroll ngay lập tức để set active heading ban đầu
  //   handleScroll();

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [headings, activeHeading]);


  // Xử lý sự kiện cuộn của phần nội dung bài viết

  useEffect(() => {
    dispatch(actions.getPostBySlug(slug));
  }, [slug]);

  const handleCreateComment = async (newComment) => {
    try {
      const commentInfo = await services.createComment(newComment);
      if (commentInfo?.success) {
        dispatch(actions.getCommentByPostId(postBySlug?.data?.id));
        dispatch(actions.getPostBySlug(slug));
        // dispatch(actions.getUsersNotifications());
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
      voteInfo.success && dispatch(actions.getPostBySlug(slug));
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const handlerBookmark = async () => {
    try {
      if (isBookmark) {
        const res = await services.unbookmark(postBySlug?.data?.id);
        if (res?.success) {
          dispatch(actions.getPostBySlug(slug));
        }
      }

      if (!isBookmark) {
        const res = await services.bookmark(postBySlug?.data?.id);
        if (res?.success) {
          dispatch(actions.getPostBySlug(slug));
        }
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };

  
 
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Banner src={BannerImg} />
        {/* Content */}
        <div className="container mx-auto my-8 px-4 max-w-[1190px] bg-homepage">
          <div className="flex gap-2 flex-1 overflow-auto">
            {/* <!-- Nội dung chính --> */}
            <main
              ref={contentRef}
              className="flex gap-4 w-5/6 h-screen overflow-y-scroll overflow-x-hidden scrollbar-hidden"
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
                        followerNumber={
                          postBySlug?.data?.author?.follower_number
                        }
                        postNumber={postBySlug?.data?.author?.post_number}
                        userAvatar={postBySlug?.data?.author?.avatar}
                        
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
              className={`w-1/3 p-1 rounded-md flex flex-col gap-10 py-2  overflow-y-scroll h-screen custom-scrollbar overflow-x-hidden ${
                isContentScrolledToEnd ? "" : "sticky top-96"
              }`}
              ref={sidebarRef}
            >
              <div className="flex-grow p-1 rounded-md flex flex-col gap-10 py-2">
                <TableOfContents
                  headings={headings}
                  activeHeading={activeHeading}
                  onClick={scrollToSection}
                />
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
                          courseName={"Lập trình C cơ bản với CTO"}
                          time={"thg 8 26, 2024 3:04 SA"}
                          tags={[
                            { name: "Abstract" },
                            { name: "Control Structures" },
                          ]}
                          level={"cơ bản"}
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
