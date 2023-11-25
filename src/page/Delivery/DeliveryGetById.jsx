import React from "react";
import { useGetDeliveriesByIdQuery } from "@api";
import { RingLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import { TAGS } from "@/constants";
import moment from "moment";

export default function () {
  const { id } = useParams();
  const { data, isLoading } = useGetDeliveriesByIdQuery(id, {
    populate: TAGS.PRODUCT,
  });
  const navigate = useNavigate();

  const { _id, company_name, date, price, status, quantity, product } =
    data?.details || {};

  const formattedDate = date ? moment(date).format("YYYY-MM-DD") : "";

  const goBack = () => {
    navigate("/admin/delivery");
  };

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : (
        <main className="flex items-center justify-center h-screen">
          <div
            key={_id}
            className="bg-dark-default text-light-default dark:bg-light-default dark:text-dark-default p-6 rounded-md shadow-md w-96"
          >
            <h1 className="text-3xl font-bold mb-4">{company_name}</h1>
            <p className="text-sm mb-2">Delivery ID: {_id}</p>
            <p className="text-sm mb-2">Date: {formattedDate}</p>
            <p className="text-sm mb-2">Price: ₱{price}</p>
            <p className="text-sm mb-2">Status: {status}</p>
            <p className="text-sm mb-2">Quantity: {quantity}</p>
            <p className="text-sm mb-2">Product: {product?.product_name}</p>
            <div className="mt-4">
              <button
                onClick={goBack}
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-blue-700"
              >
                Go Back
              </button>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
