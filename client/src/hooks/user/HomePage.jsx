import Navbar from "../../components/navbar/Navbar";
import Container from "../../components/Container";
import UserInfo from "../../components/UserInfo";
import ArticleStats from "../../components/ArticleStats";
import Posts from "../../components/Posts";
function homepage() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col min-h-screen">
        <div className="">
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
                <Posts />
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
          </div>

          {/* Related posts */}
          
        </div>
      </div>
      <footer></footer>
    </>
  );
}

export default homepage;
