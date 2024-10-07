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
import DashboardMenu from "@/components/ui/dashboard-menu";

const links = [
  { name: "Overview", href: "overview", icon: Grid01 },
  { name: "Tournaments", href: "tournaments", icon: LogoMarkOutline },
  { name: "Wallet", href: "wallet", icon: Wallet03 },
];

export default function OrganizerLayout({ children }) {
  const { push } = useRouter();
  const { data: user, isLoading } = useUser();

  if (isLoading) return null;
  if (!user) push("/");

  return (
    <div
      style={{
        backgroundImage: 'url("/images/dashboard-bg.webp")',
        backgroundSize: "100% 1500px",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative mx-auto flex max-w-7xl flex-col py-24">
        <Header />
        <DashboardMenu links={links} />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
