"use client";
import Link from "next/link";
import Header from "../(landing)/header";
import Container from "@/components/ui/container";
import useAuthentication from "@/hooks/auth/useAuthentication";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const links = [
  { name: "Terms", href: "" },
  { name: "Privacy", href: "/privacy" },
  { name: "Cookies", href: "" },
];

const exemptedRoutes = ["update-password"];
export default function AuthLayout({ children }) {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuthentication();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const isExemptedRoute = exemptedRoutes.some(
    (route) => `/${route}` == pathname,
  );

  const shouldRedirect = isAuthenticated && !isExemptedRoute;

  useEffect(() => {
    if (shouldRedirect) push(redirect);
  }, [isAuthenticated]);

  if (isLoading || shouldRedirect) return null;

  return (
    <div
      style={{ backgroundImage: `url('/images/auth/background.webp')` }}
      className="flex h-screen w-screen bg-cover bg-center bg-no-repeat"
    >
      <Header />
      <div className="hidden flex-1 bg-gradient-to-t from-black lg:block"></div>
      <div className="ml-auto flex h-full flex-1 items-center justify-center bg-black/80 px-6 pt-8 lg:px-0">
        {children}
      </div>
      <footer className="absolute inset-x-0 bottom-0 hidden items-center justify-between  text-neutral-400 lg:flex">
        <Container className="flex w-full justify-between py-8">
          <div>© 2024 Tournaments. All rights reserved.</div>
          <div className="flex items-center gap-2">
            {links.map(({ name, href }) => (
              <Link href={href}>{name}</Link>
            ))}
          </div>
        </Container>
      </footer>
    </div>
  );
}
