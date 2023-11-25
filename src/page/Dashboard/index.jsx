import React from "react";
import GetUsers from "./GetUsers";
import ShowTypesOfProduct from "./ShowTypesOfProduct";
import AllUserProduct from "./AllUserProduct";
import MonthlySales from "./MonthlySales";
import TotalProfitPerYear from "./TotalProfitPerYear";

export default function () {
  return (
    <>
      <div className="grid px-10 justify-center items-center h-full dark:bg-dark-default py-10 ">
        <div className="grid justify-center items-center grid-cols-2">
          <AllUserProduct />
          <GetUsers />
        </div>

        <MonthlySales />

        <div className="grid grid-cols-2">
          <ShowTypesOfProduct />
          <TotalProfitPerYear />
        </div>
      </div>
    </>
  );
}
