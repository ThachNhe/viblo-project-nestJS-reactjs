import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

function PostInfo({
  upvote,
  downvote,
  isBookmark,
  voteNumber,
  handlerUpvote,
  handlerDownvote,
  handlerBookmark,
}) {
  return (
    <>
      <div className="flex flex-col items-center gap-8 text-neutral-400 mt-20">
        {/* VOTE */}
        <div className="flex flex-col gap-0 ">
          {/* UP VOTE */}
          <div
            className="relative flex items-center gap-2 group "
            data-tooltip-id="upvote"
          >
            <FaCaretUp
              className={`text-5xl hover:text-gray-800 cursor-pointer
                                ${upvote ? "text-blue-600" : ""}`}
              onClick={handlerUpvote}
            />

            <ReactTooltip id="upvote" place="right" content="Upvote" />
          </div>

          <span
            className={`text-2xl font-medium leading-3 ml-2
            ${upvote || downvote ? "text-blue-600" : "text-neutral-500"}
            `}
          >
            +{voteNumber}
          </span>
          {/* DOWN VOTE */}
          <div
            className="relative flex items-center gap-2 group"
            data-tooltip-id="downvote"
          >
            <FaCaretDown
              className={`text-5xl hover:text-gray-800 cursor-pointer
             ${downvote ? "text-blue-600" : ""}
              `}
              onClick={handlerDownvote}
            />
            <ReactTooltip id="downvote" place="right" content="Downvote" />
          </div>
        </div>

        {/* BOOKMARK */}
        <div className="" data-tooltip-id="bookmark">
          <div
            className="border rounded-full hover:bg-blue-100 w-10 h-10 flex justify-center items-center ring-1
         ring-gray-400 hover:ring-blue-300 group shadow-md"
          >
            <IoBookmark
              className={`text-2xl cursor-pointer
                ${isBookmark ? "text-blue-500 hover:text-blue-600" : "group-hover:text-neutral-600"}
                `}
              onClick={handlerBookmark}
            />
          </div>
        </div>
        <ReactTooltip
          id="bookmark"
          place="right"
          content={isBookmark ? "Bỏ lưu" : "Lưu"}
        />

        {/* FACEBOOK */}
        <div className="" data-tooltip-id="facebook">
          <div
            className="border rounded-full hover:bg-blue-100 w-10 h-10 flex justify-center items-center ring-1
         ring-gray-400 hover:ring-blue-300 group shadow-md"
          >
            <FaFacebookF className="text-2xl group-hover:text-blue-300 cursor-pointer" />
          </div>
        </div>

        <ReactTooltip
          id="facebook"
          place="right"
          content="Chia sẻ lên facebook"
        />

        {/* TWITTER */}
        <div className="" data-tooltip-id="twitter">
          <div
            className="border rounded-full hover:bg-blue-100 w-10 h-10 flex justify-center items-center ring-1
         ring-gray-400 hover:ring-blue-300 group shadow-md"
          >
            <FaTwitter className="text-2xl group-hover:text-blue-300 cursor-pointer" />
          </div>
        </div>

        <ReactTooltip
          id="twitter"
          place="right"
          content="Chia sẻ lên twitter"
        />
      </div>
    </>
  );
}

export default PostInfo;
