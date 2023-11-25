import React from "react";
import { useGetTransactionsQuery, useGetCommentsQuery } from "@api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const { data: transactions, isLoading: transactionsLoading } =
    useGetTransactionsQuery({
      populate: ["user", "product"],
    });

  const auth = useSelector((state) => state.auth);

  const userTransactions = transactions?.details?.filter(
    (item) => item.user?._id === auth?.user?._id
  );

  const isTransactionCompleted = (transaction) =>
    transaction?.status === "Completed";

  const totalPrices = userTransactions?.map((item) =>
    item.product.reduce((acc, product) => acc + product.price, 0)
  );

  const toastProps = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
  };

  const { data: comments, isLoading: commentsLoading } = useGetCommentsQuery();

  const columns = [
    { name: "Transaction ID", selector: "_id", sortable: true },
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
      cell: (row) => totalPrices[userTransactions.indexOf(row)],
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          {comments?.details?.some(
            (comment) => comment?.transaction?._id === row?._id
          ) ? (
            <p className="text-red-600">This transaction already has a comment.</p>
          ) : (
            <button
            className="text-green-500 hover:underline"
              onClick={() =>
                isTransactionCompleted(row)
                  ? navigate("/customer/comment/create", {
                      state: { transactionId: row?._id },
                    })
                  : toast.error(
                      "Transaction is pending. Cannot add a comment.",
                      toastProps
                    )
              }
            >
              Add Comment
            </button>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto my-8 p-8 max-w-screen-xl rounded-lg shadow-2xl">
      {transactionsLoading || commentsLoading ? (
        <div className="loader">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : (
        <div className="mt-8">
          {userTransactions?.length ? (
            <DataTable
              title="User Transactions"
              columns={columns}
              data={userTransactions}
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
