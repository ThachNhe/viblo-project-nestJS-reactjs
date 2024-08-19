import { useEffect, useState } from "react";
import SocialLogin from "./SocialLogin";
const Register = () => {
  return (
    <div class="flex flex-col items-center  w-full h-screen bg-slate-50 gap-5 py-5 ">
      <img
        height="38"
        width="115"
        alt="logo"
        className="cursor-pointer"
        src="/images/viblo.svg"
      />
      <div class="flex flex-col  justify-start w-[650px] min-h-72 bg-white rounded-lg shadow-lg p-4 gap-4 text-blue-900">
        <h1 className="text-xl font-medium">Đăng ký tài khoản cho Viblo</h1>
        <span className="text-sm">
          Chào mừng bạn đến <span className="font-medium">Nền tảng Viblo!</span> Tham gia cùng chúng tôi để tìm kiếm
          thông tin hữu ích cần thiết để cải thiện kỹ năng IT của bạn. Vui lòng
          điền thông tin của bạn vào biểu mẫu bên dưới để tiếp tục.
        </span>

        <form>
          <div class="mb-6">
            <input
              type="text"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-100 focus:border-blue-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tên của bạn"
              required
            />
          </div>


          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
             
              <input
                type="email"
                id="website"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-100 focus:border-blue-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email"
                required
              />
            </div>
            <div>
             
              <input
                type="text"
                id="visitors"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-100 focus:border-blue-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tên tài khoản"
                required
              />
            </div>
          </div>

          <div class="mb-6">
            <input
              type="password"
              id="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-100 focus:border-blue-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Mật khẩu"
              required
            />
          </div>
          <div class="mb-6">
            <input
              type="password"
              id="confirm_password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-100 focus:border-blue-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập lại mật khẩu"
              required
            />
          </div>


          <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600
                 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <label
              for="remember"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Tôi đồng ý với{" "}
              <a
                href="#"
                class="text-blue-600 hover:underline dark:text-blue-500"
              >
                điều khoản và dịch vụ của Viblo
              </a>
              .
            </label>
          </div>
         
        </form>
         <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-screen sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Đăng ký
          </button>
          <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
