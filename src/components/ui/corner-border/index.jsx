import { twMerge } from "tailwind-merge";

export default function CornerBorder({ children, className, ...props }) {
  return (
    <div
      className={twMerge(
        "overflow-hidden rounded-2xl bg-gradient-to-br from-white p-px",
        className,
      )}
      style={{
        background: "radial-gradient(at top left, white, black)",
      }}
    >
      <div className="overflow-hidden rounded-2xl bg-black">{children}</div>
    </div>
  );
}
