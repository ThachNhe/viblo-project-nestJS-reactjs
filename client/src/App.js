import { Provider as StoreProvider } from "react-redux";
import { store, persistor } from "./redux/store";
import AppRoutes from "./routes/AppRoute";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import { PersistGate } from "redux-persist/integration/react";
import { AppContext } from "./contexts/AppContext";

function App() {
  const ctx = useContext(AppContext);
  console.log("ctx : ", ctx);
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navbar isHomePage={ctx?.isHomePage} />
        <AppRoutes />
        <Toaster position="top-center" />
      </PersistGate>
    </StoreProvider>
  );
}

export default App;
