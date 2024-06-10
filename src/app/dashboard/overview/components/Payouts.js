"use client";

import Loader from "@/components/ui/loader";
import usePayouts from "@/hooks/user/usePayouts";
import { formatCurrency } from "@/utils/format";
import { format } from "date-fns";
import ordinal from "ordinal";

export const revalidate = 0;

export default function Payouts() {
  const { data: payouts = [], isLoading } = usePayouts();

  if (isLoading) return <Loader className="mx-auto mt-24" />;

  if (payouts.length == 0)
    return (
      <div className="mt-24 text-center text-2xl font-semibold text-neutral-500">
        No Recent Payouts
      </div>
    );

  return (
    <div className="mt-6 rounded-xl border border-white/10 bg-white/5">
      <h2 className="px-6 py-4 text-2xl font-bold">Recent history</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-t border-white/10 font-semibold">
            <td className="h-11 pl-6">Game</td>
            <td className="text-center">Date</td>
            <td className="text-center">Event</td>
            <td className="text-center">Result</td>
            <td className="text-center">Earnings</td>
            <td className="text-center"></td>
          </tr>
        </thead>
        <tbody>
          {payouts.map(({ id, Tournament, created_at, amount, position }) => (
            <tr key={id}>
              <td className="h-16 pl-6">{Tournament.Game.name}</td>
              <td className="text-center">
                {format(created_at, "dd-MM-yyyy")}
              </td>
              <td className="text-center">{Tournament.name}</td>
              <td className="text-center">{ordinal(position)}</td>
              <td className="text-center text-lime-600">
                {formatCurrency(amount)}
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
