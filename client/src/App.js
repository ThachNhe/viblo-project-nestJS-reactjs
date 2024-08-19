import { Provider as StoreProvider } from "react-redux";
import { store, persistor } from "./redux/store";

// import TestRedux from "./TestRedux";
// import MyPage from "./hooks/MyPage";
import { Toaster } from "react-hot-toast";
import {
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import Login from "./hooks/auth/Login";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import ForgetPassword from "./hooks/auth/ForgetPassword";
import Register from "./hooks/auth/Register";
import { PersistGate } from "redux-persist/integration/react";
function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
        </Routes>
        <Toaster position="top-center" />
      </PersistGate>
    </StoreProvider>
  );
}

export default App;
