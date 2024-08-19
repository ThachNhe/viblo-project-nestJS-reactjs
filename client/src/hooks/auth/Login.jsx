
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
const Login = () => {
  return (
    <div class="flex items-center justify-center w-full h-screen bg-slate-50 ">
      <div class="flex flex-col items-center justify-center min-w-[480px] min-h-96 bg-white rounded-lg shadow-lg p-8 gap-4">
        <img
          height="35"
          width="110"
          alt="logo"
          className="cursor-pointer"
          src="/images/viblo.svg"
        />
        <h1 className="text-xl font-medium">Đăng nhập vào Viblo</h1>
        <form class="flex flex-col gap-3 w-full">
          <div class="relative mb-6">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <FaUser className="text-gray-400" />
            </div>

            <input
              type="text"
              id="input-group-1"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tên người dùng hoặc email"
            />
          </div>
          <div class="relative mb-6">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>

            <input
              type="text"
              id="input-group-1"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Mật khẩu"
            />
          </div>

          <button
            type="submit"
            class="p-2 bg-sky-600 text-white rounded-md hover:bg-sky-400"
          >
            Đăng nhập
          </button>
          <div className="flex flex-row justify-between">
            <a
              href="/forgot-password"
              className="text-xs text-blue-600 font-medium hover:underline"
            >
              Quên mật khẩu
            </a>
            <a
              href="/register"
              className="text-xs text-blue-600 font-medium hover:underline"
            >
              Tạo Tài khoản
            </a>
          </div>
          <SocialLogin />
        </form>
      </div>
    </div>
  );
};

export default Login;
