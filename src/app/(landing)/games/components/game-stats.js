"use client";

import { Users } from "lucide-react";
import { BarChart01, Trophy01 } from "untitledui-js-base";

const stats = [
  {
    name: "Active Players",
    value: "125M+",
    change: "+12.3%",
    icon: Users,
    description: "Monthly active players across all platforms",
  },
  {
    name: "Esports Prize Pool",
    value: "$235M",
    change: "+8.7%",
    icon: Trophy01,
    description: "Total prize money in competitive gaming this year",
  },
  {
    name: "Game Releases",
    value: "850+",
    change: "+15.2%",
    icon: BarChart01,
    description: "New games released in the past year",
  },
];

export default function GameStats() {
  return (
    <section className="grid gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="rounded-xl border border-neutral-800 bg-neutral-900 p-6"
        >
          <div className="mb-4 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <stat.icon className="size-6" />
            </div>
            <div>
              <div className="text-sm text-neutral-400">{stat.name}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-400">{stat.description}</span>
            <span className="text-sm font-medium text-green-500">
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}