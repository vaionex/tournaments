import { twMerge } from "tailwind-merge";

export default function RankPill({ rank }) {
  const classes = {
    Bronze: "bg-amber-700 border-amber-500",
    Silver: "bg-neutral-700 border-neutral-500",
    Gold: "bg-yellow-700 border-yellow-500",
    Platinum: "bg-cyan-700 border-cyan-500",
    Diamond: "bg-emerald-700 border-emerald-500",
    Master: "bg-violet-700 border-violet-500",
    Grandmaster: "bg-fuchsia-700 border-fuchsia-500",
  };
  return (
    <div
      className={twMerge(
        "flex items-center justify-center rounded-lg border px-4 py-1",
        classes[rank],
      )}
    >
      {rank}
    </div>
  );
}
