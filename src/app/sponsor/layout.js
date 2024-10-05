"use client";
import DashboardMenu from "@/components/ui/dashboard-menu";
import LandingLayout from "../(landing)/layout";
import { Grid01, Wallet03 } from "untitledui-js-base";
import LogoMarkOutline from "@/components/icons/logo-mark-outline";
import Container from "@/components/ui/container";

const links = [{ name: "Overview", href: "overview", icon: Grid01 }];

export default function SponsorLayout({ children }) {
  return (
    <div
      style={{ backgroundImage: 'url("/images/dashboard-bg.webp")' }}
      className="bg-cover bg-top"
    >
      <LandingLayout>
        <Container className="py-36">
          <DashboardMenu links={links} />
          {children}
        </Container>
      </LandingLayout>
    </div>
  );
}
