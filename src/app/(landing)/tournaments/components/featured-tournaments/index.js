import TournamentCard from "@/app/dashboard/tournaments/tournament-card";
import { getTournaments, getUpcomingTournaments } from "@/db/tournament";
import FirstTournament from "./FirstTournament";

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
      <div className="grid grid-cols-3 gap-6">
        {rest.map((tournament) => (
          <TournamentCard {...tournament} />
        ))}
      </div>
    </div>
  );
}
