"use client";
import { useState } from "react";
import UserFilterSection from "./components/UserFilterSection";
import UsersTable from "./components/UserTable";
import useUsers from "@/hooks/admin/useUsers";

const limit = 15;
export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const { data: { users = [], total = 0 } = {}, isLoading } = useUsers({
    limit,
    page,
    ...filters,
  });
  const pages = Math.ceil(total / limit);
  return (
    <div className="p-4">
      <h1 className="mb-4 text-4xl font-semibold">Users</h1>
      <div className="flex justify-end p-4">
        <UserFilterSection filters={filters} onChange={setFilters} />
      </div>
      <UsersTable
        loading={isLoading}
        users={users}
        pages={pages}
        page={page}
        onPageChange={setPage}
      />
    </div>
  );
}
