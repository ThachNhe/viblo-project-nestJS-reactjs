import { Tooltip as ReactTooltip } from "react-tooltip";

function CarInfo({
  title,
  author,
  viewNumber,
  commentNumber,
  bookmarkNumber,
  point,
  createdAt,
  slug,
  handlerShowPostDetail,
}) {
  return (
    <div className="max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow-sm overflow-visible">
      {/* Tiêu đề bài viết */}
      <div className="mb-2">
        <a>
          <span className="block font-medium hover:text-blue-500 cursor-pointer text-base text-neutral-800 truncate "
            onClick={() => handlerShowPostDetail(slug)}
          >
            {title}
          </span>
        </a>
      </div>

      {/* Tên tác giả */}
      <div className="text-blue-500 hover:text-blue-600 text-sm mb-2 cursor-pointer capitalize hover:underline">
        {author}
      </div>

      {/* Thời gian đọc */}
      <div className="text-sm text-neutral-500 mb-4">{createdAt}</div>

      {/* Thống kê */}
      <div className="flex items-center text-neutral-500 text-sm space-x-4 overflow-visible">
        {/* Lượt xem */}
        <div className="flex items-center space-x-1 overflow-visible">
          <span role="img" aria-label="views" data-tooltip-id="viewNumber">
            👁️
          </span>
          <span>{viewNumber}</span>
          <ReactTooltip
            id="viewNumber"
            place="bottom"
            content={`Lượt xem: ${viewNumber}`}
            effect="solid"
          />
        </div>

        {/* Lượt bookmark */}
        <div
          className="flex items-center space-x-1 overflow-visible"
          data-tooltip-id="bookmarkNumber"
        >
          <span role="img" aria-label="bookmarks">
            🔖
          </span>
          <span>{bookmarkNumber}</span>
          <ReactTooltip
            id="bookmarkNumber"
            place="bottom"
            content={`Lượt bookmark: ${bookmarkNumber}`}
            effect="solid"
          />
        </div>

        {/* Lượt bình luận */}
        <div className="flex items-center space-x-1 overflow-visible">
          <span
            role="img"
            aria-label="comments"
            data-tooltip-id="commentNumber"
          >
            💬
          </span>
          <span>{commentNumber}</span>
          <ReactTooltip
            id="commentNumber"
            place="top"
            content={`Lượt bình luận: ${bookmarkNumber}`}
            effect="solid"
          />
        </div>

        {/* Lượt chia sẻ */}
        <div className="flex items-center space-x-1 overflow-visible">
          <span role="img" aria-label="shares" data-tooltip-id="point">
            ⬆️
          </span>
          <span>{point}</span>
          <ReactTooltip
            id="point"
            place="top"
            content={`Điểm: ${point}`}
            effect="solid"
          />
        </div>
      </div>
    </div>
  );
}

export default CarInfo;
