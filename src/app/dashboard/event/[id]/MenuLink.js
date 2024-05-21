"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { links } from "./links";

export default function MenuLink({ name, href }) {
  const pathname = usePathname();
  const Icon = links.find(({ name: n }) => n == name)?.icon || (() => null);
  return (
    <Link
      className={twMerge(
        "flex items-center gap-2 rounded-xl p-2.5 pr-10 text-neutral-400",
        pathname.endsWith(href) &&
          "border border-primary bg-primary-950 text-white",
      )}
      href={pathname.split("/").slice(0, -1).join("/") + "/" + href}
    >
      <Icon className="size-5" />
      {name}
    </Link>
  );
}
