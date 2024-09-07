import PositionIcon from "@/app/dashboard/components/PositionIcon";
import Prize from "./prize";
import { PlusCircle } from "untitledui-js-base";

export default function PrizesSection({
  prizes = [],
  onChange = (prizes) => {},
  disableAddPrize,
}) {
  function updateTier(value, index) {
    const temp = [...prizes];
    temp[index] = { ...temp[index], ...value };
    onChange(temp);
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
