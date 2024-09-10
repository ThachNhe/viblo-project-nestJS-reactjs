import { FaEye } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { TbCaretUpDown } from "react-icons/tb";
import { Tooltip, Button } from "@material-tailwind/react";
function ArticleStats({ viewNumber, commentNumber, bookmarkNumber, point }) {
  return (
    <div
      className={`flex items-center space-x-4 text-gray-400 
    ${point !== undefined} ? 'justify-end' : 'justify-start' `}
    >
      {/* <!-- Tooltip for view --> */}
      <div className="relative flex items-center gap-1 group">
        <FaEye />
        <span className="">{viewNumber}</span>
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block px-2 py-1 text-xs text-white bg-gray-800 rounded-sm opacity-0 
        group-hover:opacity-100 transition-opacity duration-1000 max-w-fit min-w-[100px] "
        >
          <span className="font-semibold text-gray-200"> Lượt xem:  {viewNumber}</span>
        </div>
      </div>

      {/* <!-- Tooltip for comment --> */}
      <div className="relative flex items-center gap-1 group">
        <FaRegCommentDots />
        <span className="">{commentNumber}</span>
        <div
          className="absolute top-full mt-2 hidden group-hover:block px-2 py-1 text-xs text-white bg-gray-800 rounded-sm  left-1/2 -translate-x-1/2
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-[100px] "
        >
          <span className="font-semibold text-gray-200"> Bình luận:  {commentNumber}</span>
        </div>
      </div>

      {/* <!-- Tooltip for bookmark --> */}
      <div className="relative flex items-center gap-1 group">
        <FaBookmark />
        <span className="">{bookmarkNumber}</span>
        <div
          className="absolute top-full mt-2 hidden group-hover:block px-2 py-1 text-xs text-white bg-gray-800 rounded-sm min-w-[100px]  left-1/2 -translate-x-1/2
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 "
        >
         <span className="font-semibold text-gray-200"> Đánh dấu:  {bookmarkNumber}</span>
        </div>
      </div>
      {point !== undefined && (
        <div className="relative flex items-center gap-1 group">
          <TbCaretUpDown />
          <span className="">{point}</span>
          <div
            className="absolute top-full mt-2 hidden group-hover:block px-2 py-1 text-xs text-white bg-gray-800 rounded-sm min-w-[100px]  left-1/2 -translate-x-1/2
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 "
          >
            <span className="font-semibold text-gray-200"> Điểm:  {point}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleStats;
