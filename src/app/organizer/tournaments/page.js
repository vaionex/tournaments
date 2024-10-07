import TournamentGrid from "@/components/tournament/tournament-grid";
import { getOrganizedTournaments } from "@/db/organizer";
import { getUser } from "@/supabase/server";
import Link from "next/link";
import { Grid, Grid01, PlusCircle } from "untitledui-js-base";

export const revalidate = 0;

export default async function Tournaments() {
  const { id: user_id } = await getUser();
  const tournaments = await getOrganizedTournaments(user_id);

  return (
    <div className="">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center justify-center gap-2 font-semibold">
          <Grid01 className="text-neutral-500" />
          Your tournaments
        </div>
        <Link
          className="flex items-center justify-center gap-2 text-neutral-300"
          href="/dashboard/tournaments/create"
        >
          <PlusCircle />
          New Event
        </Link>
      </div>
      {tournaments.length == 0 && (
        <div className="mt-8 text-center text-2xl font-semibold text-neutral-400">
          You have not created any tournaments yet.
        </div>
      )}
      <TournamentGrid tournaments={tournaments} />
    </div>
  );
}
