"use client";
import Avatar from "@/components/ui/avatar";
import Loader from "@/components/ui/loader";
import useUsers from "@/hooks/admin/useUsers";
import { formatCurrency } from "@/utils/format";
import { getRank } from "@/utils/rank";
import { CheckIcon, Mail } from "lucide-react";

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
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, profile_picture, username, xp, balance }) => (
          <tr>
            <td className="h-16 w-fit text-nowrap">{id}</td>
            <td>
              <div className="flex items-center gap-4">
                <Avatar src={profile_picture} />
                {username}
              </div>
            </td>
            <td>
              <div className="flex items-center gap-2 text-green-500">
                <CheckIcon className="size-4" />
                Active
              </div>
            </td>
            <td>{getRank(xp)}</td>
            <td>{formatCurrency(balance)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
