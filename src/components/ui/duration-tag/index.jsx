import { format } from "date-fns";

export default function DurationTag({ startDate, endDate }) {
  return (
    <div className="inline-flex w-fit space-x-6 border-r-2 border-primary bg-black/50 px-4 py-2 text-sm">
      <div className="flex items-center gap-2">
        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-white/50">
          <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
        </div>
        {format(startDate, "MMM")} {format(startDate, "dd")} –
        {format(endDate, "MMM")} {format(endDate, "dd")}
      </div>

      <div>{startDate.getFullYear()}</div>
    </div>
  );
}
