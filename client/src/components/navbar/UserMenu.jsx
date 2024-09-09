import Avatar from "./Avatar";
import MenuItem from "./MenuItem";
import { useCallback, useEffect, useState, useRef } from "react";
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
import { handlerFileUpload } from "../../utils/utils";
import * as services from "../../services/index";
import toast from "react-hot-toast";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigator = useNavigate();
  const isLogin = useSelector((state) => state?.auth?.isLogin);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const userAvatar = useSelector((state) => state?.user?.userAvatar);
  const userInfo = useSelector((state) => state?.auth?.userInfo);
  const [avatar, setAvatar] = useState(
    userAvatar
      ? userAvatar
      : "/images/avatar.png"
  );

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handlerLogout = (e) => {
    e.preventDefault();
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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const imgURL = await handlerFileUpload(file);

    try {
      const res = await services.uploadAvatar({ avatar: imgURL.imageURL });
      if (res.success) {
        setAvatar(imgURL.imageURL);
        dispatch(actions.updateAvatar(imgURL.imageURL));
        toast.success("Upload avatar success!!!");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Upload avatar failed!!!");
    }
  };

  const menuItems = [
    {
      label: "Trang cá nhân",
      action: () => console.log("Trang cá nhân"),
      icon: <IoPerson />,
    },
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
    {
      label: "Tổ chức",
      action: () => console.log("Tổ chức"),
      icon: <GrOrganization />,
    },
    {
      label: "Tuỳ chỉnh",
      action: () => console.log("Tuỳ chỉnh"),
      icon: <IoMdSettings />,
    },
    { label: "Đăng xuất", action: handlerLogout, icon: <IoIosLogOut /> },
  ];

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div onClick={toggleOpen} className="p-2 ">
          <Avatar imgURL={avatar} height={37} width={37} />
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
            <div className="flex gap-2  items-center justify-between px-4 py-2 bg-slate-50 hover:bg-slate-100">
              <Avatar imgURL={avatar} height={80} width={80} />
              <div className=" flex flex-col gap-1 ">
                <span className="font-medium text-base">{userInfo?.data?.user?.fullName}</span>
                <span className="text-gray-500 text-sm">@{userInfo?.data?.user?.userName}</span>
                <button
                  type="button"
                  className="py-1 px-3 text-xs  inline-flex items-center rounded-md 
                 border bg-blue-400 text-gray-50 font-semibold text-center gap-2 focus:bg-blue-500 max-w-fit "
                  onClick={handleButtonClick}
                >
                  <span>Tải lên</span>
                </button>
                {/* Input file ẩn */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
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
    </div>
  );
};

export default UserMenu;
