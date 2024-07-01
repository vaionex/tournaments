"use client";

import Checks from "@/components/icons/checks";
import Progress from "@/components/icons/progress";
import Recharging from "@/components/icons/recharging";
import CardPill from "@/components/ui/card-pill";
import FilterTabs from "@/components/ui/filter-tabs";
import { Swords } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const filters = [
  { label: "Daily Challenges", value: "Daily" },
  { label: "Weekly Challenges", value: "Weekly" },
];
export default function ChallengesSection({ challenges: allChallenges }) {
  const [filter, setFilter] = useState(filters[0].value);
  const challenges = allChallenges.filter(({ interval }) => interval == filter);

  function Status({ completed }) {
    return (
      <div
        className={twMerge(
          "absolute left-6 top-0 flex -translate-y-5 items-center gap-1.5 rounded-lg border border-neutral-500 bg-black/70 px-2 py-1 text-sm",
          completed && "border-lime-500",
        )}
      >
        {completed ? (
          <>
            <Checks className="text-lime-500" />
            Claimed
          </>
        ) : (
          <>
            <Recharging />
            In progress
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <FilterTabs value={filter} onChange={setFilter} items={filters} />
      <div className="space-x-4">
        {challenges.map(({ id, name, description, image, xp, status }) => (
          <div
            style={{ backgroundImage: `url('${image}')` }}
            className="flex h-[30rem] w-72 flex-col justify-between overflow-hidden rounded-lg border border-neutral-600"
            key={id}
          >
            <div className="flex items-center gap-2 p-8">
              {status && (
                <CardPill icon={Progress}>
                  {status.progress} / {status.total}
                </CardPill>
              )}
              <CardPill icon={Swords}>{xp} XP</CardPill>
            </div>
            <div className="relative h-28 border-t border-inherit bg-black/70 px-6 py-4 backdrop-blur-xl">
              <h2 className="mb-2 text-xl font-bold">{name}</h2>
              <div className="line-clamp-2 text-sm text-neutral-400">
                {description}
              </div>
              <Status completed={status && status.progress == status.total} />
            </div>
          </div>
        ))}
      </div>
      {challenges.length == 0 && (
        <div className="mt-24 text-center text-2xl font-bold text-neutral-400">
          No Challenges Available
        </div>
      )}
    </div>
  );
}
