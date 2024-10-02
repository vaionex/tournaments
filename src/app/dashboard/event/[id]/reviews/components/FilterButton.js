import { twMerge } from "tailwind-merge";

export default function FilterButton({ onClick, children, selected }) {
  return (
    <button
      className={twMerge(
        "flex items-center gap-1 rounded border border-white/10 bg-white/10 px-2 py-1 text-neutral-400",
        selected && "border-primary bg-primary-950 text-white",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
