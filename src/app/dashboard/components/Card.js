import { twMerge } from "tailwind-merge";

export default function Card({ className = "", ...props }) {
  return (
    <div
      className={twMerge(
        "rounded-lg border border-white/10  bg-white/5 p-4",
        className,
      )}
      {...props}
    />
  );
}
