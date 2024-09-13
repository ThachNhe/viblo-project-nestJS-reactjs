import ArticleStats from "../../ArticleStats";

function CarInfo({
  title,
  author,
  viewNumber,
  commentNumber,
  bookmarkNumber,
  point,
  createdAt
}) {
  return (
    <div className="flex flex-col shadow-md gap-2">
      <div className="border p-4 "> 
        <div className="py-2">
          <a>
            <span className="font-medium hover:text-blue-500 cursor-pointer text-title-xsm text-neutral-700">
              {title}
            </span>
          </a>
        </div>
        <div className="flex flex-col gap-1">
          <a className="text-blue-400 text-sm font-medium hover:underline cursor-pointer ">
            {author}
          </a>
          <span className="text-xs font-medium text-neutral-500">
            {createdAt} 
          </span>
        </div>
        <div>
          <ArticleStats
            viewNumber={viewNumber}
            commentNumber={commentNumber}
            bookmarkNumber={bookmarkNumber}
            point={point}
          />
        </div>
      </div>
    </div>
  );
}

export default CarInfo;
