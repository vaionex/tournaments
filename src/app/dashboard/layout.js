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
import {
  NotificationBell,
  PopoverNotificationCenter,
} from "@novu/notification-center";
import Container from "@/components/ui/container";
import Header from "../(landing)/header";

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

  function CornerHighlight() {
    return (
      <svg
        width="20"
        height="40"
        viewBox="0 0 20 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-0 top-0"
      >
        <path d="M0 0H20V40H16L0 0Z" fill="white" />
      </svg>
    );
  }

  return (
    <Container className="mt-36">
      <Header />
      {children}
    </Container>
  );
}
