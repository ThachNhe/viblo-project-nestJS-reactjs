import { IoExitOutline } from "react-icons/io5";
import UserMenu from "./UserMenu";
import React from "react";
const Auth = ({ isLogin }) => {

  return (
    <>
      {isLogin ? (
        <UserMenu />
      ) : (
        <div className="flex flex-row items-center text-sky-600 gap-1 cursor-pointer">
          <IoExitOutline />
          <span>Đăng nhập/Đăng ký</span>
        </div>
      )}
    </>
  );
};
export default React.memo(Auth);
