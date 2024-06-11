"use client";

import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import { Plus, Wallet02 } from "untitledui-js-base";
import Tournaments from "./Tournaments";
import Stat from "./Stat";
import XPRank from "../components/XPRank";
import useUser from "@/hooks/auth/useUser";
import { formatCurrency } from "@/utils/format";
import Payouts from "./components/Payouts";

export default function Overview() {
  const {
    data: { balance },
  } = useUser();
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
      <div className="mb-12 flex divide-x divide-white/5 overflow-hidden rounded-lg border border-white/10">
        <Stat title="Balance" icon={<Wallet02 />}>
          <div className="text-3xl font-medium">{formatCurrency(balance)}</div>
        </Stat>
        <Stat title="Earnings" icon={<Coins className="text-green-500" />}>
          <div className="text-3xl font-medium">$0</div>
        </Stat>
        <XPRank />
      </div>
      <Tournaments />
      <Payouts />
    </div>
  );
}
