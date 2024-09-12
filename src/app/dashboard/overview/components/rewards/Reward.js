import { formatCurrency } from "@/utils/format";
import { Gamepad2 } from "lucide-react";
import { CurrencyDollarCircle, Upload03 } from "untitledui-js-base";

export default function Reward({
  name,
  xp,
  amount = 0,
  reward_type,
  Participant,
  Challenge,
}) {
  const wonTournament = Boolean(Participant?.Tournament?.name);
  const completedChallenge = Boolean(Challenge?.description);
  const description = wonTournament
    ? `Won ${Participant?.Tournament?.name}`
    : completedChallenge
      ? `${Challenge?.description}`
      : "";

  const { icon, title } = {
    xp: {
      icon: <Upload03 className="text-primary" />,
      title: `${xp} XP`,
    },
    payout: {
      icon: <CurrencyDollarCircle className="text-yellow-500" />,
      title: `${formatCurrency(amount)}`,
    },

    inventory: {
      icon: <Gamepad2 className="text-green-500" />,
      title: name,
    },
  }[reward_type] || { icon: null, title: null };

  return (
    <div className="flex gap-2 rounded-lg border-white/5 bg-white/5 p-2">
      <div className="flex size-11 items-center justify-center rounded-lg border-white/5 bg-white/5">
        {icon}
      </div>
      <div>
        <div className="font-medium">{title}</div>
        {description && (
          <div className="text-xs text-neutral-400">{description}</div>
        )}
      </div>
    </div>
  );
}
