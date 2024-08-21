import Avatar from "./navbar/Avatar";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { PiLineVertical } from "react-icons/pi";
import CommentForm from "./CommentForm";
function Comment({ isAnswer ,fullName, userName, date, content,  submitComment }) {
  return (
    <>
      <div className="flex flex-col gap-2 border p-5 rounded-md my-5">
        <div className="flex items-center gap-2">
          <Avatar />
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <span className="font-medium text-md text-blue-400 hover:text-blue-600 hover:underline cursor-pointer">
                {fullName}
              </span>
              <span className="font-md text-gray-400 font-medium hover:underline cursor-pointer">
                @{userName}
              </span>
            </div>

            <span className="text-md text-gray-400 ">
              {date}
            </span>
          </div>
        </div>

        <div className="text-lg">
          <span>
            {content}
          </span>
        </div>

        <div className="flex gap-1 items-center ">
          <div class="relative flex items-center group">
            <FaAngleUp className="text-gray-400 cursor-pointer" />
            <div
              class="absolute top-full mt-2 hidden group-hover:block px-2 py-1 text-xs
             text-white bg-gray-800 rounded-lg opacity-0 
              group-hover:opacity-100 transition-opacity duration-300"
            >
              Upvote
            </div>
          </div>

          <span className="text-gray-400">1</span>

          <div class="relative flex items-center group">
            <FaAngleDown className="text-gray-400 cursor-pointer" />

            <div
              class="absolute top-full mt-2 hidden group-hover:block px-2 py-1 text-xs
             text-white bg-gray-800 rounded-lg opacity-0 
              group-hover:opacity-100 transition-opacity duration-300"
            >
              Downvote
            </div>
          </div>

          <PiLineVertical className="text-gray-400" />

          <div class="relative flex items-center group mr-3">
            <span className="text-blue-400 font-medium text-sm hover:underline cursor-pointer">
              Trả lời
            </span>
            <div
              class="absolute top-full mt-2 hidden group-hover:block px-2 py-1 text-xs
             text-white bg-gray-800 rounded-lg opacity-0 
              group-hover:opacity-100 transition-opacity duration-300 min-w-20 items-center font-medium "
            >
              Trả lời
            </div>
          </div>

          <div class="relative flex items-center group mr-3">
            <span className="text-gray-400 font-medium text-sm cursor-pointer">Chia sẻ</span>
            <div
              class="absolute top-full mt-2 hidden group-hover:block px-2 py-1 text-xs
             text-white bg-gray-800 rounded-lg opacity-0 
              group-hover:opacity-100 transition-opacity duration-300 min-w-20 items-center font-medium "
            >
              Chia sẻ
            </div>
          </div>

          <div>
            <BsThreeDots className="text-gray-400 cursor-pointer" />
          </div>
        </div>
        {isAnswer && <CommentForm submitComment={submitComment} />}
       
      </div>
      
    </>
  );
}

export default Comment;
