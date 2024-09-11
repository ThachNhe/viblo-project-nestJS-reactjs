import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
function AdminDashboard() {
  const ctx = useContext(AppContext);
  useEffect(() => {
    ctx.setIsHiddenNavbar(true);
    return () => {
      ctx.setIsHiddenNavbar(false);
    };
  });
  return <div>admin dashboard</div>;
}

export default AdminDashboard;
