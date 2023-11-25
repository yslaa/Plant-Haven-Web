import React from "react";
import plantImage from "@assets/plant.jpg";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();

  const Login = () => navigate("/login");

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src={plantImage}
        alt="Plant Welcome Image"
        className="mb-8 w-32 h-32 object-cover rounded-full"
      />
      <h1 className="text-4xl font-bold mb-4">Welcome to Plant Paradise</h1>
      <p className="text-lg mb-8">
        Explore our collection of beautiful plants and create your green oasis!
      </p>
      <button onClick={Login} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
        Get Started
      </button>
    </div>
  );
}
