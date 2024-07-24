import FeaturedTournaments from "@/app/(landing)/components/featured-tournaments";
import FirstTournament from "@/app/(landing)/tournaments/components/featured-tournaments/FirstTournament";
import Filters from "@/app/(landing)/tournaments/components/filters";
import PastEvents from "@/app/(landing)/tournaments/components/PastEvents";
import TournamentGrid from "@/components/tournament/tournament-grid";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { getUpcomingTournaments } from "@/db/tournament";

export default async function Tournaments({ searchParams: { game: gameId } }) {
  const allTournaments = await getUpcomingTournaments();
  const filteredTournaments = allTournaments.filter(
    (tournament) => tournament.Game.id === gameId || !gameId,
  );
  const firstTournament = filteredTournaments[0];
  const tournaments = filteredTournaments.slice(1);
  return (
    <Container>
      <div className="flex items-center justify-between">
        <Filters gameId={gameId} />
        <Button>Create a tournament</Button>
      </div>
      {firstTournament && <FirstTournament {...firstTournament} />}
      <TournamentGrid tournaments={tournaments} />
      <div className="mt-20">
        <PastEvents />
      </div>
    </Container>
  );
}
