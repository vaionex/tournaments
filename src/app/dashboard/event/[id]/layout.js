import { getParticipants, getTournament } from "@/db/tournament";
import MenuLink from "./MenuLink";
import { notFound } from "next/navigation";
import { getUser } from "@/supabase/server";
import JoinTournamentButton from "./JoinTournamentButton";
import { links } from "./links";
import ShareSection from "@/components/ui/share-section";
import { Button } from "@/components/ui/button";
import EndTournamentButton from "./end-tournament-button";
import Link from "next/link";
import { HomeLine } from "untitledui-js-base";
import FeedbackButton from "./components/FeedbackButton";

export const revalidate = 0;

export async function generateMetadata({ params: { id } }) {
  const { name, banner } = await getTournament(id);
  const images = [
    {
      url: banner, // Must be an absolute URL
      width: 1200,
      height: 615,
      alt: "Tournaments.com",
    },
  ];
  return {
    title: name,
    description: name,
    openGraph: {
      url: `https://tournaments.com/dashboard/event/${id}`,
      title: name,
      description: name,
      images,
      siteName: "Tournaments.com",
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description: name,
      creator: "@Tournaments.com",
      images,
    },
  };
}

export default async function TournamentLayout({ children, params: { id } }) {
  const tournament = await getTournament(id);
  const participants = await getParticipants(id);
  if (!tournament) return notFound();

  const { name, user_id, start } = tournament;

  const user = await getUser();
  const isOwner = user?.id == user_id;
  const isStarted = new Date(start) < new Date();
  const canEdit = isOwner && !isStarted;
  const hasParticipants = participants.length != 0;

  return (
    <div>
      <div className="mb-6 flex items-center gap-6 text-neutral-400">
        <Link href="/">
          <HomeLine className="size-5" />
        </Link>
        <span className="text-white">/</span>
        <Link href="/dashboard/tournaments">Tournaments</Link>
        <span className="text-white">/</span>
        <Link href={`/dashboard/event/${id}/overview`}>{name}</Link>
      </div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">{name}</h1>
        <div className="flex items-center gap-2">
          <FeedbackButton tournamentId={id} />
          <EndTournamentButton tournamentId={id} />
          <JoinTournamentButton {...tournament} />
        </div>
      </div>
      <div className="flex border-t border-white/20">
        <div className="flex flex-col  p-1 pr-8 pt-6 text-sm font-medium">
          {links
            .filter(({ name }) => {
              if (name == "Matchmaking Key" && !hasParticipants) return false;
              if (name == "Brackets" && tournament.format != "Brackets")
                return false;
              if (name == "Sponsor" && tournament.sponsorship_target <= 0)
                return false;
              return true;
            })
            .map(({ icon, ...link }) => (
              <MenuLink {...link} key={link.href} />
            ))}
        </div>
        <div className="h-full min-w-0 flex-1">
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
