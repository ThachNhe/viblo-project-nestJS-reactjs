import { useContext, useEffect, useState, useRef } from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";
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
import { AppContext } from "../../contexts/AppContext";
import { handlerFileUpload } from "../../utils/utils";

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
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [markdownText, setMarkdownText] = useState("");
  const UserInfo = useSelector((state) => state.auth.userInfo);
  const [status, setStatus] = useState("PUBLIC");
  const navigator = useNavigate();
  const ctx = useContext(AppContext);
  const [tagOptions, setTagOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [openPublishPost, setOpenPublishPost] = useState(false);

  const onClickPublishPost = () => {
    setOpenPublishPost(!openPublishPost);
  };
  // call api to get tag options
  const fetchTagOptions = async (input) => {
    try {
      const response = await services.getTagSearch(input);
      const options = buildSelectTagOption(response.data);
      setTagOptions(options);
    } catch (error) {
      console.error("Error fetching tag options:", error);
    }
  };

  const filteredCommands = commands
    .getCommands()
    .filter((cmd) => cmd.name !== "image");

  useEffect(() => {
    initFlowbite();
    dispatch(actions.getAllTag());
    ctx.setIsHomePage(false);
    return () => {
      ctx.setIsHomePage(true);
    };
  }, []);

  // Handle select change
  const handleSelectChange = (selected) => {
    console.log("Selected: ", selected);
    setSelectedOption(selected);
  };

  // Handler input change
  const handleInputChange = (input) => {
    setInputValue(input);
    if (input.length === 0) return;
    fetchTagOptions(input);
  };

  const title3 = {
    name: "title3",
    keyCommand: "title3",
    buttonProps: { "aria-label": "Insert title3" },
    icon: (
      <svg width="12" height="12" viewBox="0 0 520 520">
        <path
          fill="currentColor"
          d="M15.7083333,468 C7.03242448,468 0,462.030833 0,454.666667 L0,421.333333 C0,413.969167 7.03242448,408 15.7083333,408 L361.291667,408 C369.967576,408 377,413.969167 377,421.333333 L377,454.666667 C377,462.030833 369.967576,468 361.291667,468 L15.7083333,468 Z M21.6666667,366 C9.69989583,366 0,359.831861 0,352.222222 L0,317.777778 C0,310.168139 9.69989583,304 21.6666667,304 L498.333333,304 C510.300104,304 520,310.168139 520,317.777778 L520,352.222222 C520,359.831861 510.300104,366 498.333333,366 L21.6666667,366 Z M136.835938,64 L136.835937,126 L107.25,126 L107.25,251 L40.75,251 L40.75,126 L-5.68434189e-14,126 L-5.68434189e-14,64 L136.835938,64 Z M212,64 L212,251 L161.648438,251 L161.648438,64 L212,64 Z M378,64 L378,126 L343.25,126 L343.25,251 L281.75,251 L281.75,126 L238,126 L238,64 L378,64 Z M449.047619,189.550781 L520,189.550781 L520,251 L405,251 L405,64 L449.047619,64 L449.047619,189.550781 Z"
        />
      </svg>
    ),
    execute: (state, api) => {
      let modifyText = `### ${state.selectedText}\n`;
      if (!state.selectedText) {
        modifyText = `### `;
      }
      api.replaceSelection(modifyText);
    },
  };

  const handleCheckboxChange = (event) => {
    setStatus(event.target.id);
  };

  const handlerCreatePost = async (e) => {
    e.preventDefault();
    let payload = {
      title: title,
      contentMarkdown: markdownText,
      tagArray: tagOptions?.map((item) => item.value),
      status: status,
      authorId: +UserInfo?.data?.user?.id,
    };

    console.log("Payload: ", payload);

    try {
      const post = await services.createPost(payload);
      if (post.success) {
        setMarkdownText("");
        setTitle("");
        setStatus("PUBLIC");
        navigator("/homepage", { state: { data: post?.data?.id } });
        toast.success("Tạo bài viết thành công!!");
      }
    } catch (e) {
      console.log("error : ", e);
      toast.error("Tạo bài viết thất bại!!");
    }
  };

  const handlerUploadImg = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Mở cửa sổ chọn file
    }
  };

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      const imgURL = await handlerFileUpload(file);
      const imageUrl = `![${file.name}](${imgURL.imageURL})`;
      setMarkdownText((prevMarkdown) => `${prevMarkdown}\n${imageUrl}`);
    } catch (error) {
      console.log("Error upload Img!! : ", error);
    }
  };

  const buildSelectTagOption = (tags) => {
    return tags?.map((tag) => {
      return {
        value: tag.name,
        label: tag.name,
      };
    });
  };

  return (
    <div className="w-full min-h-full">
      <div className=" flex flex-col gap-5  bg-neutral-100 px-10 py-5">
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
              onChange={handleSelectChange}
              onInputChange={handleInputChange}
              options={tagOptions}
              isMulti={true}
              inputValue={inputValue} // Đảm bảo state của input được đồng bộ
              placeholder="Gắn thẻ bài viết của bạn. Tối đa 5 thẻ. Ít nhất 1 thẻ!"
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
                type="button"
                className=" text-gray-500 border hover:bg-blue-100 border-gray-400 focus:border-blue-500 focus:outline-none 
              focus:text-blue-400 hover:text-blue-400  font-medium bg-gray-50
              rounded-sm text-sm px-5 py-2 text-center inline-flex items-center w-full justify-center "
                onClick={onClickPublishPost}
              >
                Xuất bản bài viết
                <RiArrowDropDownLine className="text-2xl" />
              </button>

              {/* <!-- Dropdown menu --> */}
              {openPublishPost && (
                <div
                  className={`absolute 
            rounded-md
            shadow-md
            min-w-[300px]
            overflow-hidden
            right-0
            top-8
            text-sm
            mt-3
            border
            z-10
            p-3
            bg-white
            transition-all duration-300 ease-out
            transform ${
              openPublishPost ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }
          `}
                >
                  <div className="flex flex-col gap-2 ">
                    <span>Xuất bản bài viết của bạn</span>
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
                      <FaLock className="text-xs text-neutral-500" />
                      <span>Mọi người có thể thấy bài viết.</span>
                    </div>
                    <span>
                      <button
                        type="button"
                        className="py-1 px-3 text-xs inline-flex items-center bg-slate-50 rounded-md hover:bg-blue-100 focus:ring-1 
                          focus:outline-none focus:ring-blue-300 border dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                          text-gray-700 hover:text-blue-400 font-medium text-center gap-2 bg-neutral-200"
                        onClick={(e) => handlerCreatePost(e)}
                      >
                        <span>Xuất bản</span>
                      </button>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* MARKDOWN */}
        <div className="py-5">
          <MDEditor
            value={markdownText}
            onChange={setMarkdownText}
            height={500}
            placeholder="Cứ pháp markdown được hỗ trợ"
            className="placeholder-gray-500 font-medium"
            commands={[
              ...filteredCommands,
              title3,
              commands.group(
                [
                  commands.title1,
                  commands.title2,
                  commands.title3,
                  commands.title4,
                  commands.title5,
                  commands.title6,
                ],
                {
                  name: "title",
                  groupName: "title",
                  buttonProps: { "aria-label": "Insert title" },
                }
              ),
              commands.divider,
              commands.group([], {
                name: "update",
                groupName: "update",
                icon: (
                  <svg
                    fill="#000000"
                    width="13px"
                    height="13px"
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>image</title>
                    <path d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h20q2.464 0 4.224-1.76t1.76-4.224v-20q0-2.496-1.76-4.256t-4.224-1.76h-20q-2.496 0-4.256 1.76t-1.76 4.256v20zM4 26.016v-20q0-0.832 0.576-1.408t1.44-0.608h20q0.8 0 1.408 0.608t0.576 1.408v20q0 0.832-0.576 1.408t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.408zM6.016 24q0 0.832 0.576 1.44t1.408 0.576h16q0.832 0 1.408-0.576t0.608-1.44v-0.928q-0.224-0.448-1.12-2.688t-1.6-3.584-1.28-2.112q-0.544-0.576-1.12-0.608t-1.152 0.384-1.152 1.12-1.184 1.568-1.152 1.696-1.152 1.6-1.088 1.184-1.088 0.448q-0.576 0-1.664-1.44-0.16-0.192-0.48-0.608-1.12-1.504-1.6-1.824-0.768-0.512-1.184 0.352-0.224 0.512-0.928 2.24t-1.056 2.56v0.64zM6.016 9.024q0 1.248 0.864 2.112t2.112 0.864 2.144-0.864 0.864-2.112-0.864-2.144-2.144-0.864-2.112 0.864-0.864 2.144z"></path>
                  </svg>
                ),
                children: () => {
                  return (
                    <div className="p-3 flex flex-col gap-3">
                      <label className="font-medium text-gray-600">
                        Tải ảnh của bạn lên đây
                      </label>
                      <button
                        type="button"
                        className="py-1 px-3 text-xs  inline-flex items-center rounded-md 
                 border bg-blue-400 text-gray-50 font-semibold text-center gap-2 focus:bg-blue-500 max-w-fit "
                        onClick={handlerUploadImg}
                      >
                        <span>Tải lên</span>
                      </button>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef} // Gán ref cho input file
                        style={{ display: "none" }} // Ẩn input file
                        onChange={handleFileChange} // Lắng nghe sự kiện thay đổi file
                      />
                    </div>
                  );
                },
                execute: (state, api) => {
                  console.log(">>>>>>update>>>>>", state);
                },
                buttonProps: { "aria-label": "Insert title" },
              }),
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(PublishPost);
