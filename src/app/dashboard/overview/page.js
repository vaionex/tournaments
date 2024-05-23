import RankIcon from "@/components/icons/rank-icon";
import Ranking from "@/components/icons/ranking";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Plus, Wallet02 } from "untitledui-js-base";
import Tournaments from "./Tournaments";
import Stat from "./Stat";

export default function Overview() {
  const current = "Bronze";
  const next = "Silver";
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <Button
          href="/dashboard/tournaments/create"
          variant="white"
          className="px-3.5 py-2 text-sm"
        >
          <Plus className="size-5" />
          Create Tournament
        </Button>
      </div>
      <div className="mb-12 flex divide-x divide-white/5 overflow-hidden rounded-lg border border-white/10">
        <Stat title="Balance" icon={<Wallet02 />}>
          <div className="text-3xl font-medium">$0</div>
        </Stat>
        <Stat title="Earnings" icon={<Coins className="text-green-500" />}>
          <div className="text-3xl font-medium">$0</div>
        </Stat>
        <Stat
          title="XP Rank"
          icon={<Ranking className="text-orange-400" />}
          className="flex-[2]"
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
              <div className="h-full w-1/2 rounded-full bg-gradient-to-b from-gray-700 to-white" />
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
      </div>
      <Tournaments />
    </div>
  );
}
