"use client";

import { Suspense, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import useAuthentication from "@/hooks/auth/useAuthentication";
import useUser from "@/hooks/auth/useUser";
import Container from "@/components/ui/container";
import MobileMenu from "./mobile-menu";
import * as HoverCard from "@radix-ui/react-hover-card";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HomeLine } from "untitledui-js-base";
import ProfileDropdown from "@/app/dashboard/profile-dropdown";
import { PopoverNotificationCenter } from "@novu/notification-center";
import NotificationBell from "./NotificationBell";
import HeaderMessage from "./HeaderMessage";

const links = [
  { name: "Home", href: "/" },
  { name: "Hardware", href: "/hardware" },
  { name: "Tournaments", href: "/tournaments" },
  { name: "Games", href: "/games" },
  // { name: "Sponsor", href: "/sponsor" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, isLoading: authLoading } = useAuthentication();
  const { data: user, isLoading: userLoading } = useUser();

  const isLoading = authLoading || userLoading;
  const showNotifications = isAuthenticated && !isLoading && user?.id;
  const isReady = isAuthenticated && user

  const ctaButton = isLoading ? null : isReady ? (
    <div className="flex items-center gap-6">
      {showNotifications && (
        <PopoverNotificationCenter colorScheme="dark">
          {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
        </PopoverNotificationCenter>
      )}
      <Link href="/dashboard">
        <HomeLine className="size-5" />
      </Link>
      <ProfileDropdown />
    </div>
  ) : (
    <Link href="/signup">
      <Button>Get Started</Button>
    </Link>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-20 bg-black/20 text-white backdrop-blur-md">
      <Suspense>
        <HeaderMessage />
      </Suspense>
      <Container>
        <nav
          className="flex items-center justify-between py-6"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <div className="-m-1.5 p-1.5">
              <span className="sr-only">Tournaments</span>
              <Logo />
            </div>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            {links.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className="text flex items-center gap-2 font-semibold leading-6 transition-colors hover:text-neutral-300"
              >
                {name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {ctaButton}
          </div>
        </nav>
      </Container>

      <MobileMenu
        links={links}
        open={mobileMenuOpen}
        setOpen={setMobileMenuOpen}
        ctaButton={ctaButton}
      />
    </header>
  );
}