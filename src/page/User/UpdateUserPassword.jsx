import React, { useState } from "react";
import { useUpdatePasswordMutation } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";
import { updatePasswordValidation } from "@/validation";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const auth = useSelector((state) => state.auth);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: updatePasswordValidation,
    onSubmit: (values) => {
      const { oldPassword, newPassword, confirmPassword } = values;
      updatePassword({
        id: auth?.user?._id,
        oldPassword,
        newPassword,
        confirmPassword,
      }).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        };
        if (response?.data?.success === true) {
          const userRoles = response?.data?.details?.roles;
          if (userRoles.includes("Admin")) {
            navigate("/admin");
          } else if (userRoles.includes("Employee")) {
            navigate("/employee");
          } else if (userRoles.includes("Customer")) {
            navigate("/customer");
          }
          toast.success(`${response?.data?.message}`, toastProps);
        } else {
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
        }
      });
    },
  });

  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);

  const handleClickShowOldPassword = () => setShowOldPassword(!showOldPassword);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : (
        <div className="max-w-md w-full mb-2 p-8 bg-white shadow-lg rounded-md">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
            Update Password
          </h2>
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="oldPassword"
              >
                Old Password:
              </label>
              <input
                className={`w-full mb-2 px-3 py-2 border ${
                  formik.touched.oldPassword && formik.errors.oldPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:ring focus:border-blue-300`}
                type={showOldPassword ? "text" : "password"}
                id="oldPassword"
                name="oldPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.oldPassword}
                placeholder="Enter your old password"
              />
              <input
                type="checkbox"
                id="showOldPassword"
                onChange={handleClickShowOldPassword}
              />
              <label
                className="relative top-[.1rem] left-2"
                htmlFor="showOldPassword"
              >
                Show Old Password
              </label>
              {formik.touched.oldPassword && formik.errors.oldPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.oldPassword}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="newPassword"
              >
                New Password:
              </label>
              <input
                className={`w-full mb-2 px-3 py-2 border ${
                  formik.touched.newPassword && formik.errors.newPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:ring focus:border-blue-300`}
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                placeholder="Enter your new password"
              />
              <input
                type="checkbox"
                id="showNewPassword"
                onChange={handleClickShowNewPassword}
              />
              <label
                className="relative top-[.1rem] left-2"
                htmlFor="showNewPassword"
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
                className={`w-full mb-2 px-3 py-2 border ${
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
                placeholder="Confirm your new password"
              />
              <input
                type="checkbox"
                id="showConfirmPassword"
                onChange={handleClickShowConfirmPassword}
              />
              <label
                className="relative top-[.1rem] left-2"
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
              className={`w-full mb-2 bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none ${
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
