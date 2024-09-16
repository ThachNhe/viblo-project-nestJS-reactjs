import { useEffect, useState, useContext } from "react";
import { Route, Routes, useLocation, Outlet } from "react-router-dom";
import Loader from "./Common/Loader";
import AdminLayOut from "./AdminLayOut";
import PageTitle from "./PageTitle";
import PostStatistic from "./Pages/PostStatistic";
import { AppContext } from "../../contexts/AppContext";
import TagManagement from "./Pages/TagManagement";
import UserManagement from "./Management/UserManagement";
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
            </>
          }
        />
        <Route
          path="/statistics"
          element={
            <>
              <PageTitle title="Viblo Management | MyApp" />
              <PostStatistic />
            </>
          }
        />
        <Route
          path="/tags"
          element={
            <>
              <PageTitle title="Viblo Management | MyApp" />
              <TagManagement />
            </>
          }
        />
        <Route
          path="/authorize"
          element={
            <>
              <PageTitle title="Viblo Management | MyApp" />
              <UserManagement />
            </>
          }
        />
        <Route
          path="/questions"
          element={
            <>
              <PageTitle title="Viblo Management | MyApp" />
              <div>questions</div>
            </>
          }
        />
        <Route
          path="/charts"
          element={
            <>
              <PageTitle title="Viblo Management | MyApp" />
              <div className="flex flex-col rounded-2xl w-[600px] bg-[#ffffff] shadow-xl">
                <div className="flex flex-col p-8">
                  <div className="text-lg font-bold   text-[#05070b] pb-6">
                    Generator
                  </div>
                  <div className=" text-xl   text-[#374151]">
                    Leverage a graphical editor to create beautiful web
                    components.
                  </div>
                </div>
              </div>
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <PageTitle title="Viblo Management | MyApp" />
              <PostStatistic />
            </>
          }
        />
      </Routes>
      <Outlet />
    </AdminLayOut>
  );
}

export default AdminApp;
