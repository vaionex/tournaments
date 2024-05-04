"use client";
import LogoSimple from "@/components/icons/logo-simple";
import LogoMark from "@/components/ui/logo-mark";
import useAuthentication from "@/hooks/auth/useAuthentication";
import useUser from "@/hooks/auth/useUser";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { FlexAlignLeft, Wallet03 } from "untitledui-js-base";
import ProfileDropdown from "./profile-dropdown";
import Notch from "@/components/ui/notch";
import { formatCurrency } from "@/utils/format";

const nav = [
  { name: "Overview", href: "overview", icon: LogoSimple },
  { name: "Tournaments", href: "tournaments", icon: Squares2X2Icon },
];
export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const { push } = useRouter();
  const { data: user } = useUser();
  const { isUnauthenticated } = useAuthentication();

  if (isUnauthenticated) push("/login");
  const page = pathname.split("/")[2];

  function Badge({ className = "", ...rest }) {
    return (
      <Notch
        className={twMerge(
          "flex items-center gap-1.5 bg-white/5 px-4 py-1.5 font-medium text-neutral-400",
          className,
        )}
        {...rest}
      />
    );
  }

  return (
    <div className="flex">
      <div className="sticky top-0 min-h-screen border-r border-neutral-700">
        <div className="flex h-32 items-center justify-center">
          <Link href="/">
            <LogoMark />
          </Link>
        </div>
        <nav className="flex w-32 flex-col gap-2">
          {nav.map(({ name, href, icon: Icon }) => (
            <Link
              href={`/dashboard/${href}`}
              className={twMerge(
                "flex h-20 flex-col items-center justify-center gap-2",
                page == href && "bg-primary",
              )}
              key={href}
            >
              <Icon
                className={twMerge(
                  "h-5 w-5 text-neutral-500",
                  page == href && "text-white",
                )}
              />
              {name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex-1">
        <header className="flex items-center justify-between px-8 py-5">
          <div className="flex items-center gap-2">
            <Search />
            <input className="bg-transparent" placeholder="Search" />
          </div>
          <div className="flex items-center gap-4">
            <Badge>
              <LogoSimple className="size-4 text-white" />
              Gold
            </Badge>
            <Badge>
              <Wallet03 className="size-4 text-white" />
              {formatCurrency(user.balance ?? 0)}
            </Badge>
            <ProfileDropdown />
            {user.username}
          </div>
        </header>
        <div className="mb-4 mt-6 flex items-center gap-4 px-8 text-sm text-neutral-500">
          <FlexAlignLeft className="size-5" />
          <ChevronRight className="size-4 font-medium text-white" />
          {nav.find(({ href }) => href == page)?.name}
        </div>
        <div className="px-8">{children}</div>
      </div>
    </div>
  );
}
