import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const auth = useSelector((state) => state?.auth?.isLogin);
  const userInfo = useSelector((state) => state?.auth?.userInfo);

  return auth && userInfo?.data.user.roles === "ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}

export default AdminRoute;
