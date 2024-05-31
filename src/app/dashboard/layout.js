"use client";
import useAuthentication from "@/hooks/auth/useAuthentication";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/container";
import Header from "../(landing)/header";

export default function DashboardLayout({ children }) {
  const { push } = useRouter();
  const { isUnauthenticated } = useAuthentication();

  if (isUnauthenticated) push("/login");

  return (
    <Container className="mt-36">
      <Header />
      {children}
    </Container>
  );
}
