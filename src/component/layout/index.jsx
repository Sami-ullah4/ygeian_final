import React from "react";
import Footer from "../footer";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../navbar";
import { CheckSessionWrapper } from "../../hooks/SessionCheck";

const Layout = () => {
  const location = useLocation();
  const currentUrl = location.pathname;
  const notFooterShow = !currentUrl.startsWith("/user_profile")

  return (
    <>
      <Navbar />
      <CheckSessionWrapper />
      <Outlet />
      {notFooterShow&& <Footer />}
    </>
  );
};

export default Layout;
