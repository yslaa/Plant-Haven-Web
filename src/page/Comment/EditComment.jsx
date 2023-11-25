import React, { useEffect } from "react";
import { useUpdateCommentMutation, useGetCommentByIdQuery } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";
import { editCommentValidation } from "@/validation";
import { useNavigate, useParams } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetCommentByIdQuery(id);
  const [updateComment] = useUpdateCommentMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ratings: data?.details?.ratings || 0,
      text: data?.details?.text || "",
      image: data?.details?.image || [],
    },
    validationSchema: editCommentValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("ratings", values?.ratings);
      formData.append("text", values?.text);
      Array.from(values?.image).forEach((file) => {
        formData.append("image", file);
      });
      updateComment({ id: data?.details?._id, payload: formData }).then(
        (response) => {
          const toastProps = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          };
          if (response?.data?.success === true) {
            navigate("/customer/comment");
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
                    htmlFor="text"
                  >
                    Text:
                  </label>
                  <input
                    className={`w-full px-3 py-2 border ${
                      formik.touched.text && formik.errors.text
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type="text"
                    id="text"
                    name="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.text}
                  />
                  {formik.touched.text && formik.errors.text && (
                    <div className="text-red-600">{formik.errors.text}</div>
                  )}
                </div>
                <div>
                  <label
                    className="block text-light-default dark:text-dark-default text-sm font-bold mb-2"
                    htmlFor="ratings"
                  >
                    Ratings:
                  </label>
                  <input
                    className={`w-full px-3 py-2 border ${
                      formik.touched.ratings && formik.errors.ratings
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type="text"
                    id="ratings"
                    name="ratings"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ratings}
                    min="1"
                    max="5"
                  />
                  {formik.touched.ratings && formik.errors.ratings && (
                    <div className="text-red-600">{formik.errors.ratings}</div>
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
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
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
