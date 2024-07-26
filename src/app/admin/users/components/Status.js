import { CheckIcon, XIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

const statuses = {
  banned: {
    label: "Banned",
    className: "text-red-500",
    icon: XIcon,
  },
  active: {
    label: "Active",
    className: "text-green-500",
    icon: CheckIcon,
  },
};
export default function Status({ status }) {
  const {
    label,
    className,
    icon: Icon,
  } = statuses[status] || { icon: () => null };
  return (
    <div className={twMerge("flex items-center gap-2", className)}>
      <Icon className="size-4" />
      {label}
    </div>
  );
}
