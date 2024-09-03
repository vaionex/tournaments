"use client";
import Card from "../../components/Card";
import useRecentRewards from "@/hooks/user/useRecentRewards";
import RewardsEmpty from "./RewardsEmpty";
import Reward from "./Reward";
import { Inbox02 } from "untitledui-js-base";
import Loader from "@/components/ui/loader";
import { useState } from "react";
import FilterSegment from "./FilterSegment";

const filters = [
  { value: "all", label: "All" },
  { value: "xp", label: "XP" },
  { value: "inventory", label: "Inventory" },
  { value: "payout", label: "Cash" },
];

export default function Rewards() {
  const { data: allRewards = [], isLoading } = useRecentRewards();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const rewards = allRewards.filter((reward) => {
    if (selectedFilter === "all") return true;
    return reward.reward_type === selectedFilter;
  });

  return (
    <Card className="max-h-96 overflow-y-auto">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-bold flex items-center gap-2">
          <Inbox02 className="size-5 text-neutral-500" />
          Rewards
        </div>
        <FilterSegment
          items={filters}
          value={selectedFilter}
          onChange={setSelectedFilter}
        />
      </div>
      <div className="space-y-2">
        {isLoading && <Loader className="mx-auto my-24" />}
        {rewards.map((reward) => (
          <Reward key={reward.id} {...reward} />
        ))}
        {rewards.length == 0 && !isLoading && (
          <div className="px-4">
            <RewardsEmpty className="mx-auto" />
            <div className="text-lg font-semibold">No XP or Rewards yet</div>
            <div className="text-neutral-300">
              No XP or rewards earned yet. Join a tournament to start collecting
              rewards and leveling up!
            </div>
            <button>Discover Tournaments</button>
          </div>
        )}
      </div>
    </Card>
  );
}
