export default function FilterSegment({
  value: selectedValue,
  onChange,
  items = [],
}) {
  return (
    <div className="w-fit rounded-md bg-white/5 p-1">
      {items.map(({ value, label }) => (
        <button
          key={value}
          className={`${value === selectedValue ? "bg-white/10" : ""} rounded-md px-1 py-0.5 text-xs font-medium`}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
