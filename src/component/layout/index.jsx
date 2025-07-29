import React from "react";
import Footer from "../footer";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar";
import {CheckSessionWrapper} from "../../hooks/SessionCheck"

const Layout = () => {
  return (
    <>
      <Navbar />
      <CheckSessionWrapper/>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
