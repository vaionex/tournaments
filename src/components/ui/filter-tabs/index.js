import { twMerge } from "tailwind-merge";

export default function FilterTabs({ items, value: selectedValue, onChange }) {
  return (
    <div className="mb-12 flex w-fit items-center gap-2 rounded-lg border border-white/5 bg-white/5 text-sm font-semibold">
      {items.map(({ value, label, ...rest }) => (
        <button
          className={twMerge(
            "rounded-lg border border-transparent px-4 py-2.5",
            selectedValue == value && "border-primary bg-primary-950",
          )}
          onClick={() => onChange(value)}
          key={value}
          {...rest}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
