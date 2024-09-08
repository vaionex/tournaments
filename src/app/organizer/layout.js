"use client";

import LogoMarkOutline from "@/components/icons/logo-mark-outline";
import Logo from "@/components/ui/logo";
import useUser from "@/hooks/auth/useUser";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { Grid01 } from "untitledui-js-base";

const links = [
  { name: "Overview", href: "overview", icon: Grid01 },
  { name: "Tournaments", href: "tournaments", icon: LogoMarkOutline },
];

export default function OrganizerLayout({ children }) {
  const { push } = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading } = useUser();

  if (isLoading) return null;
  if (!user) push("/");

  return (
    <div className="relative flex">
      <div className="sticky top-0 h-screen border-r border-neutral-800">
        <Logo className="mx-6 my-8 h-12" />
        <div className="w-72 space-y-1 p-4">
          {links.map(({ name, href, icon: Icon }) => (
            <Link
              className={twMerge(
                "relative flex items-center gap-3 rounded-lg px-3 py-2 font-semibold transition hover:bg-white/10",
                pathname.endsWith("/" + href) &&
                  "bg-primary text-white hover:bg-primary-950",
              )}
              key={name}
              href={href}
            >
              <Icon className="size-4 opacity-70" />
              {name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
