import { Button } from "@/components/ui/button";
import TournamentCard from "./tournament-card";
import { Plus } from "lucide-react";
import { getTournaments } from "@/db/tournament";
import { supabase } from "@/supabase/server";

export default async function Overview() {
  const tournaments = await getTournaments(supabase);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Tournaments</h2>
        <Button href="/dashboard/tournaments/create" variant="black">
          <Plus className="size-5" />
          Create a Tournament
        </Button>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-8">
        {tournaments.map((tournament, index) => (
          <TournamentCard {...tournament} key={tournament.id} />
        ))}
      </div>
    </div>
  );
}
