import React from "react";
import NotFound from "@assets/not-found.png";

export default function () {
  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <img
          src={NotFound}
          alt="404 Not Found"
          className="mb-8"
          style={{ maxWidth: "300px", width: "100%" }}
        />
        <h1 className="text-4xl font-bold mb-4">Oops! Page Not Found</h1>
        <p className="text-lg text-gray-700 mb-8">
          The page you're looking for might be under construction or does not
          exist.
        </p>
        <button
          onClick={goBack}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
    </>
  );
}
