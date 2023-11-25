import React from "react";
import { useGetProductByIdQuery } from "@api";
import { RingLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import { TAGS } from "@/constants";
import { useSelector } from "react-redux";

export default function () {
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id, {
    populate: TAGS.USER,
  });
  const navigate = useNavigate();

  const { _id, product_name, type, variant, price, image, user } =
    data?.details || {};

  const productClass = data?.details?.class;

  const auth = useSelector((state) => state.auth);
  const isEmployee = auth?.user?.roles?.includes("Employee");

  const goBack = () =>
    navigate(isEmployee ? "/employee/product" : "/admin/product");

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : (
        <main className="grid grid-flow-col gap-x-10 justify-center items-center h-screen">
          <div
            key={_id}
            className="bg-dark-default text-light-default dark:bg-light-default dark:text-dark-default p-6 rounded-md shadow-md w-96"
          >
            <h1 className="text-3xl font-bold mb-4">{product_name}</h1>
            <p className="text-sm mb-2">Product ID: {_id}</p>
            <p className="text-sm mb-2">Type: {type}</p>
            <p className="text-sm mb-2">Class: {productClass}</p>
            <p className="text-sm mb-2">Variant: {variant}</p>
            <p className="text-sm mb-2">Price: {price}</p>
            <p className="text-sm mb-2">User: {user?.name}</p>
            {image?.map((image) => (
              <img
                key={image?.public_id}
                src={image?.url}
                alt={image?.originalname}
                className="w-16 h-12 object-cover rounded-md mr-2"
              />
            ))}
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
