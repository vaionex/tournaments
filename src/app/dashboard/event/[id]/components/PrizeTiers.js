import PositionIcon from "@/app/dashboard/components/PositionIcon";
import RewardPill from "@/app/dashboard/components/RewardPill";
import ordinal from "ordinal";

export default function PrizeTiers({ prizes = [] }) {
  return (
    <div className="space-y-6">
      {prizes.map(({ xp, cash, giftCard }, index) => {
        return (
          <div className="flex gap-4" key={index}>
            <PositionIcon position={index + 1} />
            <div>
              <div className="mb-1 font-semibold">
                {ordinal(index + 1)} Position
              </div>
              <div className="flex flex-wrap gap-2">
                {cash && <RewardPill type="cash" value={cash} />}
                {xp && <RewardPill type="xp" value={xp} />}
                {giftCard?.file && (
                  <RewardPill
                    type="gift-card"
                    value={giftCard.label || "Gift Card"}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
