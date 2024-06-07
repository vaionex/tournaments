import { getTournament } from "@/db/tournament";
import MenuLink from "./MenuLink";
import { notFound } from "next/navigation";
import { getUser } from "@/supabase/server";
import JoinTournamentButton from "./JoinTournamentButton";
import { links } from "./links";
import ShareSection from "@/app/(landing)/news/[slug]/share-section";
import { Button } from "@/components/ui/button";
import EndTournamentButton from "./end-tournament-button";

export const revalidate = 0;

export default async function TournamentLayout({ children, params: { id } }) {
  const tournament = await getTournament(id);
  if (!tournament) return notFound();

  const { name, user_id, start, entry_fee } = tournament;

  const user = await getUser();
  const isOwner = user?.id == user_id;
  const isStarted = new Date(start) < new Date();
  const canEdit = isOwner && !isStarted;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">{name}</h1>
        <EndTournamentButton tournamentId={id} />
        <JoinTournamentButton
          entryFee={entry_fee}
          tournamentId={id}
          start={start}
        />
      </div>
      <div className="flex border-t border-white/20">
        <div className="flex flex-col  p-1 pr-8 pt-6 text-sm font-medium">
          {links.map(({ icon, ...link }) => (
            <MenuLink {...link} key={link.href} />
          ))}
        </div>
        <div className="h-full flex-1 ">
          <div className="border-b border-l border-r border-white/20">
            {children}
          </div>

          <div className="my-10 flex justify-between">
            {canEdit ? (
              <Button variant="black" href="edit">
                Edit
              </Button>
            ) : (
              <div />
            )}
            <ShareSection title={name} />
          </div>
        </div>
      </div>
    </div>
  );
}
