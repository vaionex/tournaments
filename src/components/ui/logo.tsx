import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps extends React.ComponentPropsWithoutRef<typeof Link> {
  className?: string;
}

export default function Logo({ className, ...props }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)} {...props}>
      <span className="text-3xl tracking-tight">
        <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent font-black">
          Tournaments
        </span>
        <span className="text-white/60 font-thin">.com</span>
      </span>
    </Link>
  );
} 