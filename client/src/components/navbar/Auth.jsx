import { IoExitOutline } from "react-icons/io5";
import UserMenu from "./UserMenu";
import { useNavigate } from "react-router-dom";
import React from "react";
const Auth = ({ isLogin }) => {
  const navigate = useNavigate();
  return (
    <>
      {isLogin ? (
        <UserMenu />
      ) : (
        <div
          className="flex flex-row items-center text-sky-600 gap-1 cursor-pointer text-blue-400 hover:text-blue-500 text-sm"
          onClick={() => {
            navigate("/login");
          }}
        >
          <IoExitOutline className="font-semibold text-lg " />
          <span>Đăng nhập/Đăng ký</span>
        </div>
      )}
    </>
  );
};
export default React.memo(Auth);
