import Avatar from "./Avatar";
import MenuItem from "./MenuItem";
import { useCallback, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { MdContentPaste } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { GrOrganization } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
const menuItem = [
  {
    label: "Trang cá nhân",
    icon: <IoPerson />,
  },
  {
    label: "Quản lý nội dung",
    icon: <MdContentPaste />,
  },
  {
    label: "Lịch sử hoạt động",
    icon: <MdHistory />,
  },
  {
    label: "Tổ chức",
    icon: <GrOrganization />,
  },
  {
    label: "Tuỳ chình",
    icon: <IoMdSettings />,
  },
];
const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {/* <div
          onClick={toggleOpen}
          className="
                p-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-200 
                flex
                rounded-full
                cursor-pointer
                hover:shadow-md
                transition"
        >
        
        </div> */}
        <div onClick={toggleOpen} className="p-2">
          <Avatar  />
        </div>
      </div>

      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            min-w-[250px]
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
            "
        >
          <div className="flex flex-col cursor-pointer">
            {/* {menuItem.map((item, index) => (
                        <MenuItem
                            key={index}
                            label={item.label}
                            // Icon={item.icon}
                        />
                    ))} */}

            <MenuItem
              label={"Trang cá nhân"}
              // Icon={item.icon}
            />
            <MenuItem label={"Quản lý nội dung"} />
            <MenuItem label={"Lịch sử hoạt động"} />
            <MenuItem label={"Tổ chức"} />
            <MenuItem label={"Tuỳ chỉnh"} />
            <span className="border-t-2"></span>
            <MenuItem label={"Đăng xuất"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
