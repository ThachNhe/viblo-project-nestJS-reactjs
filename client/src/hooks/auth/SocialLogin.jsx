import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
const Login = () => {
  return (
    <div className="flex flex-col gap-5 mb-3 ">
      <div className="flex items-center justify-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-3 text-gray-900 font-medium">Đăng nhập bằng</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="flex flex-row justify-between">
        <div className=" flex flex-row gap-5 ">
          <button
            type="button"
            class="px-3 py-2 text-xs  inline-flex items-center bg-slate-50 rounded-md hover:bg-blue-100 focus:ring-1 
                focus:outline-none focus:ring-blue-300  border  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                 text-gray-700 hover:text-blue-400  font-medium text-center gap-2 md:min-w-[120px] w-14"
          >
            <FaFacebookF className="text-blue-800" />
            <span>Facebook</span>
          </button>
        </div>

        <div className=" flex flex-row gap-3  min-w-14">
          <button
            type="button"
            class="px-3 py-2 text-xs  inline-flex items-center bg-slate-50 rounded-md hover:bg-blue-100 focus:ring-1 focus:outline-none
                 focus:ring-blue-300  border  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-gray-700 
                 hover:text-blue-400  font-medium text-center gap-2  md:min-w-[120px]"
          >
            <FaGoogle className="text-red-600" />
            <span>Google</span>
          </button>
        </div>

        <div className=" flex flex-row gap-5 min-w-9">
          <button
            type="button"
            class="px-3 py-2 text-xs  inline-flex items-center bg-slate-50 rounded-md hover:bg-blue-100 focus:ring-1 
                focus:outline-none focus:ring-blue-300  border  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                 text-gray-700 hover:text-blue-400  font-medium text-center gap-2 md:min-w-[120px]"
          >
            <FaGithub className="text-black-600" />
            <span>Github</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
