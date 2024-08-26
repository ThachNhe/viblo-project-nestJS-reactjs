import { FaEye } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { TbCaretUpDown } from "react-icons/tb";
function ArticleStats({ viewNumber, commentNumber, bookmarkNumber, point }) {
  return (
    <div
      className={`flex items-center space-x-4 text-gray-400 
    ${point !== undefined} ? 'justify-end' : 'justify-start' `}
    >
      {/* <!-- Tooltip for view --> */}
      <div className="relative flex items-center gap-2 group">
        <FaEye />
        <span className="">{viewNumber}</span>
        <div
          className="absolute top-full mt-2 hidden group-hover:block px-2 py-1 text-xs text-white bg-gray-800 rounded-lg opacity-0 
        group-hover:opacity-100 transition-opacity duration-300"
        >
          {viewNumber} Lượt xem
        </div>
      </div>

      {/* <!-- Tooltip for comment --> */}
      <div className="relative flex items-center gap-1 group">
        <FaRegCommentDots />
        <span className="">{commentNumber}</span>
        <div
          className="absolute top-full mt-2 hidden group-hover:block px-2 py-1 text-xs text-white bg-gray-800 rounded-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {commentNumber} Bình luận
        </div>
      </div>

      {/* <!-- Tooltip for bookmark --> */}
      <div className="relative flex items-center gap-1 group">
        <FaBookmark />
        <span className="">{bookmarkNumber}</span>
        <div
          className="absolute top-full mt-2 hidden group-hover:block px-2 py-1 text-xs text-white bg-gray-800 rounded-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {bookmarkNumber} Đánh dấu
        </div>
      </div>
      {point !== undefined && (
        <div className="relative flex items-center gap-1 group">
          <TbCaretUpDown />
          <span className="">{point}</span>
          <div
            className="absolute top-full mt-2 hidden group-hover:block px-2 py-1 text-xs text-white bg-gray-800 rounded-lg 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            {point} Điểm
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleStats;
