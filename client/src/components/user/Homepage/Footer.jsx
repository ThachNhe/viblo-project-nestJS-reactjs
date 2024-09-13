import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaChrome } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Avatar from "../../navbar/Avatar";
function Footer() {
  return (
    <footer className="dark:bg-gray-900 bg-[color:#0b1a33]">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          {/* SECTION 1 */}
          <div className="text-gray-200">
            <h2 className="mb-6 text-sm font-semibold uppercase ">
              Tài nguyên
            </h2>
            <ul className="text-gray-300 dark:text-gray-300 font-medium">
              <li className="mb-4">
                <a href="#" className=" ">
                  Bài viết
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="">
                  Câu hỏi
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="">
                  Videos
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="">
                  Thảo luận
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="">
                  Công cụ
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="">
                  Trạng thái hệ thống
                </a>
              </li>
            </ul>
          </div>
          {/* SECTION 2 */}
          <div className="text-gray-200">
            <ul className="text-gray-300 dark:text-gray-300 font-medium">
              <li className="mb-4">
                <a href="#" className=" ">
                  Tổ chức
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="">
                  Tags
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="">
                  Tác giả
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="">
                  Đề xuất hệ thống
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="">
                  Machine learning
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="">
                  Trạng thái hệ thống
                </a>
              </li>
            </ul>
          </div>
          {/* SECTION 3 */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-200 uppercase dark:text-white">
              dịch vụ
            </h2>
            <ul className="text-gray-500 dark:text-gray-300 font-medium">
              <li className="mb-4 text-gray-300 flex gap-2">
                <img
                  src="/images/favicon.ico"
                  alt="Favicon"
                  className="footer-favicon"
                  height={24}
                  width={24}
                />
                <a href="#" className="hover:text-gray-600">
                  Viblo
                </a>
              </li>
              <li className="mb-4 text-gray-300 flex gap-2">
                <img
                  src="/images/viblo-code.png"
                  alt="Viblo Code"
                  width="24"
                  height="24"
                  className="link-icon"
                />
                <a href="#" className="hover:text-gray-600">
                  Viblo Code
                </a>
              </li>
              <li className="mb-4 text-gray-300 flex gap-2">
                <img
                  src="/images/viblo-ctf.png"
                  alt="Favicon"
                  className="footer-favicon"
                  height={24}
                  width={24}
                />
                <a href="#" className="hover:text-gray-600">
                  Viblo CTF
                </a>
              </li>
              <li className="mb-4 text-gray-300 flex gap-2">
                <img
                  src="/images/viblo-learn.png"
                  alt="Favicon"
                  className="footer-favicon"
                  height={24}
                  width={24}
                />
                <a href="#" className="hover:text-gray-600">
                  Viblo Learning
                </a>
              </li>
              <li className="mb-4 text-gray-300 flex gap-2">
                <img
                  src="/images/viblo-cv.png"
                  alt="Favicon"
                  className="footer-favicon"
                  height={24}
                  width={24}
                />
                <a href="#" className="hover:text-gray-600">
                  Viblo CV
                </a>
              </li>
              <li className="mb-4 text-gray-300 flex gap-2">
                <img
                  src="/images/viblo-partner.png"
                  alt="Favicon"
                  className="footer-favicon"
                  height={24}
                  width={24}
                />
                <a href="#" className="hover:text-gray-600">
                  Viblo Partner
                </a>
              </li>

              <li className="mb-4 text-gray-300 flex gap-2">
                <img
                  src="/images/viblo-battle.png"
                  alt="Favicon"
                  className="footer-favicon"
                  height={24}
                  width={24}
                />
                <a href="#" className="hover:text-gray-600">
                  Viblo Battle
                </a>
              </li>
              <li className="mb-4 text-gray-300 flex gap-2">
                <img
                  src="/images/favicon.ico"
                  alt="Favicon"
                  className="footer-favicon"
                  height={24}
                  width={24}
                />

                <a href="#" className="hover:text-gray-600">
                  Viblo Interview
                </a>
              </li>
            </ul>
          </div>

          {/* SECTION 4 */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-200 uppercase dark:text-white">
              Ứng dụng di động
            </h2>
            <div className="flex gap-2">
              <img width="150" src="/images/store.png" />
              <img src="/images/QR.png" />
            </div>
            <div className="py-6 text-sm font-semibold text-gray-200 uppercase dark:text-white">
              Liên kết
            </div>
            <div className="flex gap-3 text-gray-300  text-lg ">
              <FaFacebookF />
              <FaGithub />
              <FaChrome />
              <FaInstagram />
            </div>
          </div>
        </div>

        <div className="px-4 py-12 dark:bg-gray-700 md:flex md:items-center md:justify-between border-t border-gray-400 ">
          <span className="text-sm text-gray-200 dark:text-gray-300 sm:text-center font-medium">
            © 2024 <a href="#">thachdinh</a>. All Rights Reserved.
          </span>
          <ul className="flex text-gray-200 gap-3">
            <li>
              <a href="" className=" hover:text-neutral-500">
                Về chúng tôi
              </a>
            </li>
            <li>
              <a href="" className=" hover:text-neutral-500">
                Phản hồi
              </a>
            </li>
            <li>
              <a href="" className=" hover:text-neutral-500">
                Giúp đỡ
              </a>
            </li>
            <li>
              <a href="" className=" hover:text-neutral-500">
                FAQs
              </a>
            </li>
            <li>
              <a href="" className=" hover:text-neutral-500">
                RSS
              </a>
            </li>
            <li>
              <a href="" className=" hover:text-neutral-500">
                Điều khoản
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
