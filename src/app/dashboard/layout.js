"use client";

import useAuthentication from "@/hooks/auth/useAuthentication";
import { usePathname, useRouter } from "next/navigation";
import Container from "@/components/ui/container";
import Header from "../(landing)/header";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const { replace } = useRouter();
  const { isUnauthenticated, isLoading } = useAuthentication();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && isUnauthenticated)
      replace(`/login?redirect=${encodeURIComponent(pathname)}`);
  }, [isUnauthenticated, isLoading]);

  if (isLoading || isUnauthenticated) return null;

  return (
    <Container className="mt-36">
      <Header />
      {children}
    </Container>
  );
}
