import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { PiListDashesBold } from "react-icons/pi";
import { FaRegQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import ClickOutside from "../ClickOutside";

const CommonNotification = () => {
  const navigator = useNavigate();
  const isLogin = useSelector((state) => state?.auth?.isLogin);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

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
            {/* <span
              className="absolute top-1 right-1 transform translate-x-1/2 -translate-y-1/2 bg-red-500
         text-white text-xs font-semibold rounded-full px-1  "
            >
              7
            </span> */}
            <span
                className={`absolute -top-0.5 right-0 z-1 h-3 w-3 rounded-full bg-red-500 items-center ${
                  "inline"
                }`}
              >
                <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75 
                 ">
                  <span className="animate-none text-xs text-white text-center ml-0.5">5</span>
                </span>
              </span>
            <div className="group cursor-pointer">
              <svg
                height={23}
                width={23}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#000000"
                strokeWidth="0.696"
                className="transition duration-300 group-hover:stroke-neutral-500 group-hover:fill-neutral-500"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    opacity="0.4"
                    d="M10.7509 2.45007C11.4509 1.86007 12.5809 1.86007 13.2609 2.45007L14.8409 3.80007C15.1409 4.05007 15.7109 4.26007 16.1109 4.26007H17.8109C18.8709 4.26007 19.7409 5.13007 19.7409 6.19007V7.89007C19.7409 8.29007 19.9509 8.85007 20.2009 9.15007L21.5509 10.7301C22.1409 11.4301 22.1409 12.5601 21.5509 13.2401L20.2009 14.8201C19.9509 15.1201 19.7409 15.6801 19.7409 16.0801V17.7801C19.7409 18.8401 18.8709 19.7101 17.8109 19.7101H16.1109C15.7109 19.7101 15.1509 19.9201 14.8509 20.1701L13.2709 21.5201C12.5709 22.1101 11.4409 22.1101 10.7609 21.5201L9.18086 20.1701C8.88086 19.9201 8.31086 19.7101 7.92086 19.7101H6.17086C5.11086 19.7101 4.24086 18.8401 4.24086 17.7801V16.0701C4.24086 15.6801 4.04086 15.1101 3.79086 14.8201L2.44086 13.2301C1.86086 12.5401 1.86086 11.4201 2.44086 10.7301L3.79086 9.14007C4.04086 8.84007 4.24086 8.28007 4.24086 7.89007V6.20007C4.24086 5.14007 5.11086 4.27007 6.17086 4.27007H7.90086C8.30086 4.27007 8.86086 4.06007 9.16086 3.81007L10.7509 2.45007Z"
                    className="transition duration-300 group-hover:fill-neutral-500"
                  />
                  <path
                    d="M12 16.8701C11.45 16.8701 11 16.4201 11 15.8701C11 15.3201 11.44 14.8701 12 14.8701C12.55 14.8701 13 15.3201 13 15.8701C13 16.4201 12.56 16.8701 12 16.8701Z"
                    fill="#292D32"
                    className="transition duration-300 group-hover:fill-neutral-500"
                  />
                  <path
                    d="M12 13.7199C11.59 13.7199 11.25 13.3799 11.25 12.9699V8.12988C11.25 7.71988 11.59 7.37988 12 7.37988C12.41 7.37988 12.75 7.71988 12.75 8.12988V12.9599C12.75 13.3799 12.42 13.7199 12 13.7199Z"
                    fill="#292D32"
                    className="transition duration-300 group-hover:fill-neutral-500"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {isOpenDropdown && (
        <div
          className={`absolute right-0 mt-2.5 top-10 flex h-96  min-w-80 flex-col rounded-xs border border-stroke bg-white shadow-md`}
        >
          <div className="px-4 py-3">
            <h5 className="text-sm text-neutral-600 font-semibold">
              Thông báo chung
            </h5>
          </div>
          <ul className="flex flex-col h-96 font-medium text-gray-500 overflow-y-auto custom-scrollbar">
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
          <div className="px-4 py-3 border-t">
            <h5 className="text-sm font-medium text-neutral-600">
              Tất cả thông tin
            </h5>
          </div>
        </div>
      )}
    </ClickOutside>
  );
};

export default CommonNotification;
