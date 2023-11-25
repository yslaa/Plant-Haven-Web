import React, { useState } from "react";
import { useLoginMutation } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { loginUserValidation } from "@/validation";

export default function () {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { isLoading }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginUserValidation,
    onSubmit: (values) => {
      loginUser(values).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        };
        if (response?.data?.success === true) {
          toast.success(`${response?.data?.message}`, toastProps);
        } else {
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
        }
      });
    },
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleForgotPassword = () => navigate(`/Forgotpassword`);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : (
        <main className="flex justify-center items-center h-screen">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                className={`appearance-none border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-200"
                } rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Email"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs italic">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                className={`appearance-none border ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-200"
                } rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Password"
              />
              <input
                type="checkbox"
                id="showPassword"
                onChange={handleClickShowPassword}
                className="mt-2"
              />
              <label
                htmlFor="showPassword"
                className="text-sm text-gray-700 ml-2 relative top-1 cursor-pointer"
              >
                Show Password
              </label>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs italic">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  !formik.isValid && "opacity-50 cursor-not-allowed"
                }`}
                type="submit"
                disabled={!formik.isValid}
              >
                Submit
              </button>
              <button
                className="text-red-500 hover:text-gray-700 text-sm focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </main>
      )}
    </>
  );
}
