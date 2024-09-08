"use client";

import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { Clock } from "untitledui-js-base";

export default function StartDate({ start }) {
  return (
    <>
      <div className="text-2xl font-semibold text-neutral-300">
        {format(start, "EEEE")}
      </div>
      <div className="space-y-1 text-sm text-neutral-300">
        <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 p-1">
          <Calendar className="size-4 text-yellow-500" />
          {format(start, "dd MMM, yyyy")}
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 p-1">
          <Clock className="size-4 text-yellow-500" />
          {format(start, "p")}
        </div>
      </div>
    </>
  );
}
