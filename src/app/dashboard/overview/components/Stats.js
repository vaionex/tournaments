"use client";

import { ArrowCircleUp, Wallet02 } from "untitledui-js-base";
import Stat from "./Stat";
import { formatCurrency, formatValue } from "@/utils/format";
import useUser from "@/hooks/auth/useUser";
import Card from "../../components/Card";
import RankIcon from "@/components/icons/rank-icon";
import { WalletMoney } from "iconsax-react";

export default function Stats() {
  const {
    data: { balance = 0, rank, xp = 0, nextRank, nextRankXP = 0 },
  } = useUser();

  return (
    <div className="flex gap-4">
      <Card className="flex-1 space-y-4 p-6">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-white">
            <WalletMoney />
          </div>
          Balance
        </div>
        <div className="text-3xl font-semibold">{formatCurrency(balance)}</div>
      </Card>
      <Card className="flex-1 p-6 text-neutral-400">
        <div className="mb-2 flex items-center gap-2">
          <RankIcon rank={rank} className="size-14" />
          <div className="space-y-1">
            <div className="font-semibold text-white">{rank}</div>
            <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-1 text-xs">
              <ArrowCircleUp className="size-3" />
              {formatValue(xp)} XP
            </div>
          </div>
        </div>
        <div className="space-y-2 pl-2.5">
          <div className="text-xs">
            <span className="font-bold">{nextRankXP - xp} </span>
            XP away from <span className="font-bold">{nextRank}</span>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 p-1 text-xs">
            <div
              className="h-1 rounded-full bg-gradient-to-l from-white/50"
              style={{ width: `50%` }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
