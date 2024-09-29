import React, { useEffect } from "react";
import Container from "../Container";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
const PostNavbar = () => {
  const navigator = useNavigate();
  const isLogin = useSelector((state) => state?.auth?.isLogin);

  useEffect(() => {
    if (!isLogin) {
      navigator("/login");
    }
  }, [navigator, isLogin]);

  return (
    <div className="w-full bg-slate-800 shadow-md  py-4">
      <div className=" py-1">
        <Container>
          <div className="flex items-center gap-20 justify-center ">
            <div>
              <ul className="flex gap-6 items-center mx-auto uppercase font-semibold  text-post-nav-bar justify-center text-sm">
                <li className="hover:underline hover:underline-offset-8 hover:decoration-2 text-gray-200">
                  <NavLink
                    to="/followings"
                    className={({ isActive }) =>
                      isActive
                        ? "underline underline-offset-8 decoration-2 "
                        : ""
                    }
                  >
                    Đang theo dõi
                  </NavLink>
                </li>

                <li className="hover:underline hover:underline-offset-8 hover:decoration-2 text-gray-200">
                  <NavLink
                    to="newest"
                    className={({ isActive }) =>
                      isActive
                        ? "underline underline-offset-8 decoration-2 "
                        : ""
                    }
                  >
                    Mới nhất
                  </NavLink>
                </li>
                <li className="hover:underline hover:underline-offset-8 hover:decoration-2 text-gray-200">
                  <NavLink
                    to="/series"
                    className={({ isActive }) =>
                      isActive
                        ? "underline underline-offset-8 decoration-2 "
                        : ""
                    }
                  >
                    Series
                  </NavLink>
                </li>
                <li className="hover:underline hover:underline-offset-8 hover:decoration-2 text-gray-200">
                  <NavLink
                    to="/editors-choice"
                    className={({ isActive }) =>
                      isActive
                        ? "underline underline-offset-8 decoration-2 "
                        : ""
                    }
                  >
                    Editors' Choice
                  </NavLink>
                </li>
                <li className="hover:underline hover:underline-offset-8 hover:decoration-2 text-gray-200">
                  <NavLink
                    to="/trending"
                    className={({ isActive }) =>
                      isActive
                        ? "underline underline-offset-8 decoration-2 "
                        : ""
                    }
                  >
                    Trending
                  </NavLink>
                </li>
                <li className="hover:underline hover:underline-offset-8 hover:decoration-2 text-gray-200">
                  <NavLink
                    to="/videos"
                    className={({ isActive }) =>
                      isActive
                        ? "underline underline-offset-8 decoration-2 "
                        : ""
                    }
                  >
                    Videos
                  </NavLink>
                </li>
                <li className="hover:underline hover:underline-offset-8 hover:decoration-2 text-gray-200">
                  <NavLink
                    to="/clip/posts"
                    className={({ isActive }) =>
                      isActive
                        ? "underline underline-offset-8 decoration-2 "
                        : ""
                    }
                  >
                    Bookmark của tôi
                  </NavLink>
                </li>
              </ul>
            </div>
            <div>
              <button
                type="button"
                className=" px-3 text-xs  inline-flex items-center rounded-sm py-2
                 bg-blue-500 text-gray-100 font-semibold text-center gap-2 hover:bg-blue-600 uppercase"
                onClick={() => navigator("/publish/post")}
              >
                <span className="flex items-center gap-1">
                  <svg
                    className="text-gray-100"
                    width="12px"
                    height="12px"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    strokeWidth="1.584"
                    transform="rotate(0)"
                  >
                    <path
                      d="M8.29289 3.70711L1 11V15H5L12.2929 7.70711L8.29289 3.70711Z"
                      fill="currentColor"
                    />
                    <path
                      d="M9.70711 2.29289L13.7071 6.29289L15.1716 4.82843C15.702 4.29799 16 3.57857 16 2.82843C16 1.26633 14.7337 0 13.1716 0C12.4214 0 11.702 0.297995 11.1716 0.828428L9.70711 2.29289Z"
                      fill="currentColor"
                    />
                  </svg>
                  Viết bài
                </span>
              </button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default PostNavbar;
