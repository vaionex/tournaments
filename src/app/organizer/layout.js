"use client";

import LogoMarkOutline from "@/components/icons/logo-mark-outline";
import Avatar from "@/components/ui/avatar";
import Logo from "@/components/ui/logo";
import useUser from "@/hooks/auth/useUser";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { Grid01, Wallet03 } from "untitledui-js-base";
import Header from "../(landing)/header";

const links = [
  { name: "Overview", href: "overview", icon: Grid01 },
  { name: "Tournaments", href: "tournaments", icon: LogoMarkOutline },
  { name: "Wallet", href: "wallet", icon: Wallet03 },
];

export default function OrganizerLayout({ children }) {
  const { push } = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading } = useUser();

  if (isLoading) return null;
  if (!user) push("/");

  return (
    <div className="relative mx-auto flex max-w-7xl flex-col py-24">
      <Header />
      <div className="my-4 flex w-full flex-1 gap-4 rounded-lg border border-white/10 bg-white/10 p-1">
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

      <div className="flex-1">{children}</div>
    </div>
  );
}
