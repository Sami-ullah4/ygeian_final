import React from "react";
import { Outlet } from "react-router-dom";
import ProfeilSidebar from "../../component/profeilSidebar";

const Profeil = () => {
  return (
    <>
      <section className="w-[95%] flex m-3 ">
        <div className="">
          <ProfeilSidebar />
        </div>
        <div className="">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default Profeil;
