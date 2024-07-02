import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getUpcomingTournaments } from "@/db/tournament";
import TournamentGrid from "@/components/tournament/tournament-grid";

export const revalidate = 0;

export default async function Overview() {
  const tournaments = await getUpcomingTournaments();
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Tournaments</h2>
        <Button href="/dashboard/tournaments/create" variant="black">
          <Plus className="size-5" />
          Create a Tournament
        </Button>
      </div>
      <TournamentGrid tournaments={tournaments} />
    </div>
  );
}
