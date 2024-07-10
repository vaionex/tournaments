"use client";
import Loader from "@/components/ui/loader";
import TournamentsTableRow from "./TournamentsTableRow";
import usePendingTournaments from "@/hooks/tournament/usePendingTournaments";

export default function TournamentsTable() {
  const { data: tournaments = [], isLoading } = usePendingTournaments();

  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center pt-36">
        <Loader className="size-10" />
      </div>
    );

  if (tournaments.length == 0)
    return (
      <div className="flex w-full items-center justify-center pt-36 text-2xl">
        No Pending Tournaments
      </div>
    );

  return (
    <table className="w-full text-sm [&_td]:px-6">
      <thead>
        <tr className="bg-white/10">
          <th className="h-11 w-fit">ID</th>
          <th className="w-full">Name</th>
          <th className="w-full">Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tournaments.map((tournament) => (
          <TournamentsTableRow {...tournament} key={tournament.id} />
        ))}
      </tbody>
    </table>
  );
}
