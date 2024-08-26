import Navbar from "../../components/navbar/Navbar";
import { useEffect, useRef } from "react";
import UserInfo from "../../components/UserInfo";
import ArticleStats from "../../components/ArticleStats";
import Posts from "../../components/Posts";
import CarInfo from "../../components/CardInfo";
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
const markdownContent = `
# Giới thiệu về Node.js

Node.js là một môi trường chạy JavaScript phía server dựa trên V8 engine, được phát triển bởi Google. Được phát hành lần đầu tiên vào năm 2009 bởi Ryan Dahl, Node.js đã nhanh chóng trở thành một trong những công nghệ phổ biến nhất trong phát triển web.

## Lịch sử ra đời

Trước khi Node.js xuất hiện, JavaScript chỉ được sử dụng trong các trình duyệt web phía client. Điều này có nghĩa là các nhà phát triển chỉ có thể sử dụng JavaScript để xử lý tương tác người dùng, kiểm tra đầu vào và thực hiện các thay đổi trên trang web. Tuy nhiên, với sự xuất hiện của Node.js, JavaScript đã vượt ra khỏi phạm vi của trình duyệt và được sử dụng trên server để phát triển các ứng dụng web phía backend.

## Kiến trúc và thiết kế

Node.js được thiết kế dựa trên kiến trúc sự kiện bất đồng bộ (asynchronous event-driven architecture), cho phép xử lý nhiều yêu cầu cùng lúc mà không bị chặn (non-blocking). Điều này mang lại hiệu suất cao hơn so với các server truyền thống như Apache hay IIS, vốn thường sử dụng các mô hình luồng xử lý (threading models) để quản lý nhiều yêu cầu.

### Event Loop

Một trong những đặc điểm nổi bật nhất của Node.js là "event loop" – vòng lặp sự kiện. Đây là một vòng lặp liên tục kiểm tra các sự kiện cần xử lý. Nếu có sự kiện nào cần xử lý, nó sẽ kích hoạt callback tương ứng. Nếu không, nó sẽ tiếp tục chờ đợi các sự kiện khác.

`;

function Homepage() {
  const scrollbarRef = useRef(null);
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.post);
  useEffect(() => {
    dispatch(actions.getPostById(17));
  }, []);
  useEffect(() => {
    console.log("post : ", post);
  }, [post]);
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
              <PostInfo />
              <div className="flex-1 pr-4 lg:pr-2">
                <div style={{ height: "1000px", padding: "10px" }}>
                  <PerfectScrollbar
                  // ref={scrollbarRef}
                  // onYReachEnd={handleYReachEnd}
                  // options={{
                  //   wheelSpeed: 0.35, // Điều chỉnh tốc độ cuộn, giảm giá trị để cuộn mượt hơn
                  //   swipeEasing: true, // Bật easing khi cuộn
                  //   suppressScrollX: false, // Tắt cuộn ngang nếu không cần thiết
                  // }}
                  >
                    <div>
                      <div className="flex gap-2 items-center justify-between">
                        <UserInfo
                          fullName={"dinhvanthach"}
                          userName={"thachdinh"}
                          starNumber={100}
                          followerNumber={50}
                          postNumber={20}
                        />

                        <div className="flex flex-col gap-2">
                          <span>
                            Đã đăng vào thg 8 6, 3:22 CH trong 13 phút đọc
                          </span>
                          <div className=" float-right">
                            <ArticleStats
                              viewNumber={20}
                              commentNumber={50}
                              bookmarkNumber={34}
                            />
                          </div>
                        </div>
                      </div>
                      <Posts
                        data={post?.data?.content_markdown}
                        tags={post?.data?.tags_array}
                      />
                      {/* <TestMarkdown /> */}
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
          <PostSection
            data={data}
            sectionName={"Bài viết khác của văn Thạch"}
          />
          <CommentForm title={"Bình luận"} />
          <Comment
            isAnswer={true}
            fullName={"Dinh Van Thach"}
            userName={"thachdinh"}
            date={"thg 7 27, 2021 1:20 CH"}
            content={`Chào bạn, Cảm ơn bạn đã chia sẻ. Cho mình hỏi việc quy ước là không
            nên dùng camelCase mà dùng snake_case, kebab-case, bạn tham khảo ở
            đâu, hay dẫn chứng ở đâu mà ghi nó là "best practice" vậy? Bạn đang
            viết về Rest API hay Restful API vậy?`}
            submitComment={() => console.log("submit comment")}
          />
          <Comment
            isAnswer={false}
            fullName={"Cao Thang"}
            userName={"thangtiencao"}
            date={"thg 7 27, 2021 1:20 CH"}
            content={`Chào bạn, Cảm ơn bạn đã chia sẻ. Cho mình hỏi việc quy ước là không
            nên dùng camelCase mà dùng snake_case, kebab-case, bạn tham khảo ở
            đâu, hay dẫn chứng ở đâu mà ghi nó là "best practice" vậy? Bạn đang
            viết về Rest API hay Restful API vậy?`}
            submitComment={() => console.log("submit comment")}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
