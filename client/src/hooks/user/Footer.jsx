import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaChrome } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
function Footer() {
  return (
    <footer className="dark:bg-gray-900 bg-[color:#0b1a33]">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          {/* SECTION 1 */}
          <div className="text-gray-200">
            <h2 className="mb-6 text-sm font-semibold uppercase ">Tài nguyên</h2>
            <ul className="text-gray-300 dark:text-gray-300 font-medium">
              <li className="mb-4">
                <a href="#" className=" hover:underline">
                  Bài viết
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Câu hỏi
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Videos
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Thảo luận
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Công cụ
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Trạng thái hệ thống
                </a>
              </li>
            </ul>
          </div>
          {/* SECTION 2 */}
          <div className="text-gray-200">
            <ul className="text-gray-300 dark:text-gray-300 font-medium">
              <li className="mb-4">
                <a href="#" className=" hover:underline">
                  Tổ chức
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Tags
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Tác giả
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Đề xuất hệ thống
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Machine learning
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
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
              <li className="mb-4 text-gray-300">
                <a href="#" className="hover:underline">
                  Viblo
                </a>
              </li>
              <li className="mb-4 text-gray-300">
                <a href="#" className="hover:underline">
                  Viblo Code
                </a>
              </li>
              <li className="mb-4 text-gray-300">
                <a href="#" className="hover:underline">
                  Viblo CTF
                </a>
              </li>
              <li className="mb-4 text-gray-300">
                <a href="#" className="hover:underline">
                  Viblo Learning
                </a>
              </li>
              <li className="mb-4 text-gray-300">
                <a href="#" className="hover:underline">
                  Viblo CV
                </a>
              </li>
              <li className="mb-4 text-gray-300">
                <a href="#" className="hover:underline">
                  Viblo Partner
                </a>
              </li>

              <li className="mb-4 text-gray-300">
                <a href="#" className="hover:underline">
                  Viblo Battle
                </a>
              </li>
              <li className="mb-4 text-gray-300">
                <a href="#" className="hover:underline">
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
            © 2024 <a href="#">thachdinh</a>. All Rights
            Reserved.
          </span>
          <ul className="flex text-gray-200 gap-3">
            <li>
              <a href="" className="hover:underline hover:text-gray-400">Về chúng tôi</a>
            </li>
            <li>
              <a href="" className="hover:underline hover:text-gray-400">Phản hồi</a>
            </li>
            <li>
              <a href="" className="hover:underline hover:text-gray-400">Giúp đỡ</a>
            </li>
            <li>
              <a href="" className="hover:underline hover:text-gray-400">FAQs</a>
            </li>
            <li>
              <a href="" className="hover:underline hover:text-gray-400">RSS</a>
            </li>
            <li>
              <a href="" className="hover:underline hover:text-gray-400">Điều khoản</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
