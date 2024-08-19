import { IoInformation } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
const Notification = ({ isLogin }) => {
  return (
    <div className="flex flex-row gap-3 items-center">
      <IoInformation className="text-2xl font-extrabold text-gray-400 cursor-pointer hover:text-gray-900" />
      {isLogin && (
        <FaRegBell className="text-xl font-extrabold text-gray-400 cursor-pointer: hover:text-gray-900" />
      )}
      <CiEdit className="text-2xl font-extrabold text-gray-400 cursor-pointer: hover:text-gray-900"/>
    </div>
  );
};
export default Notification;
