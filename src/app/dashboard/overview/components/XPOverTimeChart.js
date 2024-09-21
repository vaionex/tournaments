"use client";
import useXpOverTime from "@/hooks/user/useXpOverTime";
import Card from "../../components/Card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { tailwind } from "@/utils/tailwind";
import { Upload03 } from "untitledui-js-base";
import useUser from "@/hooks/auth/useUser";
import RankIcon from "@/components/icons/rank-icon";
import { useState } from "react";
import { format, subMonths, subWeeks, subYears } from "date-fns";
import Loader from "@/components/ui/loader";
import FilterSegment from "./FilterSegment";

const durations = [
  {
    value: "week",
    label: "Week",
    start: subWeeks(new Date(), 1),
    formatString: "dd MMM",
  },
  {
    value: "month",
    label: "Month",
    start: subMonths(new Date(), 1),
    formatString: "dd MMM",
  },
  {
    value: "year",
    label: "Year",
    start: subYears(new Date(), 1),
    formatString: "MMM",
  },
];
const end = new Date();
export default function XPOverTimeChart() {
  const [selectedDuration, setSelectedDuration] = useState("week");
  const { data: { rank } = {} } = useUser();
  const { start, formatString } =
    durations.find(({ value }) => value === selectedDuration) || durations[0];

  const { data = [], isLoading } = useXpOverTime({
    start,
    end,
  });

  return (
    <Card className="relative flex flex-1 flex-col gap-2">
      {isLoading && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader />
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Upload03 className="text-primary" />
          <h2>XP Overtime</h2>
          <div className="flex items-center gap-1">
            <div className="text-xs font-semibold text-neutral-300">{rank}</div>
            <RankIcon rank={rank} className="size-5" />
          </div>
        </div>
        <FilterSegment
          value={selectedDuration}
          onChange={setSelectedDuration}
          items={durations}
        />
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart width={300} height={100} data={data}>
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#004EEB"
              strokeWidth={2}
              dot={false}
              fill="url(#colorUv)"
            />
            <CartesianGrid vertical={false} stroke="#333" />
            <XAxis
              dataKey="created_at"
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => format(v, formatString)}
              fontSize={12}
            />
            <YAxis axisLine={false} tickLine={false} fontSize={12} />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={tailwind.theme.colors.primary.DEFAULT}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={tailwind.theme.colors.primary.DEFAULT}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
