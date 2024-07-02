import { getUpcomingTournaments } from "@/db/tournament";
import FirstTournament from "./FirstTournament";
import TournamentGrid from "@/components/tournament/tournament-grid";

// Revalidate every 24 hours
export const revalidate = 60 * 60 * 24;

export default async function FeaturedTournaments({ gameId }) {
  const allTournaments = await getUpcomingTournaments();
  const tournaments = allTournaments.filter(
    ({ Game: { id } }) => gameId == undefined || gameId == id,
  );
  if (tournaments.length == 0)
    return (
      <div className="mb-24 text-center text-4xl text-neutral-300">
        No tournaments found
      </div>
    );
  const firstTournament = tournaments[0];
  const rest = tournaments.slice(1);

  return (
    <div className="mb-24">
      <FirstTournament {...firstTournament} />
      <TournamentGrid tournaments={rest} />
    </div>
  );
}
