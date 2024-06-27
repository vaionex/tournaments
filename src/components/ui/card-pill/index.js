export default function CardPill({ children = null, icon: Icon = () => null }) {
  return (
    <div className="flex w-fit items-center gap-2 rounded-md border border-white/20 bg-black/50 px-2 py-1 text-sm backdrop-blur-lg">
      <Icon className="size-4 text-white" />
      {children}
    </div>
  );
}
