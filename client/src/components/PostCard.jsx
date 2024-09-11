import TagButton from "./TagButton";
import Avatar from "./navbar/Avatar";
import { TbCaretUpDownFilled } from "react-icons/tb";
import ArticleStats from "./ArticleStats";
function PostCard({
  imgURL,
  authorName,
  date,
  title,
  tags,
  viewNumber,
  commentNumber,
  bookmarkNumber,
  voteNumber
}) {
  return (

    <div className="flex gap-2 border-b py-1 w-full">
      <div>
        <Avatar imgURL={imgURL ? imgURL : "/images/avatar.png"} height={37} width={37} />
      </div>
      <div className="flex flex-col gap-1 flex-grow">
        <div className="flex gap-3 items-center">
          <span className="text-sm font-medium text-blue-400 hover:text-blue-500 hover:underline ">
            {authorName}
          </span>
          <span className="text-xs text-gray-400">{date}</span>
        </div>
        <div>
          <p className="font-medium text-gray-700 hover:text-blue-400">{title}</p>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {tags &&
              tags?.length > 0 &&
              tags.map((tag, index) => {
                return <TagButton tagName={tag} key={index} />;
              })}
          </div>
          <div className="flex justify-between w-full">
            <div>
              <ArticleStats
                viewNumber={viewNumber}
                commentNumber={commentNumber}
                bookmarkNumber={bookmarkNumber}
              />
            </div>

            <div className="flex flex-end-0 items-center text-gray-500">
              <TbCaretUpDownFilled />
              <span>{voteNumber}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
