import ArticleStats from "../../ArticleStats";

function CarInfo({title, author, readTime, viewNumber, commentNumber, bookmarkNumber, point}) {
  return (  
    <div className="flex flex-col gap-2 pl-5  w-72 shadow-md border">
      <div className="">
        <a>
          <span className="text-md font-medium hover:text-blue-500 cursor-pointer ">{title}</span>
        </a>
      </div>
      <div className="flex flex-col gap-1">
        <a className="text-blue-400 text-sm font-medium hover:underline cursor-pointer ">{author}</a>
        <span className="text-xs font-medium text-gray-400">{readTime} phút đọc</span>
      </div>
      <div>
        <ArticleStats viewNumber={viewNumber} commentNumber={commentNumber} bookmarkNumber={bookmarkNumber} point={point} />
      </div>
    </div>
  );
}

export default CarInfo;