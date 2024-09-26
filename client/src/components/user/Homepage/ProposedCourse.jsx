import { FaRegEye } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaQuestionCircle } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import TagButton from "../../TagButton";
function ProposedCourse({
  courseName,
  time,
  tags,
  level,
  viewNumber,
  studentNumber,
  questionNumber,
  docNumber,
}) {
  return (
    <div className="flex flex-col gap-1 py-1">
      <div className="flex justify-between py-2">
        <div className="flex flex-col gap-2">
          <span className="hover:text-cyan-600 font-medium">{courseName}</span>
          <span className="text-neutral-500 text-xs font-medium">{time}</span>
          <span className="flex gap-3">
            {tags &&
              tags.length > 0 &&
              tags.map((item, index) => {
                return <TagButton tagName={item?.name} key={index} />;
              })}
          </span>
        </div>

        <div>
          <button
            type="button"
            className="py-1 px-3 text-xs  inline-flex items-center rounded-md  focus:ring-1 
                 border dark:bg-blue-600 dark:hover:bg-blue-700 
                 bg-blue-400 text-gray-50 font-semibold text-center gap-2 "
          >
            <span>{level}</span>
          </button>
        </div>
      </div>

      <div className="flex gap-4 items-center text-gray-500 justify-between">
        <div className="flex gap-1 items-center">
          <FaRegEye />
          <span>{viewNumber}</span>
        </div>
        <div className="flex gap-1 items-center">
          <HiOutlineUserGroup />
          <span>{studentNumber}</span>
        </div>
        <div className="flex gap-1 items-center">
          <FaQuestionCircle />
          <span>{questionNumber}</span>
        </div>
        <div className="flex gap-1 items-center">
          <IoDocumentText />
          <span>{docNumber}</span>
        </div>
      </div>
    </div>
  );
}

export default ProposedCourse;
