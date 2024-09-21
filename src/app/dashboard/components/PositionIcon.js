import { twMerge } from "tailwind-merge";
import { GamingPad01, Trophy01 } from "untitledui-js-base";

export default function PositionIcon({ position }) {
  const Icon = position == 1 ? Trophy01 : GamingPad01;
  return (
    <div
      className={twMerge(
        "flex size-14 items-center justify-center rounded-lg border bg-white/10",
        position == 1 && "border-lime-300 bg-lime-700",
      )}
    >
      <Icon />
    </div>
  );
}
