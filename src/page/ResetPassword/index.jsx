import React, { useState } from "react";
import { useResetPasswordMutation } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";
import { resetPasswordValidation } from "@/validation";

export default function () {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordValidation,
    onSubmit: (values) => {
      const { newPassword, confirmPassword } = values;
      const email = new URLSearchParams(window.location.search).get("email");
      resetPassword({
        newPassword,
        confirmPassword,
        email,
      }).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        };
        if (response?.data?.success === true) {
          window.open(`https://mailtrap.io/inboxes`, "_blank");
          toast.success(`${response?.data?.message}`, toastProps);
        } else {
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
        }
      });
    },
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : (
        <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-md">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
            Reset Password
          </h2>
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="newPassword"
              >
                New Password:
              </label>
              <input
                className={`w-full px-3 py-2 border ${
                  formik.touched.newPassword && formik.errors.newPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:ring focus:border-blue-300`}
                type={showPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                placeholder="Enter new password"
              />
              <input
                type="checkbox"
                id="showPassword"
                onChange={handleClickShowPassword}
                className="mt-2"
              />
              <label
                className="relative top-[.35rem] left-2"
                htmlFor="showPassword"
              >
                Show New Password
              </label>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.newPassword}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password:
              </label>
              <input
                className={`w-full px-3 py-2 border ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:ring focus:border-blue-300`}
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                placeholder="Confirm new password"
              />
              <input
                type="checkbox"
                id="showConfirmPassword"
                onChange={handleClickShowConfirmPassword}
                className="mt-2"
              />
              <label
                className="relative top-[.35rem] left-2"
                htmlFor="showConfirmPassword"
              >
                Show Confirm Password
              </label>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.confirmPassword}
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
