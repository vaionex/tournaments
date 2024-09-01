"use client";

import { Wallet02 } from "untitledui-js-base";
import Stat from "./Stat";
import { Coins } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import useUser from "@/hooks/auth/useUser";

export default function Stats() {
  const {
    data: { balance = 0 },
  } = useUser();
  return (
    <div className="flex gap-4">
      <Stat className="flex-1" title="Balance" icon={<Wallet02 />}>
        <div className="text-3xl font-medium">{formatCurrency(balance)}</div>
      </Stat>
      <Stat
        className="flex-1"
        title="Earnings"
        icon={<Coins className="text-green-500" />}
      >
        <div className="text-3xl font-medium">{formatCurrency(balance)}</div>
      </Stat>
    </div>
  );
}
