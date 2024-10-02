import Avatar from "../../navbar/Avatar";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { FaUserPlus } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import NumberFormatter from "../../NumberFormatter";

function UserInfo({
  fullName,
  userName,
  starNumber,
  followerNumber,
  postNumber,
  userAvatar
}) {
  return (
    <div className="flex gap-2 p-1 items-center">
      <Avatar imgURL={userAvatar} height={37} width={37} />
      <div className="flex flex-col gap-1 ">
        <div className="flex gap-2 items-center">
          <span className=" text-blue-400 hover:underline font-medium">
            {fullName}
          </span>
          <span className=" text-neutral-500 font-medium">@{userName}</span>
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

        <div className="flex items-center space-x-4 text-neutral-500 justify-start">
          {/* <!-- Tooltip for view --> */}
          <div className="relative flex items-center gap-2 group">
            <FaStar data-tooltip-id="my-tooltip-1" />
            <span className="">
              <NumberFormatter number={starNumber} />
            </span>
            <ReactTooltip
              id="my-tooltip-1"
              place="bottom"
              content={`Reputations: ${starNumber}`}
            />
          </div>

          {/* <!-- Tooltip for comment --> */}
          <div className="relative flex items-center gap-1 group">
            <FaUserPlus data-tooltip-id="my-tooltip-2" />
            <span className="">
              <NumberFormatter number={followerNumber} />
            </span>
            <ReactTooltip
              id="my-tooltip-2"
              place="bottom"
              content={`Bình luận: ${followerNumber}`}
            />
          </div>

          {/* <!-- Tooltip for bookmark --> */}
          <div className="relative flex items-center gap-1 group">
            <MdEdit  data-tooltip-id="my-tooltip-2"/>
            <span className="">
              <NumberFormatter number={postNumber} />
            </span>
            <ReactTooltip
              id="my-tooltip-2"
              place="bottom"
              content={`Bài viết: ${postNumber}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
