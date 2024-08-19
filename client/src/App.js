import { Provider as StoreProvider } from "react-redux";
import store from "../src/redux/store";
import TestRedux from "./TestRedux";
import MyPage from "./hooks/MyPage";
import { Routes, Route } from "react-router-dom";
import Login from "./hooks/auth/Login";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import ForgetPassword from "./hooks/auth/ForgetPassword";
import Register from "./hooks/auth/Register";
function App() {
  return (
    <StoreProvider store={store}>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/my-page" element={<MyPage />} />
      </Routes>
    </StoreProvider>
  );
}

export default App;
