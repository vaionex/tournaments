"use client";
import Loader from "@/components/ui/loader";
import useTournaments from "@/hooks/tournament/useTournaments";
import TournamentsTableRow from "./TournamentsTableRow";

export default function TournamentsTable() {
  const { data: tournaments = [], isLoading } = useTournaments({ limit: 1000 });

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
  );
}
