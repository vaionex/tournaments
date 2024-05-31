"use client";
import Loader from "@/components/ui/loader";
import useUsers from "@/hooks/admin/useUsers";
import UserTableRow from "./UserTableRow";

export default function UsersTable() {
  const { data: users = [], isLoading } = useUsers({ limit: 1000 });

  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center pt-36">
        <Loader className="size-10" />
      </div>
    );
  return (
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
  );
}
