import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "flowbite";
import MDEditor from "@uiw/react-md-editor";
import MarkdownPreview from "@uiw/react-markdown-preview";
function PublishPost() {
  useEffect(() => {}, []);
  const [markdownText, setMarkdownText] = useState("**Hello world!**");
  return (
    <div className="w-full">
      <Navbar />
      <div className=" flex flex-col gap-5 p-5 bg-slate-100 w-screen">
        <div>
          <input
            type="text"
            id="default-input"
            placeholder="Tiêu đề  "
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none
            block w-full p-2.5 
            focus:ring-1 focus:border-blue-50    "
          />
        </div>
        <div className=" flex gap-5 ">
          <input
            type="text"
            id="default-input"
            placeholder="Tiêu đề  "
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  focus:outline-none 
            block p-2.5 
            focus:ring-1 focus:border-blue-50  w-4/6  "
          />
          <input
            type="text"
            id="default-input"
            placeholder="Tiêu đề  "
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none
            block p-2.5 
            focus:ring-1 focus:border-blue-50 w-1/6"
          />
          <div className="flex-grow">
            <button
              id="dropdownHoverButton"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              class="text-gray-500 border hover:bg-blue-100 focus:border-blue-500 focus:outline-none focus:text-blue-400 hover:text-blue-400  font-medium 
              rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center w-full  justify-center"
              type="button"
            >
              Dropdown{" "}
              <svg
                class="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {/* <!-- Dropdown menu --> */}
            <div
              id="dropdownHover"
              class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownHoverButton"
              >
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="">
          <MDEditor
            value={markdownText}
            onChange={setMarkdownText}
            height={600}
          />
        </div>
      </div>
    </div>
  );
}

export default PublishPost;
