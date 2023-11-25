import React from "react";
import {
  useGetCommentsQuery,
  useGetTransactionsQuery,
  useDeleteCommentMutation,
} from "@api";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TAGS } from "@/constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";
import DataTable from "react-data-table-component";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCommentsQuery({
    populate: TAGS.TRANSACTION,
  });

  const { data: transactionsData, isLoading: transactionIsLoading } =
    useGetTransactionsQuery();

  const auth = useSelector((state) => state.auth);

  const filteredTransactions = transactionsData?.details?.filter(
    (detail) => detail?.user?._id === auth?.user?._id
  );

  const deletedCommentIds = getDeletedItemIds("comment");

  const filteredComments = data?.details
    ?.filter((comment) =>
      filteredTransactions?.some(
        (transaction) => transaction?._id === comment?.transaction?._id
      )
    )
    ?.filter((item) => !deletedCommentIds.includes(item?._id));

  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      const response = await deleteComment(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };

      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("comment", id);
      } else {
        toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      }
    }
  };

  const columns = [
    { name: "ID", selector: "_id", sortable: true },
    { name: "Ratings", selector: "ratings", sortable: true },
    { name: "Text", selector: "text", sortable: true },
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
        <div className="mx-[1px] flex items-center space-x-4">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => navigate(`/customer/comment/edit/${row._id}`)}
          >
            Edit
          </button>
          <button
            className="text-red-500 hover:underline"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto my-8 p-8 max-w-screen-xl rounded-lg shadow-2xl">
      {isLoading || transactionIsLoading || isDeleting ? (
        <div className="loader">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : (
        <div className="mt-8">
          {filteredComments?.length ? (
            <DataTable
              title="Comments"
              columns={columns}
              data={filteredComments}
              pagination
              highlightOnHover
              pointerOnHover
            />
          ) : (
            <p>No data available.</p>
          )}
        </div>
      )}
    </div>
  );
}
