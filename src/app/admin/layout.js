"use client";

import LogoSimple from "@/components/icons/logo-simple";
import Logo from "@/components/ui/logo";
import useAdmin from "@/hooks/auth/useAdmin";
import { DollarSign } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { Users01 } from "untitledui-js-base";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const links = [
  { name: "Users", href: "users", icon: Users01 },
  { name: "Tournaments", href: "tournaments", icon: LogoSimple },
  {
    name: "Pending Tournaments",
    href: "pending-tournaments",
    icon: LogoSimple,
  },
  {
    name: "Pending Withdrawals",
    href: "pending-withdraw-requests",
    icon: DollarSign,
  },
];

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/auth/login");
  }

  const { data: userData } = await supabase
    .from("User")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!userData?.is_admin) {
    redirect("/dashboard");
  }

  return (
    <div className="relative flex">
      <div className="sticky top-0 h-screen border-r border-neutral-800">
        <Logo className="mx-6 my-8 h-12" />
        <div className="w-72 space-y-1 p-4">
          {links.map(({ name, href, icon: Icon }) => (
            <Link
              className={twMerge(
                "flex items-center gap-3 rounded-lg px-3 py-2 font-semibold transition hover:bg-white/10",
                usePathname().endsWith("/" + href) && "bg-white/10",
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
      <div className="flex-1">{children}</div>
    </div>
  );
}
