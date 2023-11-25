import React from "react";
import { useGetCommentByIdQuery } from "@api";
import { RingLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import { TAGS } from "@/constants";
import { useSelector } from "react-redux";

export default function () {
  const { id } = useParams();
  const { data, isLoading } = useGetCommentByIdQuery(id, {
    populate: TAGS.TRANSACTION,
  });
  const navigate = useNavigate();

  const { _id, ratings, text, image, transaction } = data?.details || {};

  const auth = useSelector((state) => state.auth);
  const isEmployee = auth?.user?.roles?.includes("Employee");

  const goBack = () =>
    navigate(isEmployee ? "/employee/commentAll" : "/admin/commentAll");

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
            <h1 className="text-3xl font-bold mb-4">{ratings}</h1>
            <p className="text-sm mb-2">Comment ID: {_id}</p>
            <p className="text-sm mb-2">Text: {text}</p>
            <p className="text-sm mb-2">Transaction: {transaction?.status}</p>
            {image?.map((image) => (
              <img
                width={75}
                height={60}
                src={image?.url}
                alt={image?.originalname}
                key={image?.public_id}
              />
            ))}
            <button
              type="button"
              onClick={goBack}
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Go Back
            </button>
          </div>
        </main>
      )}
    </>
  );
}
