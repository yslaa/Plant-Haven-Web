import React from "react";
import { EmployeeNavbar, Footer } from "@components";
import { Outlet } from "react-router-dom";
import { block } from "million/react";

const EmployeeLayout = () => {
  return (
    <main>
      <span className="z-[1000] top-0 bg-light-default text-dark-default dark:bg-dark-default dark:text-light-default">
        <EmployeeNavbar />
      </span>
      <div>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

const EmployeeLayoutBlock = block(EmployeeLayout);

export default EmployeeLayoutBlock;