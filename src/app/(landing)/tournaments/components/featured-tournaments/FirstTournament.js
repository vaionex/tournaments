"use client";

import Pill from "@/app/dashboard/tournaments/tournament-card/pill";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Diamond01, Trophy01, Users01 } from "untitledui-js-base";

export default function FirstTournament({
  id,
  name,
  banner,
  max_players,
  prize_pool,
  start,
  end,
  Game,
}) {
  const { push } = useRouter();
  const href = `/dashboard/event/${id}`;
  return (
    <div
      style={{ backgroundImage: `url('${banner}')` }}
      className="mb-8 flex min-h-[30rem] cursor-pointer items-stretch overflow-hidden rounded-xl border bg-cover bg-center"
      onClick={() => push(href)}
    >
      <div className="flex flex-1 flex-col justify-center bg-gradient-to-r from-black px-12 py-20">
        <div className="mb-1 flex items-center gap-2">
          <Pill icon={Users01}>{max_players}</Pill>
          <Pill icon={Trophy01}>{formatCurrency(prize_pool)}</Pill>
        </div>
        <h2 className="mb-2 text-5xl font-bold lg:w-1/2">{name}</h2>
        <div className="text-lg font-medium text-neutral-300">
          {format(start, "MMM dd")} - {format(end, "MMM dd")}{" "}
          <span className="mx-2 inline-block">•</span> {Game?.name}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-2.5">
          <Button href={href}>Join Tournament</Button>
          <Button
            variant="neon"
            href="mailto:sponsor@tournaments.com"
            onClick={(e) => {
              e.stopImmediatePropagation?.();
              e.stopPropagation?.();
            }}
          >
            <Diamond01 className="size-4" />
            Become a sponsor
          </Button>
        </div>
      </div>
    </div>
  );
}
