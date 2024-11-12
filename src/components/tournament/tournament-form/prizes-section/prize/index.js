import PositionIcon from "@/app/dashboard/components/PositionIcon";
import RewardPill from "@/app/dashboard/components/RewardPill";
import ordinal from "ordinal";
import {
  ArrowCircleUp,
  ChevronDown,
  CurrencyDollarCircle,
  Gift01,
  Percent01,
  Trash01,
  Trash03,
} from "untitledui-js-base";
import GiftCardModal from "../gift-card-modal";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Percent } from "lucide-react";

export default function Prize({
  xp,
  cash,
  giftCard,
  sponsorshipPercentageOverride,
  sponsorshipPercentage,
  position,
  onChange,
  onRemove,
}) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [expanded, setExpanded] = useState(true);
  return (
    <div
      className={twMerge(
        "flex items-start gap-4 p-3 transition",
        expanded && "bg-white/5",
      )}
    >
      <div>
        <PositionIcon position={position} />
      </div>
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="font-semibold">{ordinal(position)} Place</div>
              {position != 1 && (
                <button type="button" onClick={onRemove}>
                  <Trash01 className="size-3 text-neutral-500 hover:text-red-500" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { type: "xp", value: xp },
                { type: "cash", value: cash },
                { type: "gift-card", value: giftCard?.label },
                {
                  type: "percentage",
                  value: sponsorshipPercentage,
                },
              ]
                .filter(({ value }) => value != undefined)
                .map(({ type, value }) => (
                  <RewardPill type={type} value={value} />
                ))}
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            type="button"
            className="self-start"
          >
            <ChevronDown
              className={twMerge("text-neutral-500", expanded && "rotate-180")}
            />
          </button>
        </div>
        <div className={twMerge("space-y-2.5", !expanded && "hidden")}>
          {[
            {
              label: "Cash",
              icon: CurrencyDollarCircle,
              onChange: (e) =>
                onChange({ cash: Number(e.target.value) * 100 || 0 }),
              value: cash / 100,
              onRemove: () => onChange({ cash: undefined }),
              enabled: cash != undefined,
              min: 1,
            },
            {
              label: "XP",
              icon: ArrowCircleUp,
              onChange: (e) => onChange({ xp: Number(e.target.value) || 0 }),
              value: xp,
              onRemove: () => onChange({ xp: undefined }),
              enabled: xp != undefined,
              min: 1,
            },
            {
              label: "Gift Card",
              icon: Gift01,
              onChange: (e) =>
                onChange({
                  giftCard: { label: e.target.value, file: giftCard?.file },
                }),
              value: giftCard?.label,
              onRemove: () => onChange({ giftCard: undefined }),
              enabled: giftCard != undefined,
            },
            {
              label: "Sponsorship Share",
              icon: Percent,
              onChange: (e) =>
                onChange({
                  sponsorshipPercentageOverride:
                    Math.min(Number(e.target.value), 100) || 0,
                }),
              value: sponsorshipPercentageOverride?.toString(),
              type: "number",
              enabled: sponsorshipPercentageOverride !== undefined,
              onRemove: () =>
                onChange({ sponsorshipPercentageOverride: undefined }),
              max: 100,
              min: 0,
            },
          ]
            .filter(({ enabled }) => enabled)
            .map(
              ({
                label,
                icon: Icon,
                onChange,
                value,
                onRemove,
                type,
                max,
                min,
              }) => (
                <div className="flex items-center gap-2" key={label}>
                  <div className="flex flex-1 rounded-lg border pr-4">
                    <div className="flex w-40 items-center gap-2 border-r bg-white/5 px-4 py-3">
                      <Icon />
                      <div>{label}</div>
                    </div>
                    <input
                      onChange={onChange}
                      value={value}
                      className="w-full bg-transparent pl-4 outline-none"
                      type={type}
                      min={min}
                      max={max}
                    />
                  </div>
                  {onRemove && (
                    <button
                      onClick={onRemove}
                      type="button"
                      className="text-neutral-500 transition hover:text-red-500"
                    >
                      <Trash03 />
                    </button>
                  )}
                </div>
              ),
            )}
          {[
            {
              label: "Add Cash Reward",
              icon: CurrencyDollarCircle,
              onClick: () => onChange({ cash: 100 }),
              enabled: cash == undefined,
            },
            {
              label: "Add XP Reward",
              icon: ArrowCircleUp,
              onClick: () => onChange({ xp: 100 }),
              enabled: xp == undefined,
            },
            {
              label: "Add Gift Card",
              icon: Gift01,
              onClick: () => setOpenAddModal(true),
              enabled: giftCard == undefined,
            },
            {
              label: "Sponsorship Percentage",
              icon: Percent01,
              onClick: () => onChange({ sponsorshipPercentageOverride: 0 }),
              enabled: giftCard == undefined,
            },
          ]
            .filter(({ enabled }) => enabled)
            .map(({ label, icon: Icon, onClick }) => (
              <button
                className="flex items-center gap-2 py-3"
                onClick={onClick}
                key={label}
                type="button"
              >
                <Icon className="size-4" />
                <div>{label}</div>
              </button>
            ))}
        </div>
      </div>
      <GiftCardModal
        onSave={(giftCard) => {
          onChange({ giftCard });
          setOpenAddModal(false);
        }}
        open={openAddModal}
        setOpen={setOpenAddModal}
      />
    </div>
  );
}
