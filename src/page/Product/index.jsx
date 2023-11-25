import React from "react";
import { useGetProductsQuery, useDeleteProductMutation } from "@api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { TAGS } from "@/constants";
import { useSelector } from "react-redux";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";
import DataTable from "react-data-table-component";

export default function ProductsList() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetProductsQuery({
    populate: TAGS.USER,
  });
  const auth = useSelector((state) => state.auth);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const isEmployee = auth?.user?.roles?.includes("Employee");
  const isAdmin = auth?.user?.roles?.includes("Admin");

  const deletedProductIds = getDeletedItemIds("product");

  const userProducts = data?.details
    ?.filter((item) => isAdmin || item?.user?._id === auth?.user?._id)
    .filter((item) => !deletedProductIds.includes(item?._id));

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const response = await deleteProduct(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };

      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("product", id);
      } else {
        toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      }
    }
  };

  const deletedProducts = userProducts?.filter(
    (item) => !deletedProductIds.includes(item?._id)
  );

  const columns = [
    { name: "ID", selector: "_id", sortable: true },
    { name: "Product Name", selector: "product_name", sortable: true },
    { name: "Price", selector: "price", sortable: true },
    { name: "Class", selector: "class", sortable: true },
    { name: "Variant", selector: "variant", sortable: true },
    { name: "Type", selector: "type", sortable: true },
    {
      name: "User",
      selector: "user.name",
      sortable: true,
    },
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
            onClick={() =>
              navigate(
                `${isEmployee ? "/employee" : "/admin"}/product/edit/${row._id}`
              )
            }
          >
            Edit
          </button>
          {isEmployee || isAdmin ? (
            <button
              className="text-red-500 hover:underline"
              onClick={() => handleDelete(row._id)}
            >
              Delete
            </button>
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
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => {
          navigate(`${isEmployee ? "/employee" : "/admin"}/product/create`);
        }}
      >
        Create
      </button>
      {isLoading || isDeleting ? (
        <div className="loader mt-8">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : (
        <div className="mt-8">
          {deletedProducts?.length ? (
            <DataTable
              title="Products"
              columns={columns}
              data={deletedProducts}
              pagination
              highlightOnHover
              pointerOnHover
              onRowClicked={(row) => navigate(`${row._id}`)}
            />
          ) : (
            <p>No data available.</p>
          )}
        </div>
      )}
    </div>
  );
}
