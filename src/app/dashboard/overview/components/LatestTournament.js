import useUpcomingParticipations from "@/hooks/user/useUpcomingParticipations";
import Card from "../../components/Card";
import { GamingPad01, GamingPad02 } from "untitledui-js-base";
import { Timer } from "iconsax-react";
import TournamentImagePlaceholder from "./TournamentImagePlaceholder";

export default function LatestTournament() {
  const { data: participations = [], isLoading } = useUpcomingParticipations();
  const latest = participations[0];

  if (isLoading) return <div className="py-16" />;
  if (!latest && !isLoading)
    return (
      <Card className="relative flex items-center gap-8">
        <TournamentImagePlaceholder />
        <div className="to-50 flex items-center gap-4 space-y-2 rounded-full border border-white/10 bg-gradient-to-r from-green-700/60 to-black bg-no-repeat p-2 px-3 text-xs font-semibold text-neutral-300">
          <div className="size-3 rounded-full border border-white/20 bg-gradient-to-b from-green-600 to-green-400" />
          No data yet. Join upcoming tournament
        </div>
        <div
          className="absolute right-0 top-0 rounded-bl-2xl border-b border-l border-green-700 px-4 py-1 text-xs font-medium text-neutral-400"
          style={{
            background:
              "radial-gradient(at center top, rgb(16, 121, 3), #10790229 39%)",
          }}
        >
          Latest tournament
        </div>
      </Card>
    );

  const { name, start, banner, Game } = latest?.Tournament;

  return (
    <Card className="relative flex items-center gap-8">
      <div className="relative">
        <img className="size-32 object-cover" src={banner} />
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-lg border border-white/10 bg-black/50 px-2 py-1 text-xs font-medium">
          <GamingPad01 className="size-4 text-neutral-500" />
          {Game.name}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex w-fit items-center gap-2 rounded-full border bg-gradient-to-r from-green-800 to-60% bg-no-repeat p-1 pr-5 text-xs">
          <div className="flex size-5 items-center justify-center rounded-full border border-green-400 bg-green-500">
            <Timer className="size-3" />
          </div>
          {new Date(start).toLocaleString()}
        </div>
        <div className="text-xl font-semibold">{name}</div>
      </div>
      <div
        className="absolute right-0 top-0 rounded-bl-2xl border-b border-l border-green-700 px-4 py-1 text-xs font-medium text-neutral-400"
        style={{
          background:
            "radial-gradient(at center top, rgb(16, 121, 3), #10790229 39%)",
        }}
      >
        Latest tournament
      </div>
    </Card>
  );
}
