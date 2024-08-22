
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
function PostInfo() {
  return (
    <>
      <div className="flex flex-col items-center gap-8 text-gray-400 mt-20">
        {/* VOTE */}
        <div className="flex flex-col gap-0">
          {/* UP VOTE */}
          <div class="relative flex items-center gap-2 group ">
            <FaCaretUp className="text-5xl hover:text-gray-800 cursor-pointer" />
            <div
              class="absolute left-full ml-2 hidden group-hover:block px-2 py-1 text-xs
             text-white bg-gray-800 rounded-sm opacity-0 
              group-hover:opacity-100 transition-opacity duration-300 font-semibold"
            >
              Upvote
            </div>
          </div>

          <span className="text-2xl font-medium"> +3 </span>
          {/* DOWN VOTE */}
          <div class="relative flex items-center gap-2 group">
            <FaCaretDown className="text-5xl hover:text-gray-800 cursor-pointer" />
            <div
              class="absolute left-full ml-2 hidden group-hover:block px-2 py-1 text-xs
             text-white bg-gray-800 rounded-sm opacity-0 
              group-hover:opacity-100 transition-opacity duration-300 font-semibold"
            >
              Upvote
            </div>
          </div>
        </div>
        {/* BOOKMARK */}
        <div class="relative flex items-center gap-2 group">
          <div
            className="border rounded-full hover:bg-blue-100 w-10 h-10 flex justify-center items-center ring-1
         ring-gray-400 hover:ring-blue-500 group shadow-md"
          >
            <IoBookmark className="text-2xl group-hover:text-blue-500 cursor-pointer" />
          </div>

          <div
            class="absolute left-full ml-2 hidden group-hover:block px-2 py-1 text-xs
             text-white bg-gray-800 rounded-sm opacity-0 
              group-hover:opacity-100 transition-opacity duration-300 font-semibold"
          >
            BookMark
          </div>
        </div>

        {/* FACEBOOK */}
        <div class="relative flex items-center gap-2 group">
          <div
            className="border rounded-full hover:bg-blue-100 w-10 h-10 flex justify-center items-center ring-1
         ring-gray-400 hover:ring-blue-300 group shadow-md"
          >
            <FaFacebookF className="text-2xl group-hover:text-blue-300 cursor-pointer" />
          </div>

          <div
            class="absolute left-full ml-2 hidden group-hover:block px-2 py-1 text-xs
             text-white bg-gray-800 rounded-sm opacity-0 
              group-hover:opacity-100 transition-opacity duration-300 min-w-36 font-semibold"
          >
            Chia sẻ lên facebook
          </div>
        </div>

        {/* TWITTER */}
        <div class="relative flex items-center gap-2 group">
          <div
            className="border rounded-full hover:bg-blue-100 w-10 h-10 flex justify-center items-center ring-1
         ring-gray-300 hover:ring-blue-300 group shadow-md"
          >
            <FaTwitter className="text-2xl group-hover:text-blue-300 cursor-pointer" />
          </div>

          <div
            class="absolute left-full ml-2 hidden group-hover:block px-2 py-1 text-xs
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