import React from "react";
import { useGetUserByIdQuery } from "@api";
import { RingLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";

export default function () {
  const { id } = useParams();
  const { data, isLoading } = useGetUserByIdQuery(id);
  const navigate = useNavigate();

  const { _id, name, email, roles, image } = data?.details || {};

  const goBack = () => {
    navigate("/admin/user");
  };

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
            <h1 className="text-3xl font-bold mb-4">{name}</h1>
            <p className="text-sm mb-2">User ID: {_id}</p>
            <p className="text-sm mb-2">Email: {email}</p>
            <p className="text-sm mb-2">Roles: {roles}</p>
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
