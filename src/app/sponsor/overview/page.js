import {
  CurrencyDollar,
  GamingPad01,
  Play,
  Speakers02,
} from "untitledui-js-base";
import StatCard from "./components/stat-card";
import { Gamepad2, Sparkles } from "lucide-react";
import LogoMarkOutline from "@/components/icons/logo-mark-outline";
import ImpressionChart from "./components/impression-chart";
import SponsorshipsTable from "../components/sponsorships-table";

export default function Overview() {
  return (
    <div className="flex flex-col gap-4">
      <div className="gap-inherit flex w-full">
        <StatCard
          icon={Play}
          title="Ad Impression"
          value="0"
          unit="views"
          iconColor="text-red-600"
          iconBgColor="bg-red-600/10"
        />
        <StatCard
          icon={Gamepad2}
          title="Engagement Rate"
          value="0%"
          iconColor="text-green-600"
          iconBgColor="bg-green-600/10"
        />
        <StatCard
          icon={Sparkles}
          title="Click-through rate"
          value="0%"
          iconColor="text-yellow-600"
          iconBgColor="bg-yellow-600/10"
        />
        <StatCard
          icon={Sparkles}
          title="Conversion Rate"
          value="0%"
          iconColor="text-purple-600"
          iconBgColor="bg-purple-600/10"
        />
      </div>
      <div className="gap-inherit flex">
        <div className="h-64 flex-1">
          <ImpressionChart />
        </div>
        <div className="gap-inherit flex flex-1 flex-col">
          <StatCard
            icon={CurrencyDollar}
            title="Total Sponsorships"
            value="$0"
            iconColor="text-green-600"
            iconBgColor="bg-green-600/10"
          />

          <div className="gap-inherit flex">
            <StatCard
              icon={GamingPad01}
              title="Current Active Sponsorships"
              value="0"
              unit="events"
              iconColor="text-primary"
              iconBgColor="bg-primary/10"
            />
            <StatCard
              icon={LogoMarkOutline}
              title="Total Event"
              value="0"
              unit="events"
              iconColor="text-primary"
              iconBgColor="bg-primary/10"
            />
            <StatCard
              icon={Speakers02}
              title="Total Ads"
              value="0"
              unit="events"
              iconColor="text-primary"
              iconBgColor="bg-primary/10"
            />
          </div>
        </div>
      </div>
      <SponsorshipsTable />
    </div>
  );
}
