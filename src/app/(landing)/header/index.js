"use client";
import { useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import useAuthentication from "@/hooks/auth/useAuthentication";
import Container from "@/components/ui/container";
import MobileMenu from "./mobile-menu";
import TournamentsPopover from "./mobile-menu/tournaments-popover";
import * as HoverCard from "@radix-ui/react-hover-card";

import * as Portal from "@radix-ui/react-portal";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HomeLine } from "untitledui-js-base";
import ProfileDropdown from "@/app/dashboard/profile-dropdown";
import { PopoverNotificationCenter } from "@novu/notification-center";
import NotificationBell from "./NotificationBell";

const links = [
  { name: "Home", href: "/" },
  { name: "News", href: "/news" },
  {
    name: "Tournaments",
    href: "/tournaments",
  },
  { name: "Games", href: "/games" },
  { name: "Sponsor", href: "/sponsor" },
];

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuthentication();

  const ctaButton = isLoading ? null : isAuthenticated ? (
    <div className="flex items-center gap-6">
      <PopoverNotificationCenter colorScheme="dark">
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
      <Link href="/dashboard">
        <HomeLine className="size-5" />
      </Link>
      <ProfileDropdown />
    </div>
  ) : (
    <Button href="/signup">Get Started</Button>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-20 bg-black/20 text-white backdrop-blur-md">
        <Container>
          <nav
            className="flex items-center justify-between py-6"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <div className="-m-1.5 p-1.5">
                <span className="sr-only">Tournaments</span>
                <Logo className="h-12 w-auto" />
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
              {links.map(({ name, href, popoverContent = null }) => (
                <HoverCard.Root openDelay={0} className="relative" key={name}>
                  <HoverCard.Trigger asChild>
                    <Link
                      href={href}
                      className="text flex items-center gap-2 font-semibold leading-6"
                    >
                      {name} {popoverContent && <ChevronDown />}
                    </Link>
                  </HoverCard.Trigger>

                  <HoverCard.Portal>
                    <AnimatePresence>
                      <HoverCard.Content
                        asChild
                        // className="duration-200 animate-in fade-in slide-in-from-top-5"
                        sideOffset={40}
                        key={name}
                        forceMount
                      >
                        <motion.div {...animation}>{popoverContent}</motion.div>
                      </HoverCard.Content>
                    </AnimatePresence>
                  </HoverCard.Portal>
                </HoverCard.Root>
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
    </>
  );
}
