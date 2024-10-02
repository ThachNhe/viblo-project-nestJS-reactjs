"use client";
import React, { useEffect, useContext , useState} from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import MainMenu from "./MainMenu";
import Auth from "./Auth";
import { useSelector } from "react-redux";
import WriteMenu from "./WriteMenu";
import DropdownCommonNotification from "./DropdownCommonNotification";
import DropdownPersonalNotification from "./DropdownPersonalNotification";
import { AppContext } from "../../contexts/AppContext";
import * as actions from "../../redux/action/index";
import { useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseConfig } from "../../firebaseConfig";
import * as services from "../../services/index";
import toast from "react-hot-toast";

const Navbar = ({ isHomePage }) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state?.auth?.isLogin);
  const usersNotifications = useSelector(
    (state) => state.notification.userNotifications
  );
  const [unReadNumber, setUnReadNumber] = useState(0);
  const ctx = useContext(AppContext);

  const fapp = initializeApp(firebaseConfig);
  const messaging = getMessaging(fapp);

  useEffect(() => {
    dispatch(actions.getUsersNotifications());
  }, []);

  useEffect(() => {
    const unRead = usersNotifications?.data?.filter((noti) => !noti.isRead).length;
  
    setUnReadNumber(unRead);
  }, [usersNotifications]);

  const handlerMarkAsRead = async (notificationId) => {
    try {
      const res = await services.markAsRead(notificationId);
      res?.success && dispatch(actions.getUsersNotifications());
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    async function requestPermission() {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted.");
        try {
          const currentToken = await getToken(messaging, {
            vapidKey:
             process.env.REACT_APP_FIREBASE_API_KEY,
          });
          if (currentToken) {
           await services.saveNotificationToken({
              token: currentToken,
            });
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
          console.log("Current token: ", currentToken);
        } catch (error) {
          console.error("An error occurred while retrieving token: ", error);
        }
      } else {
        console.log("Notification permission denied.");
      }
    }

    // Đăng ký service worker cho thông báo background
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.log(
            "An error occurred while registering service worker: ",
            error
          );
        });
    }
    requestPermission();
    // Listen for foreground messages
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      dispatch(actions.getUsersNotifications());

      toast.success(`${payload.data.commenter} ${payload.notification.body}`, {
        duration: 5000,
      });
    });
  }, [messaging]);

  return (
    <div
      className={` sticky w-full bg-neutral-50 z-10 top-0 h-[60px] 
      ${ctx.isHiddenNavbar ? "hidden" : " "} 
    `}
    >
      <div className="py-1 shadow-lg ">
        <Container isHomePage={isHomePage}>
          <div
            className="
                    flex
                    flex-row
                    items-center
                    justify-between
                    gap-3
                    md:gap-0
                   "
          >
            <div className="flex flex-row gap-10 ">
              <Logo />
              <MainMenu />
            </div>
            <div className="flex flex-row gap-2 items-center">
              {isHomePage && <Search />}

              <DropdownCommonNotification />
              <DropdownPersonalNotification data={usersNotifications?.data} 
              handlerMarkAsRead = {handlerMarkAsRead}
              unReadNumber={unReadNumber}
              />
              <WriteMenu />
              <Auth isLogin={isLogin} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
