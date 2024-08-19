import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/action/index";
import { useNavigate  } from "react-router-dom";

import toast from "react-hot-toast";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userNamePassword, setUserNamePassword] = useState();
  const [password, setPassword] = useState();
  const userInfo = useSelector((state) => state?.auth?.userInfo);
  

  const isEmail = (email) => {
    return email.includes("@");
  };
  

  useEffect(() => {
    if (userInfo?.success) {
      toast.success("Login success!");
      navigate("/");
    } else {
      toast.error("Your login information is not correct!");
    }
  }, [userInfo]);

  //submit login form 
  const handlerSubmitLoginForm = (e) => {
    e.preventDefault();
    let payload = "";

    if (isEmail(userNamePassword)) {
      payload = {
        email: userNamePassword,
        password,
      };
    } else {
      payload = {
        userName: userNamePassword,
        password,
      };
    }
    dispatch(actions.userLogin(payload));
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-slate-50 ">
      <div className="flex flex-col items-center justify-center min-w-[480px] min-h-96 bg-white rounded-lg shadow-lg p-8 gap-4">
        <img
          height="35"
          width="110"
          alt="logo"
          className="cursor-pointer"
          src="/images/viblo.svg"
        />
        <h1 className="text-xl font-medium">Đăng nhập vào Viblo</h1>
        <form className="flex flex-col gap-3 w-full">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <FaUser className="text-gray-400" />
            </div>

            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tên người dùng hoặc email"
              onChange={(e) => setUserNamePassword(e.target.value)}
            />
          </div>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>

            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="p-2 bg-sky-600 text-white rounded-md hover:bg-sky-400"
            onClick={handlerSubmitLoginForm}
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
