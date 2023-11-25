import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useGetTransactionsQuery } from "@api";
import { RingLoader } from "react-spinners";

export default function () {
  const { data, isLoading } = useGetTransactionsQuery();

  const transactionsWithTotalSales =
    data?.details
      ?.map((transaction) => {
        if (
          transaction.status !== "Pending" &&
          transaction.status !== "Cancelled" &&
          transaction.product
        ) {
          const totalSales = transaction?.product?.reduce((acc, product) => {
            return acc + product?.price;
          }, 0);
          return { ...transaction, totalSales };
        }
        return null;
      })
      .filter(Boolean) || [];

  const groupedData = transactionsWithTotalSales?.reduce((acc, transaction) => {
    const year = new Date(transaction.date).getFullYear();
    const sales = transaction.totalSales || 0;

    acc[year] = (acc[year] || 0) + sales;
    return acc;
  }, {});

  const chartData = Object.entries(groupedData)?.map(([year, sales]) => ({
    year,
    sales,
  }));

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : !data ? null : (
        <>
          {groupedData.length !== 0 && (
            <LineChart
              width={600}
              height={400}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [value + " PHP", "Total Sales"]}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ strokeWidth: 0 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          )}
        </>
      )}
    </>
  );
}
