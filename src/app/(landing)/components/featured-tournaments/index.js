import CornerBorder from "@/components/ui/corner-border";
import { Button } from "@/components/ui/button";
import DurationTag from "@/components/ui/duration-tag";
import Container from "@/components/ui/container";
import FirstTournament from "../../tournaments/featured-tournaments/FirstTournament";
import { getTournaments } from "@/db/tournament";

export default async function FeaturedTournaments() {
  const tournaments = await getTournaments();
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
          <Button variant="black">All Tournaments</Button>
        </div>
        <FirstTournament {...tournaments[0]} />
      </Container>

      <div className="to mt-20 h-0.5 w-full bg-transparent bg-gradient-to-r from-transparent via-white" />
    </div>
  );
}
