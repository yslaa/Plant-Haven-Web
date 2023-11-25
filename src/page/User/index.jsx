import React from "react";
import { useGetUsersQuery, useDeleteUserMutation } from "@api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";
import DataTable from "react-data-table-component";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const auth = useSelector((state) => state.auth);

  const deletedUserIds = getDeletedItemIds("user");

  const filteredUser = data?.details
    ?.filter((user) => user?._id !== auth?.user?._id)
    .filter((item) => !deletedUserIds.includes(item?._id));

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const response = await deleteUser(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };

      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("user", id);
      } else {
        toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      }
    }
  };

  const columns = [
    { name: "ID", selector: "_id", sortable: true },
    { name: "Name", selector: "name", sortable: true },
    { name: "Email", selector: "email", sortable: true },
    { name: "Roles", selector: "roles", sortable: true },
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
    <>
      {isLoading || isDeleting ? (
        <div className="loader">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : (
        <div className="container mx-auto my-8 p-8 max-w-screen-xl rounded-lg shadow-2xl">
          <DataTable
            title="Users"
            columns={columns}
            data={filteredUser}
            pagination
            highlightOnHover
            pointerOnHover
            onRowClicked={(row) => navigate(`${row._id}`)}
          />
        </div>
      )}
    </>
  );
}
