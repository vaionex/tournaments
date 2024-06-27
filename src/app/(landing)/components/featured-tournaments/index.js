import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import FirstTournament from "../../tournaments/components/featured-tournaments/FirstTournament";
import { getUpcomingTournaments } from "@/db/tournament";

export default async function FeaturedTournaments() {
  const tournaments = await getUpcomingTournaments();
  if (tournaments.length == 0) return;
  return (
    <div>
      <Container>
        <div className="mb-10 flex flex-wrap items-start justify-between gap-6">
          <div>
            <h2 className="mb-3 text-5xl font-bold">Featured Tournaments</h2>
            <div className="text-xl text-supporting">
              Join the fray in your favorite game and claim glory!
            </div>
          </div>
          <Button variant="black" href="/tournaments">
            All Tournaments
          </Button>
        </div>
        <FirstTournament {...tournaments[0]} />
      </Container>

      <div className="to mt-20 h-0.5 w-full bg-transparent bg-gradient-to-r from-transparent via-white" />
    </div>
  );
}
