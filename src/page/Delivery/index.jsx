import React from "react";
import { useGetDeliveriesQuery, useDeleteDeliveriesMutation } from "@api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { TAGS } from "@/constants";
import moment from "moment";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";
import DataTable from "react-data-table-component";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading } = useGetDeliveriesQuery({
    populate: TAGS.PRODUCT,
  });

  const deletedDeliveryIds = getDeletedItemIds("delivery");

  const [deleteDeliveries, { isLoading: isDeleting }] =
    useDeleteDeliveriesMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this delivery?")) {
      const response = await deleteDeliveries(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };

      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("delivery", id);
      } else {
        toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      }
    }
  };

  const deletedDeliveries = data?.details?.filter(
    (item) => !deletedDeliveryIds.includes(item?._id)
  );

  const columns = [
    { name: "ID", selector: "_id", sortable: true },
    { name: "Company Name", selector: "company_name", sortable: true },
    {
      name: "Date",
      selector: "date",
      sortable: true,
      format: (row) => moment(row.date).format("YYYY-MM-DD"),
    },
    { name: "Price", selector: "price", sortable: true },
    { name: "Status", selector: "status", sortable: true },
    { name: "Quantity", selector: "quantity", sortable: true },
    { name: "Product Name", selector: "product.product_name", sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center space-x-4">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => navigate(`edit/${row._id}`)}
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
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => {
          navigate("/admin/delivery/create");
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
          {deletedDeliveries?.length ? (
            <DataTable
              title="Deliveries"
              columns={columns}
              data={deletedDeliveries}
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
