import React from "react";
import { Outlet } from "react-router-dom";
import ProfeilSidebar from "../../component/profeilSidebar";

const Profeil = () => {
  return (
    <>
      <section className="flex m-1 flex-col lg:flex-row ">
        <div className="m-2">
          <ProfeilSidebar />
          </div>
          <div className="px-[60px] py-5 w-full">
          <Outlet />
      </div>
      </section>
    </>
  );
};

export default Profeil;
