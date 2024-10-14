export default function Section({ label, description, children }) {
  return (
    <div className="flex gap-8">
      <div className="w-64 text-sm">
        <div className="text-semibold">{label}</div>
        <div className="text-neutral-500">{description}</div>
      </div>
      <div className="w-[26rem]">{children}</div>
    </div>
  );
}
