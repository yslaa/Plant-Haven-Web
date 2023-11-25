import React from "react";
import {
  useUpdateDeliveriesMutation,
  useGetDeliveriesByIdQuery,
  useGetProductsQuery,
} from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";
import { editDeliveryValidation } from "@/validation";
import { useNavigate, useParams } from "react-router-dom";
import { STATUS } from "@/constants";
import moment from "moment-timezone";

export default function () {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetDeliveriesByIdQuery(id);
  const { data: products, isLoading: productsLoading } = useGetProductsQuery();
  const [updateDelivery] = useUpdateDeliveriesMutation();

  moment.tz.setDefault("Asia/Manila");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      company_name: data?.details?.company_name || "",
      date: moment(data?.details?.date).format("YYYY-MM-DD") || "",
      price: data?.details?.price || "",
      status: data?.details?.status || "",
      quantity: data?.details?.quantity || "",
      product: data?.details?.product?._id || "",
    },
    validationSchema: editDeliveryValidation,
    onSubmit: async (values) => {
      values.date = moment(values.date).format("YYYY-MM-DD");

      updateDelivery({ id: data?.details?._id, payload: values }).then(
        (response) => {
          const toastProps = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          };
          if (response?.data?.success === true) {
            navigate("/admin/delivery");
            toast.success(`${response?.data?.message}`, toastProps);
          } else {
            toast.error(`${response?.error?.data?.error?.message}`, toastProps);
          }
        }
      );
    },
  });

  return (
    <div className={"min-h-screen flex items-center justify-center"}>
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
                className={`block text-light-default dark:text-dark-default text-sm font-bold mb-2`}
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
                className={`block text-light-default dark:text-dark-default text-sm font-bold mb-2`}
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
                className={`block text-light-default dark:text-dark-default text-sm font-bold mb-2`}
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
                htmlFor="status"
                className={`block text-light-default dark:text-dark-default text-sm font-bold mb-2`}
              >
                Status:
              </label>
              <select
                id="status"
                name="status"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.status}
                className={`w-full px-3 py-2 border ${
                  formik.touched.status && formik.errors.status
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
              >
                {STATUS.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              {formik.touched.status && formik.errors.status && (
                <div className="text-red-600">{formik.errors.status}</div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="quantity"
                className={`block text-light-default dark:text-dark-default text-sm font-bold mb-2`}
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
                className={`block text-light-default dark:text-dark-default text-sm font-bold mb-2`}
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
                {products?.details?.length > 0 ? (
                  products?.details?.map((product) => {
                    return (
                      <option key={product?._id} value={product?._id}>
                        {product?.product_name}
                      </option>
                    );
                  })
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
