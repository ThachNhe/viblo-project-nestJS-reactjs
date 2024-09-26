import DialogModal from "../../Dialogmodal";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/action/index";
import avatarDefault from "../../../images/user/avatar.png";
import Avatar from "../../navbar/Avatar";
import ReactPaginate from "react-paginate";
import { useNavigate, useLocation } from "react-router-dom";
import * as services from "../../../services/index";
import toast from "react-hot-toast";

function UserManagement() {
  // const [isBlockUser, setIdBockUser] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [blockedUser, setDeleteUser] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [page, setPage] = useState(queryParams.get("page") || 1);
  const navigate = useNavigate();

  const paginatingUsers = useSelector((state) => state.user.paginatingUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getPaginationUsers(page, 15));
  }, []);

  const handleBlockUser = async (userId) => {
    try {
      if (!userId) return;
      const res = await services.blockUser(userId);
      if (res?.success) {
        dispatch(actions.getPaginationUsers(page, 15));
        toast.success("Khoá người dùng thành công!");
      }
    } catch (error) {
      console.log("ERROR block user : ", error);
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      if (!userId) return;
      const res = await services.unblockUser(+userId);
      if (res?.success) {
        dispatch(actions.getPaginationUsers(page, 15));
        toast.success("Mở khoá người dùng thành công!");
      }
    } catch (error) {
      console.log("ERROR unblock user : ", error);
    }
  };

  const handleConfirmDelete = () => {
    setIsOpenDialog(false);

    if(blockedUser.isBlocked){
      handleUnblockUser(+blockedUser.id);
    }
  
    if(!blockedUser.isBlocked){
      handleBlockUser(+blockedUser.id);
    }
    
  };

  const handleOpenDialog = (user) => {
    setIsOpenDialog(true);
    setDeleteUser(user);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const handlePageChange = (selectedItem) => {
    try {
      const newPage = selectedItem.selected + 1;
      setPage(newPage);
      navigate(`/admin/authorize?page=${newPage}`);
      dispatch(actions.getPaginationUsers(newPage, 15));

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (e) {
      console.log("ERROR : ", e);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Quản lý người dùng" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
        <DialogModal
          isOpen={isOpenDialog}
          handleCloseDialog={handleCloseDialog}
          handleConfirmDelete={handleConfirmDelete}
          content={"Bạn chắc chắn có muốn khoá người dùng này không?"}
        />
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2  sm:grid-cols-7">
            <div className="col-span-2 p-2.5 xl:p-5 ">
              <div className="flex items-center gap-10">
                <h5 className="text-sm font-medium uppercase xsm:text-base text-neutral-500 w-10">
                  STT
                </h5>
                <h5 className="text-sm font-medium uppercase xsm:text-base text-neutral-500 flex-grow">
                  Người dùng
                </h5>
              </div>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base text-neutral-500">
                Người theo dõi
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base text-neutral-500">
                Danh tiếng
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base text-neutral-500">
                Số lượng bài viết
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base text-neutral-500">
                Trạng thái
              </h5>
            </div>

            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base text-neutral-500">
                Thao tác
              </h5>
            </div>
          </div>

          {paginatingUsers?.data?.map((user, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-7 ${
                key === user.length - 1 ? "" : "border-b border-stroke "
              }`}
              key={key}
            >
              <div className="col-span-2 flex gap-10 items-center">
                <div className="p-2.5 xl:p-5 flex justify-start items-center w-10">
                  <p className="text-black">{key + 1}</p>
                </div>
                <div className="flex items-center gap-2 p-2.5 xl:p-5 flex-1">
                  <Avatar
                    imgURL={user.avatar || avatarDefault}
                    height={50}
                    width={50}
                  />
                  <p className="text-black">{user.userName}</p>
                </div>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black ">{user.follower_number}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">0</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black ">{user.post_number}</p>
              </div>

              <div className="border-b flex items-center justify-center border-[#eee] py-5 px-4 dark:border-strokedark">
                <p
                  className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                    !user?.status
                      ? "bg-success text-success"
                      : "bg-danger text-danger"
                  }`}
                >
                  {!user.isBlocked ? "Mở" : "Khóa"}
                </p>
              </div>
              <div className="flex items-center justify-center p-2.5 sm:flex xl:p-5">
                <button
                  type="button"
                  className={`text-white bg-gradient-to-r  hover:bg-gradient-to-br focus:ring-1 focus:outline-none   shadow-sm   font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2
                  ${
                    !user.isBlocked
                      ? " from-red-400 via-red-500 to-red-600 shadow-red-500/50 focus:ring-red-300"
                      : "bg-success"
                  }
                    
                    `}
                  onClick={() => handleOpenDialog(user)}
                >
                  {!user.isBlocked ? "Khóa" : "Mở khóa"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageChange}
          pageRangeDisplayed={5}
          pageCount={paginatingUsers?.data?.meta?.totalPages || 2}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName={"flex justify-center my-5"}
          pageClassName={"mx-1"}
          pageLinkClassName={
            "px-4 py-2 border border-gray-500 rounded-md border-2 h-10 w-10"
          }
          previousClassName={"mx-1"}
          previousLinkClassName={
            "px-4 py-2 border border-gray-500 rounded-md border-2"
          }
          nextClassName={"mx-1"}
          nextLinkClassName={
            "px-4 py-2 border border-gray-500 rounded-md border-2"
          }
          breakClassName={"mx-1"}
          breakLinkClassName={
            "px-4 py-2 border border-gray-500 rounded-md border-2"
          }
          activeClassName={" text-blue-600  font-semibold bg-slate-200"}
          disabledClassName={"text-neutral-500 "}
        />
      </div>
    </>
  );
}

export default UserManagement;
