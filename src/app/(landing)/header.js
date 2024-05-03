"use client";
import { useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import useAuthentication from "@/hooks/auth/useAuthentication";

const links = [
  { name: "Home", href: "/" },
  { name: "News", href: "/news" },
  { name: "Tournaments", href: "" },
  { name: "Sponsors", href: "" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuthentication();

  const ctaButton = isAuthenticated ? (
    <Button href="/dashboard">Dashboard</Button>
  ) : (
    <Button href="/signup">Get Started</Button>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 bg-black/20 text-white backdrop-blur-md">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
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
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            {links.map(({ name, href }) => (
              <Link
                href={href}
                className="text font-semibold leading-6"
                key={name}
              >
                {name}
              </Link>
            ))}
          </Popover.Group>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {ctaButton}
          </div>
        </nav>
      </header>

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <div className="-m-1.5 p-1.5">
              <span className="sr-only">Tournaments</span>
              <Logo className="h-10" />
            </div>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {links.map(({ name, href }) => (
                  <Link
                    href={href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7"
                    key={name}
                  >
                    {name}
                  </Link>
                ))}
              </div>
              <div className="py-6">{ctaButton}</div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
