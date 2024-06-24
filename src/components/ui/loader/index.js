import { Loader2Icon as LucideLoader } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function Loader({ className = "", ...props }) {
  return (
    <LucideLoader className={twMerge("animate-spin", className)} {...props} />
  );
}
