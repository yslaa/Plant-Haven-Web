import React from "react";
import { useForgotPasswordMutation } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";
import { forgotPasswordValidation } from "@/validation";

export default function () {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordValidation,
    onSubmit: (values) => {
      forgotPassword(values?.email).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        };
        if (response?.data?.success) {
          window.open(`https://mailtrap.io/inboxes`, "_blank");
          toast.success(`${response?.data?.message}`, toastProps);
        } else {
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
        }
      });
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : (
        <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-md">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
            Forgot Password
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                className={`w-full px-3 py-2 border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:ring focus:border-blue-300`}
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Enter your email"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <button
              className={`w-full bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none ${
                !formik.isValid && "opacity-50 cursor-not-allowed"
              }`}
              type="submit"
              disabled={!formik.isValid}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
