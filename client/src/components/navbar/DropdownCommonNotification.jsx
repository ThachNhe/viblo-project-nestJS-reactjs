import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/action/index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { PiListDashesBold } from "react-icons/pi";
import { FaRegQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import ClickOutside from "../ClickOutside";

const CommonNotification = () => {
  const navigator = useNavigate();
  const isLogin = useSelector((state) => state?.auth?.isLogin);
  const [isOpenDropdown, setIsOpenDropdown] = useState(
    false
  );
  const dispatch = useDispatch();

  useEffect(() => {}, [navigator]);

  const toggleOpen = () => {
   
    setIsOpenDropdown(!isOpenDropdown);
  };

  const handlerToPublishPage = useCallback(() => {
    navigator("/publish/post");
  });

  const menuItems = [
    { label: "Viết bài", action: handlerToPublishPage, icon: <CiEdit /> },
    {
      label: "Series mới",
      action: () => console.log("Series mới"),
      icon: <PiListDashesBold />,
    },
    {
      label: "Đặt câu hỏi",
      action: () => console.log("Series mới"),
      icon: <FaRegQuestionCircle />,
    },
  ];

  return (
    <ClickOutside onClick={() => setIsOpenDropdown(false)} className="relative">
      <div className="flex flex-row items-center gap-3">
        <div onClick={() => toggleOpen()} className="p-2">
          <div className="relative inline-block">
            <span
              className="absolute top-1 right-1 transform translate-x-1/2 -translate-y-1/2 bg-red-500
         text-white text-xs font-semibold rounded-full px-1  "
            >
              7
            </span>
            <svg
              className="text-gray-400 hover:text-gray-600" // Màu xanh (blue)
              width="25px"
              height="25px"
              viewBox="0 0 24.00 24.00"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor" // Dùng currentColor để thay đổi stroke
              strokeWidth="1.584"
              transform="rotate(0)"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7ZM11 9C10.4477 9 10 9.44772 10 10C10 10.5523 10.4477 11 11 11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V10C13 9.44772 12.5523 9 12 9H11Z"
                  fill="currentColor" // Dùng currentColor để thay đổi fill
                />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {isOpenDropdown && (
        <div
          className={`absolute right-0 mt-2.5 top-10 flex h-96  min-w-80 flex-col rounded-md border border-stroke bg-white shadow-md`}
        >
          <div className="px-4 py-3">
            <h5 className="text-sm text-gray-500 font-semibold">
              Thông báo chung
            </h5>
          </div>
          <PerfectScrollbar>
            <ul className="flex flex-col h-96 font-medium text-gray-500">
              <li>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 px-4 py-3 hover:bg-slate-100 group hover:text-blue-400 "
                  to="#"
                >
                  <p className="text-sm hover:text-blue-400">
                    <span className=" dark:text-white">
                      Edit your information in a swipe
                    </span>{" "}
                    Sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim.
                  </p>

                  <p className="text-xs hover:text-blue-400">12 May, 2025</p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke  hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 px-4 py-3 hover:bg-slate-100 "
                  to="#"
                >
                  <p className="text-sm hover:text-blue-400">
                    <span className=" dark:text-white">
                      It is a long established fact
                    </span>{" "}
                    that a reader will be distracted by the readable.
                  </p>

                  <p className="text-xs hover:text-blue-400">24 Feb, 2025</p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke  hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 px-4 py-3 hover:bg-slate-100 "
                  to="#"
                >
                  <p className="text-sm hover:text-blue-400">
                    <span className=" dark:text-white">
                      There are many variations
                    </span>{" "}
                    of passages of Lorem Ipsum available, but the majority have
                    suffered
                  </p>

                  <p className="text-xs">04 Jan, 2025</p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke px-4 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 hover:bg-slate-100 "
                  to="#"
                >
                  <p className="text-sm">
                    <span className="text-black dark:text-white">
                      There are many variations
                    </span>{" "}
                    of passages of Lorem Ipsum available, but the majority have
                    suffered
                  </p>

                  <p className="text-xs">01 Dec, 2024</p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke px-4 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 hover:bg-slate-100 "
                  to="#"
                >
                  <p className="text-sm">
                    <span className=" dark:text-white">
                      There are many variations
                    </span>{" "}
                    of passages of Lorem Ipsum available, but the majority have
                    suffered
                  </p>

                  <p className="text-xs">01 Dec, 2024</p>
                </Link>
              </li>
            </ul>
          </PerfectScrollbar>
          <div className="px-4 py-3 border-t">
            <h5 className="text-sm font-medium text-bodydark2">
              Tất cả thông tin
            </h5>
          </div>
        </div>
      )}
    </ClickOutside>
  );
};

export default CommonNotification;
