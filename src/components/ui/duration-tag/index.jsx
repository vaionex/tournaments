import { format } from "date-fns";

export default function DurationTag({ startDate, endDate }) {
  return (
    <div className="flex h-8 w-fit items-center gap-3 rounded-full  bg-black/40 pr-3 text-sm">
      <div className="mx-0.5 flex h-6 items-center gap-1 rounded-full bg-black/60 pl-[7px] pr-2">
        <div className="flex size-3 items-center justify-center rounded-full bg-white/30">
          <div className="size-1.5 rounded-full bg-white" />
        </div>
        <div>
          {format(startDate, "MMM")} {format(startDate, "dd")} –
          {format(endDate, "MMM")} {format(endDate, "dd")}
        </div>
      </div>
      <div>{startDate.getFullYear()}</div>
    </div>
  );
}
