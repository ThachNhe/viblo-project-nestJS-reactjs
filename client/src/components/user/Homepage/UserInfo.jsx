import Avatar from "../../navbar/Avatar";

import { FaUserPlus } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
function UserInfo({
  fullName,
  userName,
  starNumber,
  followerNumber,
  postNumber,
}) {
  return (
    <div className="flex gap-2 p-1 items-center">
      <Avatar imgURL={"/images/avatar.png"} height={37} width={37} />
      <div className="flex flex-col gap-1 ">
        <div className="flex gap-2 items-center">
          <span className=" text-blue-400 hover:underline font-medium">
            {fullName}
          </span>
          <span className=" text-gray-400 font-medium">@{userName}</span>
          <div className=" flex">
            <button
              type="button"
              className="py-1 px-3 text-xs  inline-flex items-center bg-slate-50 rounded-md hover:bg-blue-100 focus:ring-1 
                focus:outline-none focus:ring-blue-300  border  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                 text-gray-700 hover:text-blue-400  font-medium text-center gap-2 "
            >
              <span>Theo dõi</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-gray-400 justify-start">
          {/* <!-- Tooltip for view --> */}
          <div className="relative flex items-center gap-2 group">
            <FaStar />
            <span className="">{starNumber}</span>
            <div className="absolute top-full mt-2 hidden group-hover:block px-2 py-1 text-xs text-white bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Reputations: {starNumber}
            </div>
          </div>

          {/* <!-- Tooltip for comment --> */}
          <div className="relative flex items-center gap-1 group">
            <FaUserPlus />
            <span className="">{followerNumber}</span>
            <div className="absolute top-full mt-2 hidden group-hover:block px-2 py-1 text-xs text-white bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {followerNumber} Người theo dõi
            </div>
          </div>

          {/* <!-- Tooltip for bookmark --> */}
          <div className="relative flex items-center gap-1 group">
            <MdEdit />
            <span className="">{postNumber}</span>
            <div className="absolute top-full mt-2 hidden group-hover:block px-2 py-1 text-xs text-white bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {postNumber} Bài viết
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
