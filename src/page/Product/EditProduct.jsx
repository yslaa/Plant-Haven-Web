import React from "react";
import { useUpdateProductMutation, useGetProductByIdQuery } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";
import { editProductValidation } from "@/validation";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function () {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id);
  const [updateProduct] = useUpdateProductMutation();
  const auth = useSelector((state) => state.auth);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      product_name: data?.details?.product_name || "",
      type: data?.details?.type || "",
      class: data?.details?.class || "",
      variant: data?.details?.variant || "",
      price: data?.details?.price || "",
      image: data?.details?.image || [],
      user: data?.details?.user?._id || "",
    },
    validationSchema: editProductValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("product_name", values?.product_name);
      formData.append("type", values?.type);
      formData.append("class", values?.class);
      formData.append("variant", values?.variant);
      formData.append("price", values?.price);
      formData.append("user", values?.user);
      Array.from(values?.image).forEach((file) => {
        formData.append("image", file);
      });
      updateProduct({ id: data?.details?._id, payload: formData }).then(
        (response) => {
          const toastProps = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          };
          if (response?.data?.success === true) {
            const userRoles = auth?.user?.roles;
            if (userRoles.includes("Admin")) {
              navigate("/admin/product");
            } else if (userRoles.includes("Employee")) {
              navigate("/employee/product");
            }
            toast.success(`${response?.data?.message}`, toastProps);
          } else {
            toast.error(`${response?.error?.data?.error?.message}`, toastProps);
          }
        }
      );
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      {isLoading ? (
        <div className="loader">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="max-w-md w-full p-8 rounded shadow-xl bg-dark-default dark:bg-light-default">
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <section className="grid justify-center items-center text-center">
                <div>
                  <label
                    className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                    htmlFor="product_name"
                  >
                    Product Name:
                  </label>
                  <input
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.product_name && formik.errors.product_name
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type="text"
                    id="product_name"
                    name="product_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.product_name}
                  />
                  {formik.touched.product_name &&
                    formik.errors.product_name && (
                      <div className="text-red-600">
                        {formik.errors.product_name}
                      </div>
                    )}
                </div>
                <div>
                  <label
                    className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                    htmlFor="type"
                  >
                    Type:
                  </label>
                  <input
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.type && formik.errors.type
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type="text"
                    id="type"
                    name="type"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.type}
                  />
                  {formik.touched.type && formik.errors.type && (
                    <div className="text-red-600">{formik.errors.type}</div>
                  )}
                </div>
                <div>
                  <label
                    className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                    htmlFor="class"
                  >
                    Class:
                  </label>
                  <input
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.class && formik.errors.class
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type="text"
                    id="class"
                    name="class"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.class}
                    min="1"
                    max="10000"
                  />
                  {formik.touched.class && formik.errors.class && (
                    <div className="text-red-600">{formik.errors.class}</div>
                  )}
                </div>

                <div>
                  <label
                    className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                    htmlFor="variant"
                  >
                    Variant:
                  </label>
                  <select
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.variant && formik.errors.variant
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    id="variant"
                    name="variant"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.variant}
                  >
                    <option value="" label="Select a variant" />
                    <option value="Local" label="Local" />
                    <option value="International" label="International" />
                  </select>
                  {formik.touched.variant && formik.errors.variant && (
                    <div className="text-red-600">{formik.errors.variant}</div>
                  )}
                </div>

                <div>
                  <label
                    className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                    htmlFor="price"
                  >
                    Price:
                  </label>
                  <input
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.price && formik.errors.price
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type="number"
                    id="price"
                    name="price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                    min="1"
                    max="10000"
                  />
                  {formik.touched.price && formik.errors.price && (
                    <div className="text-red-600">{formik.errors.price}</div>
                  )}
                </div>

                <div>
                  <label
                    className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                    htmlFor="image"
                  >
                    Upload Image:
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={(event) => {
                      formik.setFieldValue("image", event.currentTarget.files);
                    }}
                    onBlur={formik.handleBlur}
                    multiple
                  />
                  <span className="grid justify-center items-center grid-flow-col gap-x-2">
                    {data?.details?.image?.map((image) => (
                      <span key={image?.public_id}>
                        <img
                          height={60}
                          width={75}
                          src={image?.url}
                          alt={image?.originalname}
                        />
                      </span>
                    ))}
                  </span>
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
              </section>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
