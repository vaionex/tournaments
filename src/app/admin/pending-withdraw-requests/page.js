import PendingWithdrawRequestsTable from "./Table";

export default function PendingWithdrawRequests() {
  return (
    <div className="p-8">
      <h2 className="mb-12 text-2xl font-semibold">Pending Withdrawals</h2>
      <PendingWithdrawRequestsTable />
    </div>
  );
}
