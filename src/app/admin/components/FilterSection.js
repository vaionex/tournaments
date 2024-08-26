export default function FilterSection({
  children,
  label,
  icon: Icon = () => null,
  onReset,
}) {
  return (
    <div className="p-3 pb-4">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-300">
          <Icon className="size-4 text-gray-500" />
          {label}
        </div>
        <button className="text-xs text-gray-500" onClick={onReset}>
          Reset
        </button>
      </div>
      {children}
    </div>
  );
}
