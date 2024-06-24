import { CalendarCheck2, Swords } from "lucide-react";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { Clock, Trophy01 } from "untitledui-js-base";

export default function TournamentStatus({ start, end, completed }) {
  const {
    label,
    className,
    icon: Icon,
  } = useMemo(() => {
    if (completed)
      return {
        label: "Completed",
        className: "bg-neutral-950 border-neutral-700",
        icon: Trophy01,
      };
    if (new Date() < new Date(start))
      return {
        label: "Upcoming",
        className: "border-primary bg-primary-950",
        icon: CalendarCheck2,
      };
    if (new Date() > new Date(end))
      return {
        label: "Waiting Payout",
        className: "border-yellow-500 bg-yellow-900",
        icon: Clock,
      };
    return {
      label: "Active",

      className: "border-lime-500 bg-lime-900",
      icon: Swords,
    };
  }, [start, completed]);

  return (
    <div
      className={twMerge(
        "mx-auto flex w-fit items-center gap-2 whitespace-nowrap rounded-lg border px-2.5 py-1 text-center",
        className,
      )}
    >
      <Icon className="size-4" />
      {label}
    </div>
  );
}
