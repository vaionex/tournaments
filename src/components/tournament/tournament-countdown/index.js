"use client";
import { useInterval } from "ahooks";
import { intervalToDuration } from "date-fns";
import { useState } from "react";

export default function TournamentCountdown({ start }) {
  const [countdown, setCountdown] = useState("");

  const duration = intervalToDuration({
    start: new Date(),
    end: new Date(start),
  });
  console.log(duration);
  const [hours, minutes, seconds] = [
    duration.hours,
    duration.minutes,
    duration.seconds,
  ].map((value = 0) => value?.toString().padStart(2, "0"));

  useInterval(() => setCountdown(`${hours}:${minutes}:${seconds}`), 1000);

  return <span>{countdown}</span>;
}
