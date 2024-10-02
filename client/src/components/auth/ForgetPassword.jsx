import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import debounce from "lodash/debounce"
import * as  services from '../../services/index'
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
   const [isValidEmail, setIsValidEmail] = useState(null);

  const ctx = useContext(AppContext);

  useEffect(() => {
    ctx?.setIsHiddenNavbar(true)
    return () => {
      ctx?.setIsHiddenNavbar(false)
    }
  }, [])

  // Hàm kiểm tra định dạng email hợp lệ
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailValidation = debounce(email => {
    if(validateEmail(email)) {
      setIsValidEmail(true)
    }else {
      setIsValidEmail(false)
    }
  }, 300);

  useEffect(() => {
    if(email) {
      handleEmailValidation(email)
    }else{
      setIsValidEmail(null)
    }
  }, [email]);

  const handlerSubmitForgotPassword = async (e) => {
    e.preventDefault();
   
    if(!isValidEmail || !email) {
      alert("Email không hợp lệ");
      return;
    }
    try {
      const payload = {email}
      const res = await services.forgotPassword(payload);
      if(res.success) {
        setEmail("");
        toast.success("Vui lòng kiểm tra email của bạn để đặt lại mật khẩu")
      }
    } catch (error) {
      console.log("check error : ", error)
    }
  }


  return (
    <div className="flex flex-col items-center  w-full h-screen bg-slate-50 gap-5 py-5  ">
      <img
        height="43"
        width="130"
        alt="logo"
        className="cursor-pointer"
        src="/images/viblo.svg"
      />
      <div className="flex flex-col  justify-start w-[800px] min-h-72 bg-white rounded-lg shadow-lg p-8 gap-4 text-blue-900 border">
        <h1 className="text-xl font-medium">Quên mật khẩu</h1>
        <span>
          Bạn quên mật khẩu của mình? Đừng lo lắng! Hãy cung cấp cho chúng tôi
          email bạn sử dụng để đăng ký tài khoản Viblo. Chúng tôi sẽ gửi cho bạn
          một liên kết để đặt lại mật khẩu của bạn qua email đó.
        </span>
        <div className="mb-6 ">
          <label
            htmlFor="default-input"
            className=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex gap-2"
          >
            <span className="text-red-500">*</span>
            <span className="text-gray-500">Địa chỉ email của bạn</span>
          </label>
          <input
             type="email"
              className={`class="mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-0 sm:text-sm
                ${
                  !isValidEmail &&
                  "focus:ring-0 border-red-500 focus:border-red-500"
                }
                `}
              onChange={(e) => setEmail(e.target.value)}
          />
          {!isValidEmail && (
            <span className="text-red-500">Email là bắt buộc</span>
          )}
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 float-right mt-3"
            onClick={(e)=> handlerSubmitForgotPassword(e)}
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
