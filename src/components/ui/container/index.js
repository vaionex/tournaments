import { twMerge } from "tailwind-merge";

export default function Container({ className = "", ...props }) {
  return (
    <div
      className={twMerge("mx-auto max-w-7xl px-4 lg:px-0", className)}
      {...props}
    />
  );
}
