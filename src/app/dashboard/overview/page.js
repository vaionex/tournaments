import Tournaments from "./Tournaments";
import RecentHistory from "./components/RecentHistory";
import Challenges from "../challenges/page";
import Stats from "./components/Stats";
import XPOverTimeChart from "./components/XPOverTimeChart";
import Rewards from "./components/Rewards";

export default function Overview() {
  return (
    <div className="space-y-8 pb-8">
      <div className="flex gap-4">
        <div className="flex-1">
          <Stats />
          <div className="h-64"></div>
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
