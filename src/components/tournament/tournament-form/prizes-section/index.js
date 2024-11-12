import PositionIcon from "@/app/dashboard/components/PositionIcon";
import Prize from "./prize";
import { PlusCircle } from "untitledui-js-base";

export default function PrizesSection({
  prizes = [],
  onChange: _onChange = (prizes) => {},
  disableAddPrize,
}) {
  function onChange(prizes) {
    _onChange(
      prizes.map((v, index) => {
        const totalCash = prizes
          .map(({ cash = 0 }) => cash)
          .reduce((a, b) => a + b, 0);

        const totalXP = prizes
          .map(({ xp = 0 }) => xp)
          .reduce((a, b) => a + b, 0);

        const total = totalCash || totalXP;
        if (total === 0) return Math.round(100 / prizes.length) * 100;

        const { cash = 0, xp = 0 } = prizes[index];
        const value = totalCash ? cash : xp;
        console.log(total, value);
        const sponsorshipPercentage = Math.round((value / total) * 100);
        return {
          ...v,
          sponsorshipPercentage,
        };
      }),
    );
  }
  function updateTier(value, index) {
    const temp = [...prizes];
    temp[index] = { ...temp[index], ...value };
    onChange(
      temp.map((v, i) => ({
        ...v,
        sponsorshipPercentage: calculateSponsorshipPercentage(temp, i),
      })),
    );
  }
  function calculateSponsorshipPercentage(prizes, index) {
    if (prizes[index].sponsorshipPercentageOverride != undefined)
      return prizes[index].sponsorshipPercentageOverride;
    const totalCash = prizes
      .map(({ cash = 0 }) => cash)
      .reduce((a, b) => a + b, 0);

    const totalXP = prizes.map(({ xp = 0 }) => xp).reduce((a, b) => a + b, 0);

    const total = totalCash || totalXP;
    if (total === 0) return Math.round(100 / prizes.length);

    const { cash = 0, xp = 0 } = prizes[index];
    const value = totalCash ? cash : xp;
    return Math.round((value / total) * 100);
  }
  return (
    <div className="divide-y divide-inherit rounded-xl border border-white/20 bg-white/5">
      {prizes.map((prize, index) => (
        <Prize
          {...prize}
          position={index + 1}
          key={index}
          onChange={(value) => updateTier(value, index)}
          onRemove={() => onChange(prizes.filter((_, i) => i != index))}
        />
      ))}
      {!disableAddPrize && (
        <button
          onClick={() => onChange([...prizes, {}])}
          type="button"
          className="flex w-full items-center gap-4 p-3"
        >
          <PositionIcon position={0} />
          <div className="flex-1 text-left">Add Tier</div>
          <PlusCircle className="text-neutral-500" />
        </button>
      )}
    </div>
  );
}
