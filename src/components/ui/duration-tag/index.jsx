import { format } from "date-fns";

export default function DurationTag({ startDate, endDate }) {
  return (
    <div className="inline-flex space-x-6 bg-black/50 border-r-2 border-primary py-2 px-4 text-sm w-fit">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-white/50 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
        </div>
        {format(startDate, "MMM")} {format(startDate, "dd")} –
        {format(endDate, "MMM")} {format(endDate, "dd")}
      </div>

      <div>{startDate.getFullYear()}</div>
    </div>
  );
}
