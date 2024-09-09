import { FaRegEye } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaQuestionCircle } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
function ProposedCourse({ courseName, time, tags, level, viewNumber , studentNumber, questionNumber, docNumber }) {
  return (
    <div className="flex flex-col gap-2 py-1">
      <div className="flex justify-between py-3 px-2">
        <div className="flex flex-col gap-2">
          <span className="hover:text-cyan-600 font-medium">{courseName}</span>
          <span className="text-gray-400 text-xs font-medium">{time}</span>
          <span className="flex gap-3">
            {tags &&
              tags.length > 0 &&
              tags.map((item, index) => {
                return (
                  <button
                    type="button"
                    className="py-1 px-3 text-xs  inline-flex items-center bg-slate-50 rounded-md hover:bg-blue-100 focus:ring-1 
                focus:outline-none focus:ring-blue-300  border  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                 text-gray-700 hover:text-gray-400  font-medium text-center gap-2 "
                  >
                    <span>{item?.name}</span>
                  </button>
                );
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

      <div className="flex gap-4 items-center text-gray-500 ">
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
