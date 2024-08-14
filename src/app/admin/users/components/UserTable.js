"use client";
import Loader from "@/components/ui/loader";
import useUsers from "@/hooks/admin/useUsers";
import UserTableRow from "./UserTableRow";
import Pagination from "../../components/Pagination";
import { useState } from "react";

const limit = 15;
export default function UsersTable() {
  const [page, setPage] = useState(1);
  const { data: { users = [], total = 0 } = {}, isLoading } = useUsers({
    limit,
    page,
  });
  const pages = Math.ceil(total / limit);

  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center pt-36">
        <Loader className="size-10" />
      </div>
    );
  return (
    <div>
      <table className="w-full text-sm [&_td]:px-6">
        <thead>
          <tr className="bg-white/10">
            <th className="h-11 w-fit">ID</th>
            <th className="w-full">Name</th>
            <th className="w-full">Status</th>
            <th>Rank</th>
            <th>Balance</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserTableRow {...user} key={user.id} />
          ))}
        </tbody>
      </table>
      <Pagination page={page} total={pages} onChange={setPage} />
    </div>
  );
}
