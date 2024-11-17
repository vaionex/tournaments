import { formatCurrency } from "@/utils/format";
import { Gamepad2 } from "lucide-react";
import {
  CurrencyDollarCircle,
  GamingPad01,
  Gift01,
  Percent01,
  Upload03,
} from "untitledui-js-base";

export default function RewardPill({ type, value }) {
  const Icon =
    {
      xp: Upload03,
      cash: CurrencyDollarCircle,
      "gift-card": Gift01,
      percentage: Percent01,
    }[type] || (() => null);

  const text = {
    xp: `${value}XP`,
    cash: formatCurrency(value),
    "gift-card": value,
    percentage: `${value}%`,
  }[type];

  return (
    <div className="flex w-fit items-center gap-1 rounded-full border border-lime-500 bg-lime-500/10 px-1.5 py-1 pr-2.5 text-sm text-white">
      <Icon className="size-3.5" />
      {text}
    </div>
  );
}
