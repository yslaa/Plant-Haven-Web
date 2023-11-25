import React from "react";
import { useAddDeliveriesMutation, useGetProductsQuery } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";
import { createDeliveryValidation } from "@/validation";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";

const formatDate = (date) =>
  moment(date).tz("Asia/Manila").format("YYYY-MM-DD");

export default function () {
  const navigate = useNavigate();
  const [addDelivery, { isLoading }] = useAddDeliveriesMutation();
  const { data: products, isLoading: productsLoading } = useGetProductsQuery();
  moment.tz.setDefault("Asia/Manila");

  const formik = useFormik({
    initialValues: {
      company_name: "",
      date: formatDate(moment()),
      price: "",
      quantity: "",
      product: "",
    },
    validationSchema: createDeliveryValidation,
    onSubmit: async (values) => {
      values.date = formatDate(values.date);

      const response = await addDelivery(values);
      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };

      if (response?.data?.success) {
        navigate("/admin/delivery");
        toast.success(response?.data?.message, toastProps);
      } else {
        toast.error(response?.error?.data?.error?.message, toastProps);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      {isLoading || productsLoading ? (
        <div className="loader">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : (
        <div className="max-w-md w-full p-8 rounded shadow-xl bg-dark-default dark:bg-light-default">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="company_name"
                className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
              >
                Company Name:
              </label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.company_name}
                className={`w-full px-3 py-2 border ${
                  formik.touched.company_name && formik.errors.company_name
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
              />
              {formik.touched.company_name && formik.errors.company_name && (
                <p className="text-red-500 text-xs italic">
                  {formik.errors.company_name}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
              >
                Date:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
                className={`w-full px-3 py-2 border ${
                  formik.touched.date && formik.errors.date
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
              />
              {formik.touched.date && formik.errors.date && (
                <p className="text-red-500 text-xs italic">
                  {formik.errors.date}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
              >
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                min="1"
                max="10000"
                className={`w-full px-3 py-2 border ${
                  formik.touched.price && formik.errors.price
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
              />
              {formik.touched.price && formik.errors.price && (
                <p className="text-red-500 text-xs italic">
                  {formik.errors.price}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
              >
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.quantity}
                min="1"
                max="10000"
                className={`w-full px-3 py-2 border ${
                  formik.touched.quantity && formik.errors.quantity
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
              />
              {formik.touched.quantity && formik.errors.quantity && (
                <p className="text-red-500 text-xs italic">
                  {formik.errors.quantity}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="product"
                className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
              >
                Select Product:
              </label>
              <select
                id="product"
                name="product"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.product}
                className={`w-full px-3 py-2 border ${
                  formik.touched.product && formik.errors.product
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
              >
                <option value="" label="Select a product" />
                {products?.details?.length ? (
                  products?.details?.map((product) => (
                    <option key={product?._id} value={product?._id}>
                      {product?.product_name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading products...</option>
                )}
              </select>
              {formik.touched.product && formik.errors.product && (
                <p className="text-red-500 text-xs italic">
                  {formik.errors.product}
                </p>
              )}
            </div>

            <span className="mt-4 grid grid-flow-col gap-x-4">
              <button
                type="submit"
                disabled={!formik.isValid}
                className={`w-full bg-green-500 text-white font-bold py-2 px-4 rounded ${
                  formik.isValid
                    ? "hover:bg-green-700"
                    : "cursor-not-allowed opacity-50"
                }`}
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                Go Back
              </button>
            </span>
          </form>
        </div>
      )}
    </div>
  );
}
