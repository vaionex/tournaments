import ordinal from "ordinal";
import { twMerge } from "tailwind-merge";

export default function ResultPill({ position }) {
  const className =
    {
      1: "bg-primary-950 border-primary",
      2: "bg-green-700 border-green-500",
      3: "bg-yellow-700 border-yellow-500",
    }[position] || "bg-neutral-800 border-neutral-500";
  return (
    <div
      className={twMerge(
        "mx-auto flex h-9 w-36 items-center justify-center rounded-md border font-medium",
        className,
      )}
    >
      {position ? `${ordinal(position)} Position` : "Participant"}
    </div>
  );
}
