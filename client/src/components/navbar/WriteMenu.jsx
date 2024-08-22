import Avatar from "./Avatar";
import MenuItem from "./MenuItem";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/action/index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";
import { CiEdit } from "react-icons/ci";
const WriteMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigator = useNavigate();
  const isLogin = useSelector((state) => state?.auth?.isLogin);
  const dispatch = useDispatch();
  const handlerLogout = (e) => {
    e.preventDefault();
    dispatch(actions.logout());
  };

  useEffect(() => {
  
  }, []);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const menuItems = [
    { label: "Viết bài", action: navigator("/publish/post") },
    {
      label: "Series mới",
      action: () => console.log("Series mới"),
    },
    {
      label: "Đặt câu hỏi",
      action: () => console.log("Series mới"),
    },
  ];

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
       <div onClick={()=> toggleOpen()} className="p-2">
          <CiEdit className="text-2xl font-extrabold text-gray-400 cursor-pointer: hover:text-gray-900" />
        </div>
      </div>

      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            min-w-[150px]
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
            "
        >
          <div className="flex flex-col cursor-pointer">
            {menuItems.map((item, index) => (
              <MenuItem key={index} label={item.label} onClick={item.action} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(WriteMenu);
