import TournamentRank from "@/components/icons/tournament-rank";
import Avatar from "@/components/ui/avatar";
import { useMemo } from "react";

export default function Podium({ position, username, profile_picture, kills }) {
  const label = useMemo(() => {
    if (position == 1) return "Champion";
    if (position == 2) return "2nd Place";
    if (position == 3) return "3rd Place";
    return `${position}th Place`;
  }, [position]);

  const background = position == 1 ? "champion-bg" : "non-champion-bg";

  return (
    <div
      className="flex h-[35rem] w-72 flex-col items-center rounded-lg bg-center py-7"
      style={{
        backgroundImage: `url('/images/dashboard/results/${background}.webp')`,
        backgroundSize: "100% 100%",
      }}
    >
      <TournamentRank position={position} />
      <div className="my-4 text-2xl font-semibold">{label}</div>
      <Avatar className="mb-3 size-40" src={profile_picture} />
      <div className="mb-1 text-lg font-bold">{username}</div>
    </div>
  );
}
