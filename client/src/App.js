import { Provider as StoreProvider } from "react-redux";
import { store, persistor } from "./redux/store";
import AppRoutes from "./routes/AppRoute";
// import TestRedux from "./TestRedux";
// import MyPage from "./hooks/MyPage";
import { Toaster } from "react-hot-toast";

import "./App.css";

import { PersistGate } from "redux-persist/integration/react";
function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes />
        <Toaster position="top-center" />
      </PersistGate>
    </StoreProvider>
  );
}

export default App;
