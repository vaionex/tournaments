"use client";

import LogoMarkOutline from "@/components/icons/logo-mark-outline";
import Avatar from "@/components/ui/avatar";
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

  const { profile_picture, username, email } = user;

  return (
    <div className="relative flex">
      <div className="sticky top-0 flex h-screen flex-col border-r border-neutral-800">
        <Logo className="mx-6 my-8 h-12" />
        <div className="w-72 flex-1 space-y-1 p-4">
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
              <div
                className={twMerge(
                  "absolute -left-5 top-1/2 hidden h-6 w-2 -translate-y-1/2 rounded bg-white",
                  pathname.endsWith("/" + href) && "block",
                )}
              />
              <Icon className="size-4 opacity-70" />
              {name}
            </Link>
          ))}
        </div>
        <div className="flex gap-3 p-4">
          <button>collapse</button>
          <Avatar
            profile_picture={profile_picture}
            className="size-10 rounded"
          />
          <div>
            <div className="text-sm font-semibold">{username}</div>
            <div className="text-xs">{email}</div>
          </div>
        </div>
      </div>
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
