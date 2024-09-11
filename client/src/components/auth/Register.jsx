import { useContext, useEffect, useState } from "react";
import SocialLogin from "./SocialLogin";
import { useNavigate  } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/action/index";
import toast from "react-hot-toast";
import { AppContext } from "../../contexts/AppContext";
const Register = () => {

  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmInfo, setConfirmInfo] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state?.auth?.userRegister);
  const ctx = useContext(AppContext)

   useEffect(() => {
    console.log('register')
    ctx.setIsHiddenNavbar(true)
    return () => {
      ctx.setIsHiddenNavbar(false)
    }
  }, [])

  // useEffect(() => {
  //   if (userInfo?.success) {
  //     toast.success("Register success!!!");
  //      navigate('/login');
  //   }else {
  //     toast.error("Register failed!!!");
  //   }
  // }, [userInfo]);


  const handlerSubmitRegisterForm = (e) => {
    e.preventDefault();
    const payload = {
      email,
      userName,
      password,
      fullName,
    };
    if (password === confirmPassword) {
      dispatch(actions.userRegister(payload));
    }
  };

  return (
    <div className="flex flex-col items-center  w-full h-screen bg-slate-50 gap-5 py-5 ">
      <img
        height="38"
        width="115"
        alt="logo"
        className="cursor-pointer"
        src="/images/viblo.svg"
      />
      <div className="flex flex-col  justify-start w-[650px] min-h-72 bg-white rounded-lg shadow-lg p-4 gap-4 text-blue-900">
        <h1 className="text-xl font-medium">Đăng ký tài khoản cho Viblo</h1>
        <span className="text-sm">
          Chào mừng bạn đến <span className="font-medium">Nền tảng Viblo!</span>{" "}
          Tham gia cùng chúng tôi để tìm kiếm thông tin hữu ích cần thiết để cải
          thiện kỹ năng IT của bạn. Vui lòng điền thông tin của bạn vào biểu mẫu
          bên dưới để tiếp tục.
        </span>

        <form>
          <div className="mb-6">
            <input
              type="text"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-100 focus:border-blue-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tên của bạn"
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <input
                type="email"
                id="website"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-100 focus:border-blue-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                id="visitors"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-100 focus:border-blue-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tên tài khoản"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6">
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-100 focus:border-blue-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Mật khẩu"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="confirm_password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-100 focus:border-blue-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập lại mật khẩu"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value={confirmInfo}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600
                 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
                onChange={(e) => setConfirmInfo(e.target.checked)}
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Tôi đồng ý với{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                điều khoản và dịch vụ của Viblo
              </a>
              .
            </label>
          </div>
          <button
            type="submit"
            className={`text-white 
              ${!confirmInfo ? "bg-blue-400" : "bg-blue-700"}
                ${!confirmInfo ? "hover:bg-blue-500" : "bg-blue-800"}
                focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 
                text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full`}
            disabled={!confirmInfo}
            onClick={(e) => handlerSubmitRegisterForm(e)}
          >
            Đăng ký
          </button>
        </form>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
