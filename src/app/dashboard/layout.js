"use client";
import useAuthentication from "@/hooks/auth/useAuthentication";
import { usePathname, useRouter } from "next/navigation";
import Container from "@/components/ui/container";
import Header from "../(landing)/header";

export default function DashboardLayout({ children }) {
  const { push } = useRouter();
  const { isUnauthenticated } = useAuthentication();
  const pathname = usePathname();

  if (isUnauthenticated)
    push(`/login?redirect=${encodeURIComponent(pathname)}`);

  return (
    <Container className="mt-36">
      <Header />
      {children}
    </Container>
  );
}
