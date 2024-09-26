import { FaEye } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { TbCaretUpDown } from "react-icons/tb";
import { Tooltip as ReactTooltip } from "react-tooltip";
import NumberFormatter from "./NumberFormatter";
import { useState } from "react";

function ArticleStats({ viewNumber, commentNumber, bookmarkNumber, point }) {
  const [randomID] = useState(String(Math.random()));

  return (
    <div
      className={`flex items-center space-x-4 text-neutral-400 
      justify-end`}
    >
      {/* Tooltip cho view */}
      <div
        className="relative flex items-center gap-1"
        data-tooltip-id={randomID}
        data-tooltip-content= {`Lượt xem: ${viewNumber}`}
      >
        <FaEye />
        <span>
          <NumberFormatter number={viewNumber} />
        </span>
      </div>

      {/* Tooltip cho comment */}
      <div
        className="relative flex items-center gap-1"
        data-tooltip-id={randomID}
        data-tooltip-content= {`Số bình luận: ${commentNumber}`}
      >
        <FaRegCommentDots />
        <span>
          <NumberFormatter number={commentNumber} />
        </span>
      </div>

      {/* Tooltip cho bookmark */}
      <div
        className="relative flex items-center gap-1"
        data-tooltip-id={randomID}
        data-tooltip-content={`Số lượt lưu: ${bookmarkNumber}`}
      >
        <FaBookmark />
        <span>
          <NumberFormatter number={bookmarkNumber} />
        </span>
      </div>

      {/* Tooltip cho point (nếu có) */}
      {point !== undefined && (
        <div
          className="relative flex items-center gap-1"
          data-tooltip-id={randomID}
          data-tooltip-content= {`Điểm: ${point}`}
        >
          <TbCaretUpDown />
          <span>
            <NumberFormatter number={point} />
          </span>
        </div>
      )}

      {/* Tooltip được render một lần và vị trí là bottom */}
      <ReactTooltip
        id={randomID}
        effect="solid"
        place="bottom"
     
      />
    </div>
  );
}

export default ArticleStats;
