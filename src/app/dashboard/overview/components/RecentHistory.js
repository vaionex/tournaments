"use client";

import Loader from "@/components/ui/loader";
import useParticipations from "@/hooks/user/useParticipations";
import { format } from "date-fns";
import { ClockFastForward } from "untitledui-js-base";
import ResultPill from "./ResultPill";

export default function RecentHistory() {
  const { data: participations = [], isLoading } = useParticipations();

  if (isLoading) return <Loader className="mx-auto mt-24" />;

  if (participations.length == 0)
    return (
      <div className="flex items-center gap-2 py-24 text-center font-semibold text-neutral-500">
        No Recent Participations
      </div>
    );

  return (
    <div className="rounded-xl border border-white/10 bg-white/5">
      <h2 className="flex items-center px-6 py-4 font-bold">
        <ClockFastForward className="mr-2 text-neutral-500" />
        Recent history
      </h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-t border-white/10 font-semibold">
            <td className="h-11 pl-6">Game</td>
            <td className="text-center">Date</td>
            <td className="text-center">Event</td>
            <td className="text-center">Result</td>
            <td className="text-center"></td>
          </tr>
        </thead>
        <tbody>
          {participations.map(({ id, Tournament, created_at, position }) => (
            <tr key={id}>
              <td className="h-16 pl-6">
                <div className="flex items-center gap-2">
                  <img className="size-10" src={Tournament.Game.icon} />
                  {Tournament.Game.name}
                </div>
              </td>
              <td className="text-center">
                {format(created_at, "dd-MM-yyyy")}
              </td>
              <td className="text-center">{Tournament.name}</td>
              <td className="text-center">
                <ResultPill position={position} />
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
