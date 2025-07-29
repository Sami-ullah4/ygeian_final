import React from "react";
import "./app.css";
import { RouterProvider } from "react-router-dom";
import { Routes } from "./routes/routes";
import ReduxProvider from "./store/provider";

const App = () => {
  return (
    <>
      <ReduxProvider>
        <RouterProvider router={Routes} />
      </ReduxProvider>
    </>
  );
};

export default App;
