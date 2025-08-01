import React from "react";
import { createBrowserRouter } from "react-router-dom"; 

import About from "../pages/about";
import Layout from "../component/layout";
import Home from "../pages/home";
import ArticlePage from "../pages/articlepage";
import LoginPage from "../pages/login";
import SignupPage from "../pages/singupPage/index";
import ProfileAccount from "../pages/profeilAccount"; 
import UserProfile from "../pages/userProfeil"; 
import Spaceiliest from"../pages/profeilSpecilise"
import OtpSend from "../component/optSend";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> }, 
      { path: "/article/:index", element: <ArticlePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      {path: "/send_otp" , element: <OtpSend/> },
      {
        path: "/user_profile",
        element: <UserProfile />,
        children: [
          { index: true, element: <ProfileAccount /> },
          {index:"/Spaceiliest" , element:<Spaceiliest/>}
        ],
      },
    ],
  },
]);
