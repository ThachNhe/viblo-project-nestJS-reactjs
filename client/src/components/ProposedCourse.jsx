import { FaRegEye } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaQuestionCircle } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
function ProposedCourse() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between py-3 px-2">
        <div className="flex flex-col gap-2">
          <span className="hover:text-cyan-600 font-medium">Kurbernet essitial</span>
          <span className="text-gray-400 text-xs font-medium">thg 7 27, 2021 1:20 CH</span>
          <span className="flex gap-3">
            <button
              type="button"
              className="py-1 px-3 text-xs  inline-flex items-center bg-slate-50 rounded-md hover:bg-blue-100 focus:ring-1 
                focus:outline-none focus:ring-blue-300  border  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                 text-gray-700 hover:text-gray-400  font-medium text-center gap-2 "
            >
              <span>Kubernetes</span>
            </button>
            <button
              type="button"
              className="py-1 px-3 text-xs  inline-flex items-center bg-slate-50 rounded-md hover:bg-blue-100 focus:ring-1 
                focus:outline-none focus:ring-blue-300  border  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                 text-gray-700 hover:text-gray-400  font-medium text-center gap-2 "
            >
              <span>Devops</span>
            </button>
          </span>
        </div>

        <div>
          <button
            type="button"
            className="py-1 px-3 text-xs  inline-flex items-center rounded-md  focus:ring-1 
                 border dark:bg-blue-600 dark:hover:bg-blue-700 
                 bg-blue-400 text-gray-50 font-semibold text-center gap-2 "
          >
            <span>Cơ bản</span>
          </button>
        </div>
      </div>

      <div className="flex gap-2 items-center justify-around text-gray-500">
        <div className="flex gap-1 items-center">
          <FaRegEye />
          <span>20</span>
        </div>
        <div className="flex gap-1 items-center">
          <HiOutlineUserGroup />
          <span>20</span>
        </div>
        <div className="flex gap-1 items-center">
          <FaQuestionCircle />
          <span>20</span>
        </div>
         <div className="flex gap-1 items-center">
          <IoDocumentText />
          <span>20</span>
        </div>
      </div>
    </div>
  );
}

export default ProposedCourse;
