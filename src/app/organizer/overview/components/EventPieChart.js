"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function EventPieChart({ tournaments: allTournaments }) {
  const tournaments = allTournaments.slice(0, 4);
  const data = tournaments.map((tournament) => ({
    name: tournament.name,
    value: 10,
  }));

  if (tournaments.length === 0)
    return (
      <div className="my-16 text-center text-xl text-neutral-400">No Data</div>
    );

  return (
    <div className="flex min-h-0 flex-1">
      <div className="relative flex-1">
        <div className="absolute inset-0 z-10 flex items-center justify-center text-center">
          Top <br /> Events
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex w-36 flex-col items-center justify-center gap-3 text-xs">
        {data.map(({ name, value }, index) => (
          <div className="flex items-center justify-between gap-2">
            <div
              className="size-2.5 rounded-full border"
              style={{ borderColor: COLORS[index % COLORS.length] }}
            />
            <div className="w-20 truncate text-neutral-500">{name}</div>
            <div>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
