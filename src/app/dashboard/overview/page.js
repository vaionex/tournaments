"use client";

import Tournaments from "./Tournaments";
import RecentHistory from "./components/RecentHistory";
import Stats from "./components/Stats";
import XPOverTimeChart from "./components/XPOverTimeChart";
import Rewards from "./components/Rewards";
import LatestTournament from "./components/LatestTournament";

export default function Overview() {
  return (
    <div className="space-y-8 pb-8">
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-[inherit]">
          <Stats />
          <LatestTournament />
        </div>
        <XPOverTimeChart />
      </div>
      <Tournaments />
      <div className="flex gap-4">
        <div className="flex-[2.5]">
          <RecentHistory />
        </div>
        <div className="flex-1">
          <Rewards />
        </div>
      </div>
    </div>
  );
}
