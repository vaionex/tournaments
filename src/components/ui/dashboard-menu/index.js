"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function DashboardMenu({ links = [] }) {
  const pathname = usePathname();
  return (
    <div className="my-4 flex w-full flex-1 gap-4 rounded-lg border border-white/5 bg-white/5 p-1">
      {links.map(({ name, href, icon: Icon }) => (
        <Link
          className={twMerge(
            "relative flex flex-1 items-center justify-center gap-3 rounded-lg px-3 py-2 font-semibold transition hover:bg-white/10",
            pathname.endsWith("/" + href) &&
              "bg-primary text-white hover:bg-primary",
          )}
          key={name}
          href={href}
        >
          <Icon
            className={twMerge(
              "size-4 text-neutral-500",
              pathname.endsWith("/" + href) && "fill-white text-white",
            )}
          />
          {name}
        </Link>
      ))}
    </div>
  );
}
