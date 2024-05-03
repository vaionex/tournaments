"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function MenuLink({ name, href }) {
  const pathname = usePathname();
  return (
    <Link
      className={twMerge(
        "flex-1 rounded p-2 text-center",
        pathname.endsWith(href) && "bg-primary",
      )}
      href={pathname.split("/").slice(0, -1).join("/") + "/" + href}
    >
      {name}
    </Link>
  );
}
