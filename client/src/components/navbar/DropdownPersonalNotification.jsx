import ClickOutside from "../ClickOutside";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/action/index";
import { FaRegBell } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";


const DropdownPersonalNotification = () => {
  const navigator = useNavigate();
  const isLogin = useSelector((state) => state?.auth?.isLogin);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {}, [navigator]);

  const toggleOpen = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  return (
    <ClickOutside onClick={() => setIsOpenDropdown(false)} className="relative">
      <div className="flex flex-row items-center gap-3">
        <div onClick={() => toggleOpen()} className="p-2">
          <div className="relative inline-block">
            <span
              className="absolute top-0 right-1 transform translate-x-1/2 -translate-y-1/2 bg-red-500
         text-white text-xs font-semibold rounded-full px-1 "
            >
              2
            </span>
            <FaRegBell className="text-xl font-extrabold text-neutral-500 cursor-pointer hover:text-neutral-600 transition duration-300" />
          </div>
        </div>
      </div>

      {isOpenDropdown && (
        <div
          className={`absolute right-0 mt-2.5 top-10 flex h-96  min-w-80 flex-col rounded-xs border bg-white shadow-md`}
        >
          <div className="px-4 py-3">
            <h5 className="text-sm font-semibold text-neutral-600">Thông báo</h5>
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
            <h5 className="text-sm font-medium text-center hover:text-blue-400 hover:underline text-neutral-500">
              Xem tất cả
            </h5>
          </div>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownPersonalNotification;
