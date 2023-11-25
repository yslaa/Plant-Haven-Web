import React from "react";
import { useGetCommentsQuery, useDeleteCommentMutation } from "@api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TAGS } from "@/constants";
import DataTable from "react-data-table-component";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCommentsQuery({
    populate: TAGS.TRANSACTION,
  });

  const auth = useSelector((state) => state.auth);
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();
  const isEmployee = auth?.user?.roles?.includes("Employee");
  const isAdmin = auth?.user?.roles?.includes("Admin");

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      const response = await deleteComment(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };

      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
      } else {
        toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      }
    }
  };

  const columns = [
    { name: "ID", selector: "_id", sortable: true },
    { name: "Ratings", selector: "ratings", sortable: true },
    { name: "Text", selector: "text", sortable: true },
    { name: "Status", selector: "transaction.status", sortable: true },
    {
      name: "Images",
      cell: (row) => (
        <div className="flex items-center space-x-4">
          {row.image.map((image) => (
            <img
              key={image.public_id}
              src={image.url}
              alt={image.originalname}
              className="rounded-full h-10 w-10 object-cover"
            />
          ))}
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="mx-4 flex items-center space-x-4">
          {isAdmin ? (
            <>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(row._id)}
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                className="text-gray-500 cursor-not-allowed opacity-50"
                disabled={true}
              >
                Delete
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto my-8 p-8 max-w-screen-xl rounded-lg shadow-2xl">
      {isLoading || isDeleting ? (
        <div className="loader">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : (
        <div className="mt-8">
          {data?.details?.length ? (
            <DataTable
              title="Comments"
              columns={columns}
              data={data.details}
              pagination
              highlightOnHover
              pointerOnHover
              onRowClicked={(row) => {
                if (isEmployee || isAdmin) {
                  navigate(
                    `${isEmployee ? "/employee" : "/admin"}/comment/${row._id}`
                  );
                }
              }}
            />
          ) : (
            <p>No data available.</p>
          )}
        </div>
      )}
    </div>
  );
}
