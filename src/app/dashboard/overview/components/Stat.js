import { twMerge } from "tailwind-merge";

export default function Stat({
  title,
  icon = null,
  children,
  className = "",
  ...props
}) {
  return (
    <div
      className={twMerge(
        "flex-1 bg-opacity-0 bg-gradient-to-b from-white/10 to-white/5 px-6 py-7 hover:from-white/15 hover:to-gray-400/10",
        className,
      )}
      {...props}
    >
      <div className="mb-5 flex items-center gap-2">
        {icon}
        <div className="text-xl font-medium text-neutral-300">{title}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}
