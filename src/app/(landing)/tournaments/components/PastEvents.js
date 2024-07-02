import TournamentGrid from "@/components/tournament/tournament-grid";
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
      <TournamentGrid tournaments={tournaments} />
    </div>
  );
}
