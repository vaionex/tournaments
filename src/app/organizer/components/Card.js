import { twMerge } from "tailwind-merge";

export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={twMerge("rounded-lg bg-white/10 p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}
