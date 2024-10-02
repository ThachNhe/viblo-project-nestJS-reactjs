import { Routes, Route, Navigate } from "react-router-dom";
import ForgetPassword from "../components/auth/ForgetPassword";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import PostDetail from "../components/user/Homepage/PostDetail";
import PublishPost from "../components/user/PublishPost";
import NewestPost from "../components/postNavbar/NewestPost";
import TrendingPost from "../components/postNavbar/TrendingPost";
import MyBookmark from "../components/postNavbar/MyBookmark";
import AdminApp from "../components/admin/AdminApp";
import PostPageLayout from "../components/layouts/PostPageLayout";
import FollowingPost from "../components/user/PostPage/FollowingPost";
import ResetPassword from "../components/auth/ResetPassword";

// import { useEffect } from "react";
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { firebaseConfig } from "../firebaseConfig";
// import * as services from "../services/index";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import * as actions from "../redux/action/index";

function AppRoutes() {
  // const fapp = initializeApp(firebaseConfig);
  // const messaging = getMessaging(fapp);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // console.log(
  //   //   "process.env.REACT_APP_FIREBASE_VAPID_KEY : ",
  //   //   process.env.REACT_APP_FIREBASE_VAPID_KEY
  //   // );
  //   async function requestPermission() {
  //     const permission = await Notification.requestPermission();
  //     if (permission === "granted") {
  //       console.log("Notification permission granted.");
  //       try {
  //         const currentToken = await getToken(messaging, {
  //           vapidKey:
  //             "BE5Os3Ulf1vmx_wXRvCSW47s5QMtbiHJbpQ-NpWic2r1k32OZmnk6GIgmx4R3uQM5oOTNFOtWIebFAxsRKs7nyg",
  //         });
  //         if (currentToken) {
  //           const res = await services.saveNotificationToken({
  //             token: currentToken,
  //           });
  //         } else {
  //           console.log(
  //             "No registration token available. Request permission to generate one."
  //           );
  //         }
  //         console.log("Current token: ", currentToken);
  //       } catch (error) {
  //         console.error("An error occurred while retrieving token: ", error);
  //       }
  //     } else {
  //       console.log("Notification permission denied.");
  //     }
  //   }

  //   // Đăng ký service worker cho thông báo background
  //   if ("serviceWorker" in navigator) {
  //     navigator.serviceWorker
  //       .register("/firebase-messaging-sw.js")
  //       .then((registration) => {
  //         console.log(
  //           "Service Worker registered with scope:",
  //           registration.scope
  //         );
  //       })
  //       .catch((error) => {
  //         console.log(
  //           "An error occurred while registering service worker: ",
  //           error
  //         );
  //       });
  //   }
  //   requestPermission();
  //   // Listen for foreground messages
  //   onMessage(messaging, (payload) => {
  //     console.log("Message received. ", payload);
  //     dispatch(actions.getUsersNotifications());

  //     toast.success(`${payload.data.commenter} ${payload.notification.body}`, {
  //       duration: 5000,
  //     });
  //   });
  // }, [messaging]);
  return (
    <Routes>
      <Route element={<AdminRoute />}>
        <Route path="/admin/*" element={<AdminApp />} />
      </Route>

      <Route path="/p/:slug" element={<PostDetail />} />
      <Route path="/" element={<PostPageLayout />}>
        <Route index path="followings" element={<FollowingPost />} />
        <Route path="newest" element={<NewestPost />} />
      </Route>

      <Route path="/trending" element={<TrendingPost />} />
      <Route path="/clip/posts" element={<MyBookmark />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route exact path="/publish/post" element={<PrivateRoute />}>
        <Route path="/publish/post" element={<PublishPost />} />
      </Route>
      <Route path="/newest" element={<NewestPost />} />
      <Route path="*" element={<Navigate to="/followings" />} />
    </Routes>
  );
}

export default AppRoutes;
