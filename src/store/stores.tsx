import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { persistReducer } from 'redux-persist';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
export const store = configureStore({
  reducer: {
    authReducer: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
