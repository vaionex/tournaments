"use client";
import Card from "../../components/Card";
import useRecentRewards from "@/hooks/user/useRecentRewards";
import RewardsEmpty from "./RewardsEmpty";
import Reward from "./Reward";
import { Inbox02 } from "untitledui-js-base";
import Loader from "@/components/ui/loader";

export default function Rewards() {
  const { data: rewards = [], isLoading } = useRecentRewards();

  return (
    <Card className="max-h-96 overflow-y-auto">
      <div className="text-bold mb-4 flex items-center gap-2">
        <Inbox02 className="size-5 text-neutral-500" />
        Rewards
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
