"use client";
import Loader from "@/components/ui/loader";
import usePendingWithdrawRequests from "@/hooks/admin/usePendingWithdrawRequests";
import WithdrawRequestRow from "./Row";

export default function PendingWithdrawRequestsTable() {
  const { data: requests = [], isLoading } = usePendingWithdrawRequests();

  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center pt-36">
        <Loader className="size-10" />
      </div>
    );

  if (requests.length == 0)
    return (
      <div className="flex w-full items-center justify-center pt-36 text-2xl">
        No Pending Withdrawals
      </div>
    );

  return (
    <table className="w-full max-w-2xl text-sm [&_td]:px-6">
      <thead>
        <tr className="bg-white/10">
          <th className="h-11 w-fit pl-6 text-left">User</th>
          <th className="w-full pl-6 text-left">Paypal</th>
          <th className="w-full">Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <WithdrawRequestRow key={request.id} {...request} />
        ))}
      </tbody>
    </table>
  );
}
