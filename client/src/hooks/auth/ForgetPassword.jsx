
import { useEffect, useState } from "react";
const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSendEmail, setIsSendEmail] = useState(true);
  const validateEmail = (e) => {
    if (e.target?.value && e.target.value.match(isValidEmail)) {
      setIsSendEmail(true);
      setEmail(e.target.value);
    } else {
      setIsSendEmail(false);
    }
  };

  const handlerSubmit = (e) => {
    validateEmail(e);
  };
  return (
    <div className="flex flex-col items-center  w-full h-screen bg-slate-50 gap-5 py-5 ">
      <img
        height="43"
        width="130"
        alt="logo"
        className="cursor-pointer"
        src="/images/viblo.svg"
      />
      <div className="flex flex-col  justify-start w-[800px] min-h-72 bg-white rounded-lg shadow-lg p-8 gap-4 text-blue-900">
        <h1 className="text-xl font-medium">Quên mật khẩu</h1>
        <span>
          Bạn quên mật khẩu của mình? Đừng lo lắng! Hãy cung cấp cho chúng tôi
          email bạn sử dụng để đăng ký tài khoản Viblo. Chúng tôi sẽ gửi cho bạn
          một liên kết để đặt lại mật khẩu của bạn qua email đó.
        </span>
        <div className="mb-6 ">
          <label
            for="default-input"
            className=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex gap-2"
          >
            <span className="text-red-500">*</span>
            <span className="text-gray-500">Địa chỉ email của bạn</span>
          </label>
          <input
            type="email"
            id="default-input"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm  w-full p-2.5 out-line-red focus:ring-sky-100`}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {isSendEmail === false && (
            <span className="text-red-500">Email là bắt buộc</span>
          )}
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 float-right mt-3"
            onClick={(e)=> handlerSubmit(e)}
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
