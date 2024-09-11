import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/action/index";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userNamePassword, setUserNamePassword] = useState();
  const [password, setPassword] = useState();
  const userInfo = useSelector((state) => state?.auth?.userInfo);
  const isLogin = useSelector((state) => state?.auth?.isLogin);

  const ctx = useContext(AppContext);

  useEffect(() => {
    ctx.setIsHiddenNavbar(true);
    console.log("ctx login : ", ctx);
    return () => {
      ctx.setIsHiddenNavbar(false);
    };
  }, []);

  const isEmail = (email) => {
    return email.includes("@");
  };

  useEffect(() => {
    console.log("ctx login : ", ctx);
    if (
      userInfo?.success &&
      isLogin &&
      userInfo?.data?.user?.roles === "ADMIN"
    ) {
      navigate("/admin");
    }

    if (
      userInfo?.success &&
      isLogin &&
      userInfo?.data?.user?.roles !== "ADMIN"
    ) {
      navigate("/");
    }
  }, [userInfo]);

  //submit login form
  const handlerSubmitLoginForm = (e) => {
    e.preventDefault();
    let payload = "";
    try {
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
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <div className="flex flex-col items-center justify-center min-w-[480px] min-h-96 bg-white rounded-lg shadow-lg p-8 gap-4">
        <img
          height="35"
          width="110"
          alt="logo"
          className="cursor-pointer"
          src="/images/viblo.svg"
        />
        <h1 className="text-xl font-medium">Đăng nhập vào Viblo</h1>
        <div className="flex flex-col gap-3 w-full">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <FaUser className="text-gray-400" />
            </div>

            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full ps-10 p-2.5"
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
            className="p-2 bg-blue-500 text-gray-200 rounded-md hover:bg-sky-400"
            onClick={handlerSubmitLoginForm}
          >
            Đăng nhập
          </button>
          <div className="flex flex-row justify-between">
            <span
              to="/forgot-password"
              className="text-xs text-blue-600 font-medium hover:underline"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Quên mật khẩu
            </span>
            <Link
              to="/register"
              className="text-xs text-blue-600 font-medium hover:underline"
            >
              Tạo Tài khoản
            </Link>
          </div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
