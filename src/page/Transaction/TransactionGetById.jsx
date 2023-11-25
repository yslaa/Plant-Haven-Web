import React from "react";
import { useGetTransactionByIdQuery } from "@api";
import { RingLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import { TAGS } from "@/constants";
import { useSelector } from "react-redux";
import moment from "moment";

export default function () {
  const { id } = useParams();
  const { data, isLoading } = useGetTransactionByIdQuery(id, {
    populate: [TAGS.USER, TAGS.PRODUCT],
  });
  const navigate = useNavigate();

  const { _id, product, status, date, user } = data?.details || {};

  const totalPrices = product
    ? product.reduce((acc, item) => acc + item.price, 0)
    : 0;

  const formattedDate = date ? moment(date).format("YYYY-MM-DD") : "";

  const auth = useSelector((state) => state.auth);
  const isEmployee = auth?.user?.roles?.includes("Employee");

  const goBack = () =>
    navigate(isEmployee ? "/employee/transactionAll" : "/admin/transactionAll");

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
            <h1 className="text-3xl font-bold mb-4">{user?.name}</h1>
            <p className="text-sm mb-2">Transaction ID: {_id}</p>
            <div className="mb-4">
              {product?.map((item) => (
                <div key={item?._id} className="mb-2">
                  <h1 className="text-lg font-semibold">
                    Product: {item?.product_name}
                  </h1>
                  <p className="text-sm">Price: ₱{item?.price}</p>
                  {item?.image?.map((image) => (
                    <img
                      key={image?.public_id}
                      src={image?.url}
                      alt={image?.originalname}
                      className="w-16 h-12 object-cover rounded-md mr-2"
                    />
                  ))}
                </div>
              ))}
            </div>
            <h1>Status: {status}</h1>
            <h1>Date: {formattedDate}</h1>
            <h1>Total Price: ₱{totalPrices}</h1>

            <button
              onClick={goBack}
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-blue-700 mt-4"
            >
              Go Back
            </button>
          </div>
        </main>
      )}
    </>
  );
}
