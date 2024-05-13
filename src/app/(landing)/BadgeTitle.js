export default function BadgeTitle({ children }) {
  return (
    <div className="flex w-fit items-center gap-3 rounded-full border border-white/20 pr-2.5 text-sm">
      <div className="m-1 flex items-center gap-1 rounded-full bg-white/10 p-1.5">
        <div className="flex size-2.5 items-center justify-center rounded-full bg-white/20">
          <div className="size-1.5 rounded-full  bg-white" />
        </div>
        <div>Tournaments.com</div>
      </div>
      {children}
    </div>
  );
}
