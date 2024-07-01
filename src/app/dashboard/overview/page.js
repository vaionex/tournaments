import { Button } from "@/components/ui/button";
import { Plus } from "untitledui-js-base";
import Tournaments from "./Tournaments";
import Payouts from "./components/Payouts";
import Challenges from "../challenges/page";
import Stats from "./components/Stats";

export default function Overview() {
  return (
    <div className="pb-24">
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
      <div className="space-y-8">
        <Stats />
        <Tournaments />
        <Payouts />
        <Challenges />
      </div>
    </div>
  );
}
