import TournamentCard from "@/app/dashboard/tournaments/tournament-card";
import Pill from "@/app/dashboard/tournaments/tournament-card/pill";
import { Button } from "@/components/ui/button";
import { getTournaments } from "@/db/tournament";
import { format } from "date-fns";
import { Diamond01, Trophy01, Users01 } from "untitledui-js-base";

// Revalidate every 24 hours
export const revalidate = 60 * 60 * 24;

export default async function FeaturedTournaments() {
  const tournaments = await getTournaments();
  const firstTournament = tournaments[0];
  const rest = tournaments.slice(1);

  function FirstTournament() {
    const { name, banner, max_players, prize_pool, start, end, Game } =
      firstTournament;
    return (
      <div
        style={{ backgroundImage: `url('${banner}')` }}
        className="mb-8 flex min-h-[30rem] items-stretch overflow-hidden rounded-xl border bg-cover bg-center"
      >
        <div className="flex flex-1 flex-col justify-center bg-gradient-to-r from-black px-12 py-20">
          <div className="mb-1 flex items-center gap-2">
            <Pill icon={Users01}>{max_players}</Pill>
            <Pill icon={Trophy01}>{prize_pool}</Pill>
          </div>
          <h2 className="mb-2 text-5xl font-bold lg:w-1/2">{name}</h2>
          <div className="text-lg font-medium text-neutral-300">
            {format(start, "MMM dd")} - {format(end, "MMM dd")}{" "}
            <span className="mx-2 inline-block">•</span> {Game?.name}
          </div>
          <div className="mt-10 space-x-2.5">
            <Button variant="neon">
              <Diamond01 className="size-4" />
              Become a sponsor
            </Button>
            <Button>Join Tournament</Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mb-24">
      <FirstTournament />
      <div className="grid grid-cols-3 gap-6">
        {rest.map((tournament) => (
          <TournamentCard {...tournament} />
        ))}
      </div>
    </div>
  );
}
