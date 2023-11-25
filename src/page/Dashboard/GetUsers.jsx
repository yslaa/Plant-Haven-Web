import React from "react";
import { ListData } from "@/components";
import { useGetUsersQuery } from "@api";
import { RingLoader } from "react-spinners";

export default function () {
  const { data, isLoading, isError } = useGetUsersQuery();
  const users = data?.details ?? [];
  const usersCount = users.length;
  const admins = users?.filter((user) => user?.roles?.includes("Admin"));
  const adminCount = admins.length;
  const employees = users?.filter((user) => user?.roles?.includes("Employee"));
  const employeeCount = employees.length;
  const customers = users?.filter((user) => user?.roles?.includes("Customer"));
  const customerCount = customers.length;

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : !data ? null : (
        <>
          <div className="grid grid-flow-row gap-x-4">
            <ListData
              title="Users"
              data={usersCount}
              icon="👨‍👩‍👧‍👦"
              id={data?.details?._id}
            />
            <ListData
              title="Admin"
              data={adminCount}
              icon="👨‍💻"
              id={data?.details?._id}
            />
            <ListData
              title="Employee"
              data={employeeCount}
              icon="👨‍💼"
              id={data?.details?._id}
            />
            <ListData
              title="Customer"
              data={customerCount}
              icon="👨‍🔧"
              id={data?.details?._id}
            />
          </div>
        </>
      )}
    </>
  );
}
