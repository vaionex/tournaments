import Ranking from "@/components/icons/ranking";
import Stat from "../overview/Stat";
import RankIcon from "@/components/icons/rank-icon";
import useUser from "@/hooks/auth/useUser";
import { useState } from "react";
import RankModal from "./rank-modal";

export default function XPRank() {
  const {
    data: { rank: current, nextRank: next, rankProgress: progress },
  } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Stat
        title="XP Rank"
        icon={<Ranking className="text-orange-400" />}
        className="flex-[2]"
        onClick={() => setOpen(true)}
      >
        <div>
          <div className="flex justify-between text-xs">
            <div className="mb-2 flex items-center gap-2">
              Current:
              <RankIcon rank={current} className="size-4" />
              <span className="font-semibold">{current}</span>
            </div>
            <div className="flex items-center gap-2">
              Next:
              <RankIcon rank={next} className="size-4" />
              <span className="font-semibold">{next}</span>
            </div>
          </div>
          <div className="h-2 w-full rounded-full bg-gradient-to-b from-black to-gray-600">
            <div
              className="h-full  rounded-full bg-gradient-to-b from-gray-700 to-white"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2.5 flex justify-between">
            {Array(30)
              .fill(0)
              .map((_, index) => (
                <div className="size-0.5 bg-white" key={index} />
              ))}
          </div>
        </div>
      </Stat>
      <RankModal open={open} setOpen={setOpen} />
    </>
  );
}
