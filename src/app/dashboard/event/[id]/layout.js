import { getTournament } from "@/db/tournament";
import MenuLink from "./MenuLink";
import { notFound } from "next/navigation";
import { getUser } from "@/supabase/server";
import { Button } from "@/components/ui/button";
import JoinTournamentButton from "./JoinTournamentButton";

export const revalidate = 0;

export default async function TournamentLayout({ children, params: { id } }) {
  const tournament = await getTournament(id);
  if (!tournament) return notFound();

  const { name, user_id, start, entry_fee } = tournament;

  const user = await getUser();
  const isOwner = user?.id == user_id;
  const isStarted = new Date(start) < new Date();
  const canEdit = isOwner && !isStarted;
  const links = [
    { name: "Overview", href: "overview" },
    { name: "Event Details", href: "details" },
    { name: "Participants", href: "participants" },
    { name: "Matchmaking Key", href: "matchmaking" },
    canEdit && { name: "Edit", href: "edit" },
  ].filter(Boolean);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">{name}</h1>
        <div>
          <JoinTournamentButton
            entryFee={entry_fee}
            tournamentId={id}
            start={start}
          />
        </div>
      </div>
      <div className="my-6 flex rounded border border-neutral-700 p-1 text-sm font-semibold">
        {links.map((link) => (
          <MenuLink {...link} key={link.href} />
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
}
