import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userInfoReducer from "./slices/userInfoSlice";
import { baseApi } from "./api/baseApi";

const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  [baseApi.reducerPath]: baseApi.reducer, 
});

const persistedReducer = persistReducer(
  { key: "root", storage },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
