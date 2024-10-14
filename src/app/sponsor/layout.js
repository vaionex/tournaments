"use client";
import DashboardMenu from "@/components/ui/dashboard-menu";
import LandingLayout from "../(landing)/layout";
import { Compass03, Grid01, Wallet03 } from "untitledui-js-base";
import Container from "@/components/ui/container";

const links = [
  { name: "Overview", href: "overview", icon: Grid01 },
  { name: "Events", href: "events", icon: Compass03 },
  { name: "Wallet", href: "wallet", icon: Wallet03 },
];

export default function SponsorLayout({ children }) {
  return (
    <div
      style={{
        backgroundImage: 'url("/images/dashboard-bg.webp")',
        backgroundSize: "100% 1500px",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <LandingLayout>
        <Container className="py-24">
          <DashboardMenu links={links} />
          {children}
        </Container>
      </LandingLayout>
    </div>
  );
}
