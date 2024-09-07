import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
function PostInfo({
  upvote,
  downvote,
  isBookmark,
  voteNumber,
  facebook,
  twitter,
  handlerUpvote,
  handlerDownvote,
  handlerBookmark,
}) {
  return (
    <>
      <div className="flex flex-col items-center gap-8 text-gray-400 mt-20">
        {/* VOTE */}
        <div className="flex flex-col gap-0 ">
          {/* UP VOTE */}
          <div className="relative flex items-center gap-2 group ">
            <FaCaretUp
              className={`text-5xl hover:text-gray-800 cursor-pointer
                                ${upvote ? "text-cyan-700" : ""}`}
              onClick={handlerUpvote}
            />
            <div
              className="absolute z-10 left-full ml-2 hidden group-hover:block px-2 py-1 text-xs
             text-white bg-gray-800 rounded-sm opacity-0 
              group-hover:opacity-100 transition-opacity duration-300 font-semibold"
            >
              Upvote
            </div>
          </div>

          <span
            className={`text-2xl font-medium leading-3
            ${upvote || downvote ? "text-cyan-700" : "text-gray-400"}
            `}
          >
            +{voteNumber}
          </span>
          {/* DOWN VOTE */}
          <div className="relative flex items-center gap-2 group">
            <FaCaretDown
              className={`text-5xl hover:text-gray-800 cursor-pointer
             ${downvote ? "text-cyan-700" : ""}
              `}
              onClick={handlerDownvote}
            />
            <div
              className="absolute left-full ml-2 hidden group-hover:block px-2 py-1 text-xs
             text-white bg-gray-800 rounded-sm opacity-0 
              group-hover:opacity-100 transition-opacity duration-300 font-semibold z-10"
            >
              Upvote
            </div>
          </div>
        </div>
        {/* BOOKMARK */}
        <div className="relative flex items-center gap-2 group">
          <div
            className={`border rounded-full hover:bg-blue-100 w-10 h-10 flex justify-center items-center ring-1
         ring-gray-400  group shadow-md
            ${isBookmark ? 'ring-blue-500 ' : 'hover:bg-white'}
         `}
          >
            <IoBookmark
              className={`text-2xl group-hover:text-blue-500 cursor-pointer
                ${isBookmark ? "text-blue-500 " : "group-hover:text-gray-400"}
                `}
              onClick={handlerBookmark}
            />
          </div>

          <div
            className="absolute  z-10 left-full ml-2 hidden group-hover:block px-2 py-1 text-xs
             text-white bg-gray-800 rounded-sm opacity-0 
              group-hover:opacity-100 transition-opacity duration-300 font-semibold"
          >
            BookMark
          </div>
        </div>

        {/* FACEBOOK */}
        <div className="relative flex items-center gap-2 group">
          <div
            className="border rounded-full hover:bg-blue-100 w-10 h-10 flex justify-center items-center ring-1
         ring-gray-400 hover:ring-blue-300 group shadow-md"
          >
            <FaFacebookF className="text-2xl group-hover:text-blue-300 cursor-pointer" />
          </div>

          <div
            className="absolute z-10 left-full ml-2 hidden group-hover:block px-2 py-1 text-xs
             text-white bg-gray-800 rounded-sm opacity-0 
              group-hover:opacity-100 transition-opacity duration-300 min-w-36 font-semibold"
          >
            Chia sẻ lên facebook
          </div>
        </div>

        {/* TWITTER */}
        <div className="relative flex items-center gap-2 group">
          <div
            className="border rounded-full hover:bg-blue-100 w-10 h-10 flex justify-center items-center ring-1
         ring-gray-300 hover:ring-blue-300 group shadow-md"
          >
            <FaTwitter className="text-2xl group-hover:text-blue-300 cursor-pointer" />
          </div>

          <div
            className="absolute z-10 left-full ml-2 hidden group-hover:block px-2 py-1 text-xs
             text-white bg-gray-800 rounded-sm opacity-0 
              group-hover:opacity-100 transition-opacity duration-300 min-w-36 font-semibold"
          >
            Chia sẻ lên twitter
          </div>
        </div>
      </div>
    </>
  );
}

export default PostInfo;
