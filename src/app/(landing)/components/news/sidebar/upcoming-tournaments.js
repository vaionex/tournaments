"use client";

import TournamentCard from "@/components/tournament/tournament-card";
import useUpcomingTournaments from "@/hooks/tournament/useUpcomingTournaments";
import Loader from "@/components/ui/loader";

export default function UpcomingTournaments() {
  const { data: tournaments = [], isLoading } = useUpcomingTournaments();

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-white">
        Upcoming Tournaments
      </h3>
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader />
        </div>
      ) : (
        <div className="space-y-4">
          {tournaments.slice(0, 3).map((tournament) => (
            <TournamentCard key={tournament.id} {...tournament} />
          ))}
          {tournaments.length === 0 && (
            <p className="text-center text-neutral-500">
              No upcoming tournaments
            </p>
          )}
        </div>
      )}
    </div>
  );
}