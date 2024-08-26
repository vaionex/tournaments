export default function IconLabel({ label, icon: Icon }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <Icon className="size-5 text-neutral-500" />
      <div className="font-bold">{label}</div>
    </div>
  );
}
