"use client";
import Avatar from "@/components/ui/avatar";
import useAdmin from "@/hooks/auth/useAdmin";
import useLogout from "@/hooks/auth/useLogout";
import useUser from "@/hooks/auth/useUser";
import { supabase } from "@/supabase/client";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment } from "react/jsx-runtime";
import { twMerge } from "tailwind-merge";

export default function ProfileDropdown() {
  const { data: user } = useUser();
  const { push } = useRouter();
  const logout = useLogout();
  const { isAdmin } = useAdmin();

  const items = [
    isAdmin && { name: "Admin", href: "/admin" },
    isAdmin && {
      name: "Create tournament",
      href: "/dashboard/tournaments/create",
    },
    { name: "Dashboard", href: "/dashboard/" },
    { name: "Organizer", href: "/organizer" },
    { name: "Profile", href: "/dashboard/profile/account" },
    { name: "Log out", onClick: () => logout() },
  ].filter(Boolean);

  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="relative flex items-center gap-2 rounded-full">
          <Avatar {...user} />
          {user.username}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-fit origin-top-right space-y-0.5 rounded bg-neutral-900 p-2 shadow-lg ring-opacity-5 focus:outline-none">
          {items.map(({ name, href, onClick }) => (
            <Menu.Item key={name}>
              {({ active }) => (
                <button
                  className={twMerge(
                    active ? "bg-white/10" : "",
                    "block w-full whitespace-nowrap px-2.5 py-2 text-left text-sm",
                  )}
                  onClick={() => (href ? push(href) : onClick?.())}
                >
                  {name}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
