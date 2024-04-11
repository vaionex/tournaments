import { twMerge } from "tailwind-merge";

export default function Container({ className = "", ...props }) {
  return (
    <div
      className={twMerge("mx-auto max-w-7xl p-4 lg:p-0", className)}
      {...props}
    />
  );
}
