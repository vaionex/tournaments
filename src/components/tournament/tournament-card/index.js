import DurationTag from "@/components/ui/duration-tag";
import { formatCurrency } from "@/utils/format";
import Link from "next/link";
import { Trophy01, Users01 } from "untitledui-js-base";
import { differenceInHours, format, intervalToDuration } from "date-fns";
import { twMerge } from "tailwind-merge";
import Pill from "@/components/ui/card-pill";
import TournamentCountdown from "../tournament-countdown";

export default function TournamentCard({
  id,
  name,
  banner,
  start,
  end,
  prize_pool,
  max_players,
  Game,
  className = "",
}) {
  const status =
    new Date() < new Date(start)
      ? "Upcoming"
      : new Date() < new Date(end)
        ? "In Progress"
        : "Finished";

  const hoursToStart = differenceInHours(start, new Date());
  const startingIn24hours = 0 <= hoursToStart && hoursToStart < 24;

  return (
    <Link
      style={{ backgroundImage: `url('${banner}')` }}
      className={twMerge(
        "block h-64 overflow-hidden rounded-2xl border border-neutral-600 bg-cover bg-center",
        className,
      )}
      href={`/dashboard/event/${id}`}
    >
      <div className="flex h-full flex-1 flex-col justify-between">
        <div className="p-8">
          <div className="mb-1 flex items-center gap-2">
            <Pill icon={Users01}>{max_players}</Pill>
          </div>
        </div>
        <div className="rounded-b-2xl border-t bg-black/70 px-6 py-4 backdrop-blur-lg">
          <h2 className="mb-1 line-clamp-1 text-xl font-bold">{name}</h2>
          <div className="text-sm font-medium text-neutral-300">
            {startingIn24hours ? (
              <TournamentCountdown start={start} />
            ) : (
              <>
                {format(start, "MMM dd")} - {format(end, "MMM dd")}
              </>
            )}{" "}
            <span className="mx-2 inline-block">•</span> {Game?.name}
            <span className="mx-2 inline-block">•</span> {status}
          </div>
        </div>
      </div>
    </Link>
  );
}
