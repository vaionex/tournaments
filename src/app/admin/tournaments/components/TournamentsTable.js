"use client";
import Loader from "@/components/ui/loader";
import TournamentsTableRow from "./TournamentsTableRow";
import Pagination from "../../components/Pagination";

export default function TournamentsTable({
  loading,
  tournaments,
  pages,
  page,
  onPageChange,
}) {
  if (loading)
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
            <th className="w-full min-w-24">Prize Pool</th>
            <th className="w-full">Participants</th>
            <th className="w-full">Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((user) => (
            <TournamentsTableRow {...user} key={user.id} />
          ))}
        </tbody>
      </table>
      <div className="p-4">
        <Pagination page={page} total={pages} onChange={onPageChange} />
      </div>
    </div>
  );
}
