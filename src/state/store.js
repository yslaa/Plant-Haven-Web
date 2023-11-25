import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/reducer";
import { setupListeners } from "@reduxjs/toolkit/query";
import { rootReducer } from "./reducer";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { persistConfig } from "./persistor";
import { API_URL } from "@/env";

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: API_URL !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
