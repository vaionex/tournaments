"use client";
import Card from "../../components/Card";
import useRecentRewards from "@/hooks/user/useRecentRewards";
import RewardsEmpty from "./RewardsEmpty";
import Reward from "./Reward";
import { Inbox02 } from "untitledui-js-base";
import Loader from "@/components/ui/loader";
import { useState } from "react";
import FilterSegment from "./FilterSegment";
import Link from "next/link";

const filters = [
  { value: "all", label: "All" },
  { value: "xp", label: "XP" },
  { value: "inventory", label: "Inventory" },
  { value: "payout", label: "Cash" },
];

export default function Rewards() {
  const { data: alRewards = [], isLoading } = useRecentRewards();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const allRewards = [];

  const rewards = allRewards.filter((reward) => {
    if (selectedFilter === "all") return true;
    return reward.reward_type === selectedFilter;
  });

  const noRewards = rewards.length == 0 && !isLoading;

  return (
    <Card className="">
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
        <div className="max-h-96 overflow-y-auto">
          {rewards.map((reward) => (
            <Reward key={reward.id} {...reward} />
          ))}
        </div>
        {noRewards && (
          <div className="px-4">
            <RewardsEmpty className="mx-auto" />
            <div className="text-lg font-semibold">No XP or Rewards yet</div>
            <div className="text-neutral-300">
              No XP or rewards earned yet. Join a tournament to start collecting
              rewards and leveling up!
            </div>
            <Link
              className="mt-8 block w-fit rounded-full border-t border-white/10 bg-white/10 px-8 py-3 text-neutral-300"
              href="/dashboard/tournaments"
            >
              Discover Tournaments
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
}
