import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useContext } from "react";
function AdminRoute() {
  const auth = useSelector((state) => state?.auth?.isLogin);
  const userInfo = useSelector((state) => state?.auth?.userInfo);

  useEffect(() => {});

  return auth && userInfo?.data.user.roles === "ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to="/homepage" />
  );
}

export default AdminRoute;
