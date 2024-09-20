import Avatar from "./navbar/Avatar";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { PiLineVertical } from "react-icons/pi";

function Comment({
  fullName,
  userName,
  date,
  content,
  submitComment,
  handlerOpenResponseForm,
  commentId,
  handlerOpenResToResForm,
  replyForUserName,
  replyForUserId
}) {

  const handlerResponse = () => {
    try {
      // setReplyToCommentId(commentId);
      handlerOpenResponseForm(commentId);
      handlerOpenResToResForm(commentId);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 rounded-md p-2 ">
        <div className="flex items-center gap-2">
          <Avatar
           imgURL={"/images/avatar.png"} height={37} width={37}
          />
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <span className="font-medium text-md text-blue-400 hover:text-blue-600 hover:underline cursor-pointer">
                {fullName}
              </span>
              <span className="font-md text-neutral-500 font-medium hover:underline cursor-pointer">
                @{userName}
              </span>
            </div>

            <span className="text-md text-neutral-500 ">{date}</span>
          </div>
        </div>

        <div className="text-lg">
          <span>
            <span className="text-blue-500 hover:underline pr-2">{replyForUserName ?  '@' : ""}{replyForUserName}</span>
            {content}
          </span>
        </div>

        <div className="flex gap-1 items-center ">
          <div className="relative flex items-center group">
            <FaAngleUp className="text-neutral-500 cursor-pointer" />
            <div
              className="absolute top-full mt-2 hidden group-hover:block px-2 py-1 text-xs
             text-white bg-gray-800 rounded-lg opacity-0 
              group-hover:opacity-100 transition-opacity duration-300"
            >
              Upvote
            </div>
          </div>

          <span className="text-neutral-500">1</span>

          <div className="relative flex items-center group">
            <FaAngleDown className="text-neutral-500 cursor-pointer" />

            <div
              className="absolute top-full mt-2 hidden group-hover:block px-2 py-1 text-xs
             text-white bg-gray-800 rounded-lg opacity-0 
              group-hover:opacity-100 transition-opacity duration-300"
            >
              Downvote
            </div>
          </div>

          <PiLineVertical className="text-neutral-500" />

          <div className="relative flex items-center group mr-3">
            <span
              className="text-blue-400 font-medium text-sm hover:underline cursor-pointer"
              onClick={() => handlerResponse()}
            >
              Trả lời
            </span>
            <div
              className="absolute top-full mt-2 hidden group-hover:block px-2 py-1 text-xs
             text-white bg-gray-800 rounded-lg opacity-0 
              group-hover:opacity-100 transition-opacity duration-300 min-w-20 items-center font-medium "
            >
              Trả lời
            </div>
          </div>

          <div className="relative flex items-center group mr-3">
            <span className="text-neutral-500 font-medium text-sm cursor-pointer">
              Chia sẻ
            </span>
            <div
              className="absolute top-full mt-2 hidden group-hover:block px-2 py-1 text-xs
             text-white bg-gray-800 rounded-lg opacity-0 
              group-hover:opacity-100 transition-opacity duration-300 min-w-20 items-center font-medium "
            >
              Chia sẻ
            </div>
          </div>

          <div>
            <BsThreeDots className="text-neutral-500 cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
