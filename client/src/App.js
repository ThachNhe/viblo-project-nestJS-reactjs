import { Provider as StoreProvider } from "react-redux";
import { store, persistor } from "./redux/store";
import AppRoutes from "./routes/AppRoute";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import { PersistGate } from "redux-persist/integration/react";
import { AppContext } from "./contexts/AppContext";
import { requestForToken, listenForMessages } from "./firebaseConfig";
import { useEffect } from "react";

function App() {
  const ctx = useContext(AppContext);
  useEffect(() => {
    const getToken = async () => {
      const token = await requestForToken();
      console.log("FCM Token:", token);
      // Lưu token vào backend hoặc local storage nếu cần
    };

    getToken();
    listenForMessages();
  }, []);
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
