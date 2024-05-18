import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/userSlice.js";

//saving data in localStorage with redux-persist

// 1 - we will create combine-reducers having all our reducer
const rootreducer = combineReducers({ user: userReducer });

//3 we have to create persistConfig
//name of the key in the local storage
// version
//the store storage
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

//2 - once we have combine-reducer , we'll create persist reducer
const persistedReducer = persistReducer(persistConfig, rootreducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
