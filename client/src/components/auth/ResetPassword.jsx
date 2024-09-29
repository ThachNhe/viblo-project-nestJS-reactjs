import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import debounce from "lodash/debounce"
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import  * as services from "../../services/index"

function ResetPassword() {
  const ctx = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
   const [isValidEmail, setIsValidEmail] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { token } = useParams();
  useEffect(() => {
    ctx.setIsHiddenNavbar(true);
    return () => {
      ctx.setIsHiddenNavbar(false);
    };
  });

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


  const handlerResetPassword = async (e) => {
    e.preventDefault();
    if (!email || !newPassword || !confirmNewPassword) {
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("Password and confirm password do not match");
      return;
    }

    if(!isValidEmail) {
      toast.error("Email is invalid")
      return;
    }

    try {
      const res = await services.resetPassword({email, token, newPassword});
      if(res.success) {
        toast.success("Bạn đã thay đổi mật khẩu thành công!")
        navigate("/login");
      }
    } catch (error) {
      console.log("error from reset password : ", error)
    }
  }

  return (
    <div className="flex flex-col items-center  w-full h-screen bg-slate-50 gap-5 py-5 ">
      <img
        height="43"
        width="130"
        alt="logo"
        className="cursor-pointer"
        src="/images/viblo.svg"
      />
      <div
        className="flex flex-col  justify-start max-w-2xl min-h-72 bg-white rounded-sm shadow-lg p-8 gap-4 text-blue-900 border
      "
      >
        <h2 class="text-2xl font-medium">Làm mới mật khẩu</h2>
        <p class="text-sm text-gray-500 mb-4">
         Gần xong rồi, đổi mật khẩu là xong. Bạn nên giữ mật khẩu mạnh để ngăn chặn việc truy cập trái phép vào tài khoản của mình.
        </p>

        <form>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">
              * Email Address
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
            {!email && (
              <p class="text-red-500 text-sm mt-1">Email là bắt buộc</p>
            )}
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">
              * Mật khẩu mới
            </label>
            <input
              type="password"
               className={`class="mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-0 sm:text-sm
                ${
                  !newPassword &&
                  "focus:ring-0 border-red-500 focus:border-red-500"
                }
                `}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {!newPassword && (
              <p class="text-red-500 text-sm mt-1">Mật khẩu mới là bắt buộc</p>
            )}
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700">
              * Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:ring-0 sm:text-sm"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={(e) => handlerResetPassword(e)}
          >
            Thay đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
