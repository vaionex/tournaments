import TournamentCard from "@/app/dashboard/tournaments/tournament-card";
import { getPastTournaments } from "@/db/tournament";

export default async function PastEvents() {
  const tournaments = await getPastTournaments();
  if (tournaments.length == 0) return null;
  return (
    <div className="mb-24">
      <div className="mb-12">
        <h2 className="mb-2 text-3xl font-bold">Past events</h2>
        <div className="text-lg text-neutral-300">
          Dive into completed tournaments and discover the battles.
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
          <TournamentCard {...tournament} />
        ))}
      </div>
    </div>
  );
}
