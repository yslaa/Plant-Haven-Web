import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  Cell,
} from "recharts";
import { groupBy } from "lodash";
import { useGetProductsQuery } from "@api";
import randomColor from "randomcolor";
import { RingLoader } from "react-spinners";

export default function () {
  const { data, isLoading } = useGetProductsQuery();

  const groupedData = React.useMemo(() => {
    if (!data) return [];
    const grouped = groupBy(data?.details, (value) => value?.user?.name);
    const result = Object.keys(grouped)?.map((name, index) => {
      const userProducts = grouped[name];
      const productNames = userProducts?.map(
        (product) => product?.product_name
      );
      return {
        name,
        products: productNames,
        totalProducts: userProducts?.filter((product) => product?.status !== 1)
          .length,
        color: randomColor({ luminosity: "bright" }),
      };
    });
    return result;
  }, [data]);

  const maxProducts = React.useMemo(() => {
    if (groupedData.length === 0) return 0;
    return Math.max(...groupedData.map((item) => item?.totalProducts));
  }, [groupedData]);

  const renderCustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const products = payload[0]?.payload?.products.join(", ");
      return (
        <div>
          <div>{`User: ${label} has ${payload[0].value} product${
            payload[0].value === 1 ? "" : "s"
          }`}</div>
          <h1>{`Product: ${products}`}</h1>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : !data ? null : (
        <>
          {groupedData.length !== 0 && (
            <BarChart
              width={600}
              height={400}
              data={groupedData}
              margin={{
                top: 20,
                right: 30,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, maxProducts]} />
              <Tooltip content={renderCustomTooltip} />
              <Bar dataKey="totalProducts" fill="#8884d8">
                {groupedData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          )}
        </>
      )}
    </>
  );
}
