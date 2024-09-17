import CardDataStats from "../Tables/CardDataStats";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import * as services from "../../../services/index";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/action/index";

function TagManagement() {
  const dispatch = useDispatch();
  const [tagName, setTagName] = useState("");
  const [tagDescription, setTagDescription] = useState("");
  const [isTagExisting, setIsTagExisting] = useState(false);
  const tagStatisticData = useSelector((state) => state.statistic.tagStatisticData);


  useEffect(() => {
    dispatch(actions.tagStatistic());
  }, [])

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (tagName) {
        checkTagExists(tagName);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [tagName]);

  const checkTagExists = async (name) => {
    try {
      const response = await services.isExist(name);
      setIsTagExisting(response.data);
    } catch (error) {
      console.error("Error checking tag existence:", error);
    }
  };

  const handleCreateTag = async (e) => {
    e.preventDefault();
    try {
      if (!isTagExisting) {
        const res = await services.createTag({
          name: tagName,
          description: tagDescription,
        });
        if (res.success) {
          toast.success("Tạo tag thành công!!!");
          setTagDescription("");
          setTagName("");
        }
      } else {
        toast.error("Xin vui lòng tạo tag với tên khác!!!");
      }
    } catch (error) {
      console.error("Error creating tag:", error);
      toast.error("Tạo tag thất bại!!!");
    }
  };

  return (
    <>
      <Breadcrumb pageName="Tags" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Create Tag Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Tạo Tag mới
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white ">
                    Tên Tag
                  </label>
                  <input
                    type="text"
                    placeholder="Tag của bạn..."
                    className={`w-full rounded border-[1.5px]  bg-transparent py-3 px-5 text-black
                     outline-none transition disabled:cursor-default disabled:bg-whiter 
                    ${
                      isTagExisting
                        ? "border-danger focus:border-danger active:border-danger focus:ring-0 "
                        : "border-stroke focus:border-primary active:border-primary "
                    }
                    
                    `}
                    onChange={(e) => setTagName(e.target.value)}
                    value={tagName}
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Mô tả
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Mô tả tag của bạn..."
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={(e) => setTagDescription(e.target.value)}
                    value={tagDescription}
                  ></textarea>
                </div>

                <button
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  onClick={(e) => handleCreateTag(e)}
                >
                  Tạo
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <CardDataStats
            title="Tổng số tag"
            total={tagStatisticData?.data?.tagNumber}
            rate="0.95%"
            levelDown
          >
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="18"
              viewBox="0 0 22 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
                fill=""
              />
              <path
                d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
                fill=""
              />
              <path
                d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
                fill=""
              />
            </svg>
          </CardDataStats>
          <CardDataStats
            title="Tổng bài viết của tag"
             total={tagStatisticData?.data?.postNumber}
            rate="4.35%"
            levelUp
          >
            <svg
              width="22"
              height="18"
              viewBox="0 0 24 24"
              className="fill-primary dark:fill-white"
              fill="CurrentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M18.18 8.03933L18.6435 7.57589C19.4113 6.80804 20.6563 6.80804 21.4241 7.57589C22.192 8.34374 22.192 9.58868 21.4241 10.3565L20.9607 10.82M18.18 8.03933C18.18 8.03933 18.238 9.02414 19.1069 9.89309C19.9759 10.762 20.9607 10.82 20.9607 10.82M18.18 8.03933L13.9194 12.2999C13.6308 12.5885 13.4865 12.7328 13.3624 12.8919C13.2161 13.0796 13.0906 13.2827 12.9882 13.4975C12.9014 13.6797 12.8368 13.8732 12.7078 14.2604L12.2946 15.5L12.1609 15.901M20.9607 10.82L16.7001 15.0806C16.4115 15.3692 16.2672 15.5135 16.1081 15.6376C15.9204 15.7839 15.7173 15.9094 15.5025 16.0118C15.3203 16.0986 15.1268 16.1632 14.7396 16.2922L13.5 16.7054L13.099 16.8391M13.099 16.8391L12.6979 16.9728C12.5074 17.0363 12.2973 16.9867 12.1553 16.8447C12.0133 16.7027 11.9637 16.4926 12.0272 16.3021L12.1609 15.901M13.099 16.8391L12.1609 15.901"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                />
                <path
                  d="M8 13H10.5"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M8 9H14.5"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M8 17H9.5"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M3 14V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157M21 14C21 17.7712 21 19.6569 19.8284 20.8284M4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284M19.8284 20.8284C20.7715 19.8853 20.9554 18.4796 20.9913 16"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </CardDataStats>
        </div>
      </div>
    </>
  );
}

export default TagManagement;
