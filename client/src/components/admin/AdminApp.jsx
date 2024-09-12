import { useEffect, useState, useContext } from "react";
import { Route, Routes, useLocation, Outlet } from "react-router-dom";
import Loader from "./Common/Loader";
import AdminLayOut from "./AdminLayOut";
import PageTitle from "./PageTitle";
import ECommerce from "./Pages/ECommerce";
import { AppContext } from "../../contexts/AppContext";

function AdminApp() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const ctx = useContext(AppContext);

  useEffect(() => {
    ctx.setIsHiddenNavbar(true);
    return () => {
      ctx.setIsHiddenNavbar(false);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <AdminLayOut>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Admin Dashboard | MyApp" />
              <h1>admin dashboard</h1>
              {/* <ECommerce /> */}
            </>
          }
        />
        <Route
          path="/e-commerce"
          element={
            <>
              <PageTitle title="eCommerce Dashboard | MyApp" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="eCommerce Dashboard | MyApp" />
              <h1>tables</h1>
            </>
          }
        />
        <Route
          path="/charts"
          element={
            <>
              <PageTitle title="eCommerce Dashboard | MyApp" />
              <h1>charts</h1>
            </>
          }
        />
          <Route
          path="*"
          element={
            <>
              <PageTitle title="eCommerce Dashboard | MyApp" />
               <ECommerce />
            </>
          }
        />
      </Routes>
      <Outlet />
    </AdminLayOut>
  );
}

export default AdminApp;
