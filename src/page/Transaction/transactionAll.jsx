import React from "react";
import { useGetTransactionsQuery, useDeleteTransactionMutation } from "@api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { TAGS } from "@/constants";
import { useSelector } from "react-redux";
import moment from "moment";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";
import DataTable from "react-data-table-component";

export default function () {
  const navigate = useNavigate();
  const { data, isLoading } = useGetTransactionsQuery({
    populate: [TAGS.USER, TAGS.PRODUCT],
  });

  const auth = useSelector((state) => state.auth);
  const [deleteTransaction, { isLoading: isDeleting }] =
    useDeleteTransactionMutation();
  const isEmployee = auth?.user?.roles?.includes("Employee");
  const isAdmin = auth?.user?.roles?.includes("Admin");

  const totalPrices = data?.details?.map((item) =>
    item.product.reduce((acc, product) => acc + product.price, 0)
  );

  const deletedTransactionIds = getDeletedItemIds("transaction");

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      const response = await deleteTransaction(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };

      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("transaction", id);
      } else {
        toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      }
    }
  };

  const filteredTransactions = data?.details?.filter(
    (item) => !deletedTransactionIds.includes(item?._id)
  );

  const columns = [
    { name: "ID", selector: "_id", sortable: true },
    { name: "User Name", selector: "user.name", sortable: true },
    {
      name: "Product",
      selector: "product",
      sortable: true,
      cell: (row) => (
        <div>
          {row.product.map((product) => (
            <div key={product?._id}>
              <h1>{product?.product_name}</h1>
              <h1>{product?.price}</h1>
              {product?.image?.map((image) => (
                <img
                  width={75}
                  height={60}
                  src={image?.url}
                  alt={image?.originalname}
                  key={image?.public_id}
                />
              ))}
            </div>
          ))}
        </div>
      ),
    },
    { name: "Status", selector: "status", sortable: true },
    {
      name: "Date",
      selector: "date",
      sortable: true,
      format: (row) => moment(row.date).format("YYYY-MM-DD"),
    },
    {
      name: "Total Price",
      selector: "totalPrice",
      sortable: true,
      cell: (row) => totalPrices[data.details.indexOf(row)],
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center space-x-4">
          <button
            className="text-blue-500 hover:underline"
            onClick={() =>
              navigate(
                `${isEmployee ? "/employee" : "/admin"}/transaction/edit/${
                  row._id
                }`
              )
            }
          >
            Edit
          </button>
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
          {filteredTransactions?.length ? (
            <DataTable
              title="Transactions"
              columns={columns}
              data={filteredTransactions}
              pagination
              highlightOnHover
              pointerOnHover
              onRowClicked={(row) =>
                navigate(
                  `${isEmployee ? "/employee" : "/admin"}/transaction/${
                    row._id
                  }`
                )
              }
            />
          ) : (
            <p>No data available.</p>
          )}
        </div>
      )}
    </div>
  );
}
