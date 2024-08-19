import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Sử dụng local storage
import { thunk } from "redux-thunk";
import rootReducer from "./reducer/rootReducer";

// Cấu hình persist
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store với persistedReducer
const store = createStore(persistedReducer, applyMiddleware(thunk));

// Tạo persistor
const persistor = persistStore(store);

export { store, persistor };
