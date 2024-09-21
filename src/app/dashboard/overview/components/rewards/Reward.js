import OpenItemModal from "@/components/ui/open-item-modal";
import { formatCurrency } from "@/utils/format";
import { Gamepad2 } from "lucide-react";
import { useState } from "react";
import {
  ArrowUpRight,
  CurrencyDollarCircle,
  Upload03,
} from "untitledui-js-base";

export default function Reward({
  id,
  name,
  xp,
  amount = 0,
  reward_type,
  Participant,
  Challenge,
}) {
  const [openItemModal, setOpenItemModal] = useState(false);
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
        <div>
          {reward_type === "inventory" && (
            <button
              onClick={() => setOpenItemModal(true)}
              className="flex items-center gap-2"
            >
              <div
                className="bg-clip-text font-medium text-transparent"
                style={{
                  backgroundImage: `linear-gradient(99.13deg, #3578FF 38.87%, #AE6AF2 81.21%, #FDB022 98.3%)`,
                }}
              >
                CLAIM
              </div>
              <ArrowUpRight className="size-5 text-neutral-300" />
            </button>
          )}
        </div>
      </div>
      <OpenItemModal id={id} open={openItemModal} setOpen={setOpenItemModal} />
    </div>
  );
}
