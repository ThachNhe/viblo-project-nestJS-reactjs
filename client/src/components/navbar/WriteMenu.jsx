import Avatar from "./Avatar";
import MenuItem from "./MenuItem";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/action/index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { PiListDashesBold } from "react-icons/pi";
import { FaRegQuestionCircle } from "react-icons/fa";
import ClickOutside from "../ClickOutside";

const WriteMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigator = useNavigate();
  const isLogin = useSelector((state) => state?.auth?.isLogin);
  const dispatch = useDispatch();
  useEffect(() => {}, [navigator]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

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
    <ClickOutside
      className={`relative ${!isLogin ? "hidden" : ""}`}
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div className="flex flex-row items-center gap-3">
        <div onClick={() => toggleOpen()} className="p-2">
          <svg
            class="mb-1"
            width="30px"
            height="30px"
            viewBox="0 -0.5 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.265 4.16231L19.21 5.74531C19.3978 5.9283 19.5031 6.17982 19.5015 6.44201C19.5 6.70421 19.3919 6.9545 19.202 7.13531L17.724 8.93531L12.694 15.0723C12.6069 15.1749 12.4897 15.2473 12.359 15.2793L9.75102 15.8793C9.40496 15.8936 9.10654 15.6384 9.06702 15.2943L9.18902 12.7213C9.19806 12.5899 9.25006 12.4652 9.33702 12.3663L14.15 6.50131L15.845 4.43331C16.1743 3.98505 16.7938 3.86684 17.265 4.16231Z"
              stroke="gray"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.5 18.2413C5.08579 18.2413 4.75 18.5771 4.75 18.9913C4.75 19.4056 5.08579 19.7413 5.5 19.7413V18.2413ZM19.2 19.7413C19.6142 19.7413 19.95 19.4056 19.95 18.9913C19.95 18.5771 19.6142 18.2413 19.2 18.2413V19.7413ZM14.8455 6.22062C14.6904 5.83652 14.2534 5.65082 13.8693 5.80586C13.4852 5.9609 13.2995 6.39796 13.4545 6.78206L14.8455 6.22062ZM17.8893 9.66991C18.2933 9.57863 18.5468 9.17711 18.4556 8.77308C18.3643 8.36904 17.9628 8.1155 17.5587 8.20678L17.8893 9.66991ZM5.5 19.7413H19.2V18.2413H5.5V19.7413ZM13.4545 6.78206C13.6872 7.35843 14.165 8.18012 14.8765 8.8128C15.6011 9.45718 16.633 9.95371 17.8893 9.66991L17.5587 8.20678C16.916 8.35198 16.3609 8.12551 15.8733 7.69189C15.3725 7.24656 15.0128 6.63526 14.8455 6.22062L13.4545 6.78206Z"
              fill="gray"
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div
          className="
            absolute
            rounded-md
            shadow-md
            min-w-[150px]
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
            border
            "
        >
          <div className="flex flex-col cursor-pointer">
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                label={item.label}
                onClick={item.action}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      )}
    </ClickOutside>
  );
};

export default React.memo(WriteMenu);
