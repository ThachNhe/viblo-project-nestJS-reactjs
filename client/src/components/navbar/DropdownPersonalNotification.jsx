import ClickOutside from "../ClickOutside";
import { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React from "react";
import Avatar from "./Avatar";

const DropdownPersonalNotification = ({
  data,
  handlerMarkAsRead,
  unReadNumber,
}) => {
  const navigator = useNavigate();
  const [scrollTrigger, setScrollTrigger] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const toggleOpen = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  const handlerShowCommentDetail = async (
    postSlug,
    commentId,
    notificationId
  ) => {
    try {
      handlerMarkAsRead(notificationId);
      navigator(`/p/${postSlug}`, {
        state: { commentId, scrollTrigger: scrollTrigger },
      });
      setScrollTrigger(!scrollTrigger);
      setIsOpenDropdown(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ClickOutside onClick={() => setIsOpenDropdown(false)} className="relative">
      <div className="flex flex-row items-center gap-3 bg-neutral-50 rounded-sm">
        <div onClick={() => toggleOpen()} className="p-2">
          <div className="relative inline-block">
            {unReadNumber > 0 && (
              //       <span className="w-3 h-3">
              //         <span
              //           className="absolute top-0 right-1 transform translate-x-1/2 -translate-y-1/2 bg-red-500
              //  text-white text-xs font-semibold rounded-full px-1 animate-ping"
              //         >
              //           {data?.length}
              //         </span>
              //       </span>
              <span
                className={`absolute -top-1 right-0 z-1 h-3 w-3 rounded-full bg-red-500 items-center ${
                  unReadNumber === 0 ? "hidden" : "inline cursor-pointer"
                }`}
              >
                <span
                  className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75 
                 "
                >
                  <span className="animate-none text-xs text-white text-center ml-0.5">
                    {unReadNumber}
                  </span>
                </span>
              </span>
            )}
            <FaRegBell className="text-xl font-extrabold text-neutral-500 cursor-pointer hover:text-neutral-600 transition duration-300" />
          </div>
        </div>
      </div>

      {isOpenDropdown && (
        <div
          className={`absolute right-0 mt-2.5 top-10 flex h-96  min-w-90 flex-col rounded-xs border bg-neutral-50 shadow-md`}
        >
          <div className="px-4 py-3 border-b border-b-neutral-300">
            <h5 className="text-sm font-semibold text-neutral-600">
              Thông báo
            </h5>
          </div>
          <ul className="flex flex-col h-96 font-medium text-gray-500 overflow-y-auto custom-scrollbar">
            {data?.length > 0 ? (
              data?.map((notification, index) => {
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-1 px-2 border-t cursor-pointer
                      ${
                        notification?.isRead
                          ? ""
                          : "bg-blue-50 hover:bg-blue-100"
                      }
                      `}
                    onClick={() =>
                      handlerShowCommentDetail(
                        notification?.notification?.post_slug,
                        notification?.notification?.commentId,
                        notification?.id
                      )
                    }
                  >
                    <Avatar
                      imgURL={notification?.notification?.author?.avatar}
                      height={50}
                      width={50}
                    />
                    <li key={index}>
                      <div
                        className="flex flex-col gap-1  border-stroke 
                     px-1 py-3 hover:bg-slate-100 group hover:text-blue-500"
                        to="#"
                      >
                        <p className="text-sm flex gap-1 ">
                          <span className="font-semibold text-xs text-blue-800 hover:underline">
                            {notification?.notification?.author?.fullName}
                          </span>
                          <span className="text-xs font-medium">
                            {notification?.notification?.content}
                          </span>
                        </p>
                        <p className="text-xs">{notification.created_at}</p>
                      </div>
                    </li>
                  </div>
                );
              })
            ) : (
              <span className="flex items-center justify-center text-neutral-600">
                Không có thông báo mới
              </span>
            )}
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
