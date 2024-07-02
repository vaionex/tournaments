"use client";
import TournamentCountdown from "@/components/tournament/tournament-countdown";
import { differenceInHours, format } from "date-fns";

export default function DateSection({ start, end }) {
  const hoursToStart = differenceInHours(start, new Date());
  const startingIn24hours = 0 <= hoursToStart && hoursToStart < 24;
  return (
    <div>
      {format(start, "Pp")} - {format(end, "Pp")}
      {startingIn24hours && (
        <div>
          Starting in <TournamentCountdown start={start} />
        </div>
      )}
    </div>
  );
}
