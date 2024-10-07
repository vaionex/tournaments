import Card from "@/app/dashboard/components/Card";
import { twMerge } from "tailwind-merge";

export default function StatCard({
  icon: Icon,
  title,
  value,
  unit = "",
  iconBgColor,
  iconColor,
}) {
  return (
    <Card className={`flex-1 rounded-lg p-4`}>
      <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
        <div
          className={twMerge(
            "flex size-8 items-center justify-center rounded",
            iconBgColor,
          )}
        >
          <Icon className={twMerge(iconColor, "size-4")} />
        </div>
        <span>{title}</span>
      </div>
      <div className="text-2xl font-bold text-white">
        {value}
        <span className="ml-1 text-xs font-normal text-neutral-400">
          {unit}
        </span>
      </div>
    </Card>
  );
}
