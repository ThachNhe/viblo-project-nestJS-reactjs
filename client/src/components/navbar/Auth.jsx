import { IoExitOutline } from "react-icons/io5";
import Avatar from "./Avatar";
import UserMenu from "./UserMenu";
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
export default Auth;
