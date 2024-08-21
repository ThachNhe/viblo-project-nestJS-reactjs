import Navbar from "../../components/navbar/Navbar";
import Container from "../../components/Container";
import UserInfo from "../../components/UserInfo";
import ArticleStats from "../../components/ArticleStats";
import Posts from "../../components/Posts";
import CarInfo from "../../components/CardInfo";
import PostSection from "./PostSection";
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
const markdown = `
# Giới thiệu về Node.js

Node.js là một môi trường chạy JavaScript phía server dựa trên V8 engine, được phát triển bởi Google. Được phát hành lần đầu tiên vào năm 2009 bởi Ryan Dahl, Node.js đã nhanh chóng trở thành một trong những công nghệ phổ biến nhất trong phát triển web.

## Lịch sử ra đời

Trước khi Node.js xuất hiện, JavaScript chỉ được sử dụng trong các trình duyệt web phía client. Điều này có nghĩa là các nhà phát triển chỉ có thể sử dụng JavaScript để xử lý tương tác người dùng, kiểm tra đầu vào và thực hiện các thay đổi trên trang web. Tuy nhiên, với sự xuất hiện của Node.js, JavaScript đã vượt ra khỏi phạm vi của trình duyệt và được sử dụng trên server để phát triển các ứng dụng web phía backend.

## Kiến trúc và thiết kế

Node.js được thiết kế dựa trên kiến trúc sự kiện bất đồng bộ (asynchronous event-driven architecture), cho phép xử lý nhiều yêu cầu cùng lúc mà không bị chặn (non-blocking). Điều này mang lại hiệu suất cao hơn so với các server truyền thống như Apache hay IIS, vốn thường sử dụng các mô hình luồng xử lý (threading models) để quản lý nhiều yêu cầu.

### Event Loop

Một trong những đặc điểm nổi bật nhất của Node.js là "event loop" – vòng lặp sự kiện. Đây là một vòng lặp liên tục kiểm tra các sự kiện cần xử lý. Nếu có sự kiện nào cần xử lý, nó sẽ kích hoạt callback tương ứng. Nếu không, nó sẽ tiếp tục chờ đợi các sự kiện khác.

`;
function homepage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen border">
        {/* Banner */}
        <div class="flex items-center justify-center">
          <img
            src="/images/banner.png"
            alt="Banner Image"
            class="max-w-full h-auto rounded-lg"
          />
        </div>

        {/* Content */}
        <div class="container mx-auto my-8 px-4 lg:px-40">
          <div class="flex">
            {/* <!-- Nội dung chính --> */}
            <div class=" flex-1 pr-4 lg:pr-8">
              <div className="flex gap-2 items-center justify-between">
                <UserInfo
                  fullName={"dinhvanthach"}
                  userName={"thachdinh"}
                  starNumber={100}
                  followerNumber={50}
                  postNumber={20}
                />

                <div className="flex flex-col gap-2">
                  <span>Đã đăng vào thg 8 6, 3:22 CH trong 13 phút đọc</span>
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
              data = {markdown}
              />
            </div>

            {/* <!-- Sidebar bên phải --> */}
            <div class="w-64  bg-gray-50 p-6 shadow-md rounded-lg">
              <h2 class="text-xl font-semibold mb-4">Mục lục</h2>
              <ul class="list-disc pl-4 text-gray-700">
                <li>Hiểu rõ về toán tử OR (||)</li>
                <li>Hiểu rõ về toán tử nullish (??)</li>
                <li>...</li>
              </ul>
            </div>
          </div>

          <PostSection data={data} sectionName={"Bài viết liên quan"} />
          <PostSection
            data={data}
            sectionName={"Bài viết khác của văn Thạch"}
          />
        </div>
      </div>
      <footer></footer>
    </>
  );
}

export default homepage;
