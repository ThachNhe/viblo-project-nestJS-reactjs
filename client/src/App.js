import { Provider as StoreProvider } from "react-redux";
import { store, persistor } from "./redux/store";
import AppRoutes from "./routes/AppRoute";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import { PersistGate } from "redux-persist/integration/react";
import { AppContext } from "./contexts/AppContext";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseConfig } from "./firebaseConfig";
import * as services from "./services/index";

function App() {
  const ctx = useContext(AppContext);
  const fapp = initializeApp(firebaseConfig);
  const messaging = getMessaging(fapp);

  useEffect(() => {
    async function requestPermission() {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted.");
        try {
          const currentToken = await getToken(messaging, {
            vapidKey:
              "BE5Os3Ulf1vmx_wXRvCSW47s5QMtbiHJbpQ-NpWic2r1k32OZmnk6GIgmx4R3uQM5oOTNFOtWIebFAxsRKs7nyg",
          });
          if (currentToken) {
            const res = await services.saveNotificationToken({
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
