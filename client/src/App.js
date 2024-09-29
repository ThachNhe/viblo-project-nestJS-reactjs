import { Provider as StoreProvider } from "react-redux";
import { store, persistor } from "./redux/store";
import AppRoutes from "./routes/AppRoute";
import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import { PersistGate } from "redux-persist/integration/react";
import { AppContext } from "./contexts/AppContext";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseConfig } from "./firebaseConfig";

function App() {
  const ctx = useContext(AppContext);
  const fapp = initializeApp(firebaseConfig);
  const messaging = getMessaging(fapp);

  useEffect(() => {
    async function requestPermission() {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        console.log("Notification permission granted.");

        // Get token
        getToken(messaging, {
          vapidKey:
            "BKiCHyKLlf8NtDXuAgcrNjH_zHlPBgz3wYye6fpkdcRVBM9AVHLAUm1I_k4ZO8xwlGWfEcO7iZyFVbd_oBG3ft4",
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log("Firebase Token: ", currentToken);
              // Gửi token lên server hoặc lưu trữ
            } else {
              console.log("No registration token available.");
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token: ", err);
          });
      } else {
        console.log("Notification permission denied.");
      }
    }

    requestPermission();

    // Đăng ký service worker cho thông báo background
    // if ("serviceWorker" in navigator) {
    //   navigator.serviceWorker
    //     .register("/firebase-messaging-sw.js")
    //     .then((registration) => {
    //       console.log(
    //         "Service Worker registered with scope:",
    //         registration.scope
    //       );
    //     })
    //     .catch((error) => {
    //       console.error("Service Worker registration failed:", error);
    //     });
    // }

    // Listen for foreground messages
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      alert(payload.notification.body);
    });
  }, [messaging]);

  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="overflow-y-scroll overflow-x-hidden scrollbar-hidden">
          <Navbar isHomePage={ctx?.isHomePage} />
          <AppRoutes />
          <Toaster position="top-center" />
        </div>
      </PersistGate>
    </StoreProvider>
  );
}

export default App;
