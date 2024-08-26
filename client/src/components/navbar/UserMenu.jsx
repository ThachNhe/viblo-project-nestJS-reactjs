import Avatar from "./Avatar";
import MenuItem from "./MenuItem";
import { useCallback, useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { MdContentPaste } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { GrOrganization } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/action/index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigator = useNavigate();
  const isLogin = useSelector((state) => state?.auth?.isLogin);
  const dispatch = useDispatch();
  const handlerLogout = (e) => {
    // alert("Logout");
    e.preventDefault()
    dispatch(actions.logout());
  };

  useEffect(() => {
    console.log("isLogin", isLogin);
    if (!isLogin) {
      navigator("/login");
    }
  }, [isLogin]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const menuItems = [
    { label: "Trang cá nhân", action: () => console.log("Trang cá nhân") , icon: <IoPerson />},
    {
      label: "Quản lý nội dung",
      action: () => console.log("Quản lý nội dung"),
      icon: <MdContentPaste />,
    },
    {
      label: "Lịch sử hoạt động",
      action: () => console.log("Lịch sử hoạt động"),
      icon: <MdHistory />,
    },
    { label: "Tổ chức", action: () => console.log("Tổ chức"), icon: <GrOrganization /> },
    { label: "Tuỳ chỉnh", action: () => console.log("Tuỳ chỉnh"), icon: <IoMdSettings /> },
    { label: "Đăng xuất", action: handlerLogout, icon: <IoIosLogOut /> },
    
  ];

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div onClick={toggleOpen} className="p-2 ">
          <Avatar />
        </div>
      </div>

      {isOpen && (
        <div
          className="
            absolute
            rounded-md
            shadow-md
            min-w-[250px]
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
            mt-3
            "
        >
          <div className="flex flex-col cursor-pointer">
            {menuItems.map((item, index) => (
              <MenuItem key={index} label={item.label} onClick={item.action} icon={item.icon} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
