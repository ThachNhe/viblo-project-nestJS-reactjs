import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import MDEditor from "@uiw/react-md-editor";
import * as actions from "../../redux/action/index";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { FaLock } from "react-icons/fa";
import * as services from "../../services/index";
import toast from "react-hot-toast";
import { RiArrowDropDownLine } from "react-icons/ri";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { initFlowbite } from "flowbite";

const options = [
  { value: "Nodejs", label: "Nodejs" },
  { value: "Js", label: "Js" },
  { value: "Java", label: "Java" },
];

const checkboxSelect = [
  { id: "PUBLIC", type: "checkbox", label: "Công khai" },
  { id: "LINK", type: "checkbox", label: "Bất kì ai với link" },
  { id: "PRIVATE", type: "checkbox", label: "Chỉ mình tôi" },
];

function PublishPost() {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tag.tags);
  const [title, setTitle] = useState("");
  const [tagInputs, setTags] = useState("");
  const [markdownText, setMarkdownText] = useState("");
  const UserInfo = useSelector((state) => state.auth.userInfo);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigator = useNavigate();

  useEffect(() => {
    initFlowbite();
    dispatch(actions.getAllTag());
  }, []);

  // State to track which checkbox is selected
  const [status, setStatus] = useState("");

  // Handler to update selected checkbox
  const handleCheckboxChange = (event) => {
    setStatus(event.target.id);
  };

  const handlerCreatePost = async () => {
    let payload = {
      title: title,
      contentMarkdown: markdownText,
      tagArray: options.map((item) => item.value),
      status: status,
      authorId: +UserInfo?.data?.user?.id,
    };

    try {
      const post = await services.createPost(payload);
      if (post.success) {
        setMarkdownText("");
        setTitle("");
        setTags("");
        setStatus("PUBLIC");
        navigator("/", { state: { data: post?.data?.id } });
        toast.success("Tạo bài viết thành công!!");
      }
    } catch (e) {
      console.log("error : ", e);
      toast.error("Tạo bài viết thất bại!!");
    }
  };

  return (
    <div className="w-full min-h-full">
      <Navbar />
      <div className=" flex flex-col gap-5  bg-slate-100 px-10 py-5">
        <div>
          <input
            type="text"
            id="default-input"
            placeholder="Tiêu đề "
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none
            block w-full p-2.5 
            focus:ring-1 focus:border-blue-50  placeholder-gray-500 font-medium"
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={title}
          />
        </div>

        <div className=" flex gap-5 ">
          <div
            className="  border-gray-300 text-gray-900 text-sm rounded-sm  focus:outline-none 
             focus:border-blue-50  w-4/6  placeholder-gray-500 font-medium "
          >
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti={true}
              placeholder={
                "Gắn thẻ bài viết của bạn. Tối đa 5 thẻ. Ít nhất 1 thẻ!"
              }
            />
          </div>

          <input
            type="text"
            id="default-input"
            placeholder="Thay đổi ảnh thu nhỏ"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none
            block p-2
            focus:ring-1 focus:border-blue-50 w-1/6 placeholder-gray-500 font-medium"
            defaultValue={""}
          />

          <div className="flex-grow">
            <div className="relative">
              <button
                id="dropdownHoverButton"
                data-dropdown-toggle="dropdownHover"
                data-dropdown-trigger="hover"
                type="button"
                className=" text-gray-500 border hover:bg-blue-100 border-gray-400 focus:border-blue-500 focus:outline-none 
              focus:text-blue-400 hover:text-blue-400  font-medium 
              rounded-sm text-sm px-5 py-2 text-center inline-flex items-center w-full justify-center"
              >
                Dropdown
                <RiArrowDropDownLine className="text-2xl" />
              </button>

              {/* <!-- Dropdown menu --> */}
              <div
                id="dropdownHover"
                className="z-10 hidden absolute right-0 mr-40 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-700 min-w-80 p-4"
              >
                <div className="flex flex-col gap-2 ">
                  <span>Xuất bản bài viết của bạn </span>
                  <span>
                    <span className="font-md font-bold text-gray-600">
                      Giấy phép
                    </span>
                    <span className="text-sm font-normal">
                      : All rights reserved
                    </span>
                  </span>
                  <span>Hiển thị:</span>
                  <div className="flex flex-col gap-2">
                    {checkboxSelect.map((item, index) => {
                      return (
                        <div className="flex items-center me-4" key={index}>
                          <input
                            defaultChecked={status === `${item.id}`}
                            value={item.id}
                            id={item.id}
                            type={item.type}
                            checked={status === `${item.id}`}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor={item.label}
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {item.label}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <hr className="border-t w-full mt-2 text-gray-500" />
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex text-xs items-center gap-1">
                    <FaLock className="text-xs text-gray-400" />
                    <span>Mọi người có thể thấy bài viết.</span>
                  </div>
                  <span>
                    <button
                      type="button"
                      className="py-1 px-3 text-xs  inline-flex items-center bg-slate-50 rounded-md hover:bg-blue-100 focus:ring-1 
                                  focus:outline-none focus:ring-blue-300  border  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                                text-gray-700 hover:text-blue-400  font-medium text-center gap-2 "
                      onClick={() => handlerCreatePost()}
                    >
                      <span>Xuất bản</span>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* MARKDOWN */}
        <div className=" ">
          <MDEditor
            value={markdownText}
            onChange={setMarkdownText}
            height={500}
            placeholder="Cứ pháp markdown được hỗ trợ"
            className="placeholder-gray-500 font-medium"
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(PublishPost);
