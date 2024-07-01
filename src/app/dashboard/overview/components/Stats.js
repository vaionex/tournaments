"use client";

import { Wallet02 } from "untitledui-js-base";
import XPRank from "../../components/XPRank";
import Stat from "./Stat";
import { Coins } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import useUser from "@/hooks/auth/useUser";

export default function Stats() {
  const {
    data: { balance = 0 },
  } = useUser();
  return (
    <div className="mb-12 flex divide-x divide-white/5 overflow-hidden rounded-lg border border-white/10">
      <Stat title="Balance" icon={<Wallet02 />}>
        <div className="text-3xl font-medium">{formatCurrency(balance)}</div>
      </Stat>
      <Stat title="Earnings" icon={<Coins className="text-green-500" />}>
        <div className="text-3xl font-medium">$0</div>
      </Stat>
      <XPRank />
    </div>
  );
}
