import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";  
import { Provider } from "react-redux";

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),

  devTools: process.env.NODE_ENV !== 'production',
});

const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
