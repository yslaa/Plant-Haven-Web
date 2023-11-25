import React from "react";
import plantImage from "@assets/plant.jpg";

export default function () {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Welcome, Plant Enthusiast!</h1>
        <p className="text-lg mb-8">
          Explore our plant collection and enjoy your time with nature.
        </p>
        <div className="mb-8">
          <img
            src={plantImage}
            alt="Plant Image"
            className="rounded-lg shadow-lg"
            style={{ maxWidth: "400px", width: "100%" }}
          />
        </div>
        <p className="text-lg mb-8">
          Discover the beauty of our plants and enhance your surroundings.
        </p>
        <p className="text-lg mb-8">Happy gardening!</p>
      </div>
      );
    </>
  );
}
